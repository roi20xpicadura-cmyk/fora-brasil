import {sameOrigin,adminSession} from '@/lib/analytics/server';
export async function POST(req:Request){if(!sameOrigin(req))return new Response(null,{status:403});const s=await adminSession();s.destroy();return Response.json({ok:true})}
