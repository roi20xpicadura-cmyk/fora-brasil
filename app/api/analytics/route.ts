import {NextResponse} from 'next/server';
import {randomUUID} from 'node:crypto';
import {attribution,validateEvent,type MetricEvent} from '@/lib/analytics/model';
import {isAdmin,sameOrigin,saveBatch,trackingSession} from '@/lib/analytics/server';
export const runtime='nodejs';export const dynamic='force-dynamic';
export async function POST(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:'Origem inválida'},{status:403});
 if(/bot|crawler|spider|preview|facebookexternalhit/i.test(req.headers.get('user-agent')||''))return new Response(null,{status:204});
 if(Number(req.headers.get('content-length')||0)>32000)return new Response(null,{status:413});
 try{const text=await req.text();if(text.length>32000)return new Response(null,{status:413});const data=JSON.parse(text),session=await trackingSession(),now=Date.now();
 if(data.action==='start'){
 const params:Record<string,string>={};for(const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'])if(typeof data.params?.[key]==='string')params[key]=data.params[key];const attr=attribution(params,typeof data.referrer==='string'?data.referrer:'');
 if(params.utm_source&&!attr){session.visit=undefined;await session.save();return NextResponse.json({eligible:false})}
 const admin=await isAdmin();const test=admin||data.test===true;
 const changed=attr&&session.visit&&(session.visit.source!==attr.source||session.visit.campaign!==attr.campaign||session.visit.content!==attr.content);
 if(!session.visit||now-(session.lastSeen||0)>30*60000||changed||session.visit.test!==test){if(!attr){session.visit=undefined;await session.save();return NextResponse.json({eligible:false})}session.visitor||=randomUUID();session.visit={id:randomUUID(),visitor:session.visitor,startedAt:now,...attr,device:data.mobile?'mobile':'desktop',test};}
 session.lastSeen=now;await session.save();return NextResponse.json({eligible:true,id:session.visit.id,test:session.visit.test})}
 if(!session.visit||now-(session.lastSeen||0)>30*60000)return NextResponse.json({eligible:false});
 if(!/^[a-f0-9-]{36}$/.test(data.batchId)||!Array.isArray(data.events)||data.events.length>50)return new Response(null,{status:400});
 const events=data.events.map((e:unknown)=>validateEvent(e,now)).filter(Boolean) as MetricEvent[];
 if(!events.length)return new Response(null,{status:400});
 await saveBatch({visit:session.visit,receivedAt:now,events},data.batchId);session.lastSeen=now;await session.save();return NextResponse.json({ok:true});
 }catch(error){console.error('analytics_write_failed',error instanceof Error?error.name:'unknown');return NextResponse.json({error:'Não foi possível registrar'},{status:503})}
}
