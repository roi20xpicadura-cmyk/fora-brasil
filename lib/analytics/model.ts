import {quizFlow} from '../quiz';
export type Source='instagram'|'facebook';
export type Attribution={source:Source;medium:string;campaign:string;content:string;term:string};
export type MetricEvent={id:string;type:'landing'|'step_view'|'step_answer'|'result'|'offer'|'offer_scroll'|'checkout';step?:number;depth?:number;at:number};
export type Visit={id:string;visitor:string;startedAt:number;source:Source;medium:string;campaign:string;content:string;term:string;device:'mobile'|'desktop';test:boolean};
export type EventBatch={visit:Visit;receivedAt:number;events:MetricEvent[]};
export const stepNames:Record<number,string>={22:'País',0:'Objetivo',8:'Família',9:'Prazo',3:'Nome',2:'Profissão',5:'Idioma',7:'Economia mensal',10:'Maior dificuldade',17:'Documentos',19:'Como o plano ajuda',13:'Sua nova vida',15:'Ver meu plano'};
export function attribution(params:Record<string,string>,referrer:string):Attribution|null{
 const raw=(params.utm_source||'').trim().toLowerCase();let source:Source|null=null;
 if(['instagram','ig'].includes(raw))source='instagram';else if(['facebook','fb'].includes(raw))source='facebook';else if(raw)return null;
 if(!source)try{const h=new URL(referrer).hostname.toLowerCase();if(h==='instagram.com'||h.endsWith('.instagram.com'))source='instagram';else if(h==='facebook.com'||h.endsWith('.facebook.com')||h==='fb.com'||h.endsWith('.fb.com'))source='facebook'}catch{}
 if(!source)return null;
 const clean=(v:string)=>v.replace(/[\x00-\x1f<>]/g,'').slice(0,80);
 return {source,medium:clean(params.utm_medium||'não informado'),campaign:clean(params.utm_campaign||'sem campanha'),content:clean(params.utm_content||''),term:clean(params.utm_term||'')};
}
export function validateEvent(raw:unknown,now=Date.now()):MetricEvent|null{
 if(!raw||typeof raw!=='object')return null;const e=raw as MetricEvent;
 if(!/^[a-f0-9-]{36}$/.test(e.id)||!['landing','step_view','step_answer','result','offer','offer_scroll','checkout'].includes(e.type))return null;
 if((e.type==='step_view'||e.type==='step_answer')&&!quizFlow.includes(e.step as never))return null;
 if(e.type==='offer_scroll'&&![25,50,75,90,100].includes(e.depth||0))return null;
 return {id:e.id,type:e.type,at:Number.isFinite(e.at)?Math.min(now,Math.max(now-86400000,e.at)):now,...(e.step!==undefined?{step:e.step}:{}),...(e.depth!==undefined?{depth:e.depth}:{})};
}
export type Filters={from:string;to:string;source:string;campaign:string;device:string;tests:boolean};
export function summarize(batches:EventBatch[],filters:Filters,now=Date.now()){
 const visits=new Map<string,{visit:Visit;events:MetricEvent[]}>();
 for(const batch of batches){const v=batch.visit;const date=new Date(v.startedAt).toLocaleDateString('en-CA',{timeZone:'America/Recife'});if(date<filters.from||date>filters.to||(!filters.tests&&v.test)||(filters.source!=='all'&&v.source!==filters.source)||(filters.campaign&&v.campaign!==filters.campaign)||(filters.device!=='all'&&v.device!==filters.device))continue;
 const row=visits.get(v.id)||{visit:v,events:[]};row.events.push(...batch.events);visits.set(v.id,row)}
 const sessions=[...visits.values()].map(r=>({...r,events:[...new Map(r.events.map(e=>[e.id,e])).values()].sort((a,b)=>a.at-b.at)}));
 const has=(r:typeof sessions[number],type:string,step?:number)=>r.events.some(e=>e.type===type&&(step===undefined||e.step===step));
 const completed=(r:typeof sessions[number])=>has(r,'result');const checked=(r:typeof sessions[number])=>has(r,'checkout');
 const lastAt=(r:typeof sessions[number])=>Math.max(r.visit.startedAt,...r.events.map(e=>e.at));
 const active=(r:typeof sessions[number])=>now-lastAt(r)<30*60000;
 const lastStage=(r:typeof sessions[number])=>{if(checked(r))return 'checkout';for(const e of [...r.events].reverse()){if(e.type==='offer_scroll')return e.depth===100?'offer_end':'offer';if(e.type==='offer')return 'offer';if(e.type==='result')return 'result';if(e.type==='step_view'||e.type==='step_answer')return `step:${e.step}`;if(e.type==='landing')return 'landing'}return 'landing'};
 const stages=[{key:'landing',label:'Página inicial',count:sessions.length},...quizFlow.map((step,i)=>({key:`step:${step}`,label:`${i+1}. ${stepNames[step]}`,count:sessions.filter(r=>has(r,'step_view',step)||has(r,'step_answer',step)).length})),{key:'result',label:'Resultado',count:sessions.filter(completed).length},{key:'offer',label:'Página de vendas',count:sessions.filter(r=>has(r,'offer')).length},{key:'offer_end',label:'Final da oferta',count:sessions.filter(r=>r.events.some(e=>e.type==='offer_scroll'&&e.depth===100)).length},{key:'checkout',label:'Clicou em comprar',count:sessions.filter(checked).length}];
 const funnel=stages.map((s,i)=>{const prev=s.key==='checkout'?stages.find(x=>x.key==='offer')!.count:stages[i-1]?.count??s.count;const times=s.key.startsWith('step:')?sessions.flatMap(r=>{const step=Number(s.key.split(':')[1]);const start=r.events.find(e=>e.type==='step_view'&&e.step===step),end=r.events.find(e=>e.type==='step_answer'&&e.step===step&&(!start||e.at>=start.at));return start&&end?[Math.max(0,end.at-start.at)/1000]:[]}):[];return {...s,reach:sessions.length?s.count/sessions.length*100:0,pass:prev?s.count/prev*100:0,stopped:sessions.filter(r=>!active(r)&&!checked(r)&&lastStage(r)===s.key).length,active:sessions.filter(r=>active(r)&&!checked(r)&&lastStage(r)===s.key).length,medianSeconds:times.length?[...times].sort((a,b)=>a-b)[Math.floor(times.length/2)]:null}});
 const grouped=(key:'source'|'campaign'|'device'|'content')=>[...new Set(sessions.map(r=>r.visit[key]))].map(value=>{const rows=sessions.filter(r=>r.visit[key]===value);return {name:value,sessions:rows.length,completed:rows.filter(completed).length,offers:rows.filter(r=>has(r,'offer')).length,clicks:rows.filter(checked).length}}).sort((a,b)=>b.sessions-a.sessions);
 const offerCount=stages.find(s=>s.key==='offer')!.count,clicks=sessions.filter(checked).length;
 const daily=[...new Set(sessions.map(r=>new Date(r.visit.startedAt).toLocaleDateString('en-CA',{timeZone:'America/Recife'})))].sort().map(date=>({date,sessions:sessions.filter(r=>new Date(r.visit.startedAt).toLocaleDateString('en-CA',{timeZone:'America/Recife'})===date).length,clicks:sessions.filter(r=>new Date(r.visit.startedAt).toLocaleDateString('en-CA',{timeZone:'America/Recife'})===date&&checked(r)).length}));
 return {totals:{sessions:sessions.length,visitors:new Set(sessions.map(r=>r.visit.visitor)).size,started:sessions.filter(r=>has(r,'step_view',22)).length,completed:sessions.filter(completed).length,offers:offerCount,clicks,active:sessions.filter(r=>active(r)&&!checked(r)).length,abandoned:sessions.filter(r=>!active(r)&&!checked(r)).length,offerCTR:offerCount?clicks/offerCount*100:0},funnel,sources:grouped('source'),campaigns:grouped('campaign'),ads:grouped('content'),devices:grouped('device'),daily,depth:[25,50,75,90,100].map(depth=>({depth,count:sessions.filter(r=>r.events.some(e=>e.type==='offer_scroll'&&(e.depth||0)>=depth)).length})),recent:sessions.sort((a,b)=>lastAt(b)-lastAt(a)).slice(0,100).map(r=>({id:r.visit.id.slice(0,8),source:r.visit.source,campaign:r.visit.campaign,device:r.visit.device,startedAt:r.visit.startedAt,lastAt:lastAt(r),stage:funnel.find(s=>s.key===lastStage(r))?.label||'Página inicial',status:checked(r)?'Clicou em comprar':active(r)?'Em andamento':'Parou',test:r.visit.test})),generatedAt:now};
}
export type Report=ReturnType<typeof summarize>;
