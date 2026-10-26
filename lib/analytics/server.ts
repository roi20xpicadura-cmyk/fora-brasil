import {cookies} from 'next/headers';
import {getIronSession} from 'iron-session';
import {createHash,timingSafeEqual} from 'node:crypto';
import {get,list,put} from '@vercel/blob';
import type {EventBatch,Visit} from './model';
export const STORE='store_9rkx7TQU8qUj034n';
export async function adminSession(){return getIronSession<{admin?:boolean;expires?:number}>(await cookies(),{cookieName:'fb_admin',password:process.env.ADMIN_SESSION_SECRET!,ttl:8*3600,cookieOptions:{secure:process.env.NODE_ENV==='production',httpOnly:true,sameSite:'strict',path:'/'}})}
export async function trackingSession(){return getIronSession<{visitor?:string;visit?:Visit;lastSeen?:number}>(await cookies(),{cookieName:'fb_visit',password:process.env.ADMIN_SESSION_SECRET!,ttl:180*86400,cookieOptions:{secure:process.env.NODE_ENV==='production',httpOnly:true,sameSite:'lax',path:'/'}})}
export async function isAdmin(){const s=await adminSession();return !!s.admin&&(s.expires||0)>Date.now()}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');return origin===new URL(req.url).origin}
export function passwordMatches(password:string){const expected=process.env.ADMIN_PASSWORD_SHA256;if(!expected||!/^[a-f0-9]{64}$/.test(expected))return false;return timingSafeEqual(createHash('sha256').update(password).digest(),Buffer.from(expected,'hex'))}
export async function loginAllowed(req:Request){const ip=(req.headers.get('x-forwarded-for')||'unknown').split(',')[0];const key=createHash('sha256').update(`${process.env.ADMIN_SESSION_SECRET}:${ip}`).digest('hex').slice(0,24);const bucket=Math.floor(Date.now()/(15*60000));for(let n=0;n<5;n++){try{await put(`auth-limits/${bucket}/${key}-${n}`,'.',{access:'private',addRandomSuffix:false,allowOverwrite:false});return true}catch(e){if(!String(e).includes('already exists'))throw e}}return false}
export async function saveBatch(batch:EventBatch,batchId:string){const date=new Date(batch.visit.startedAt).toLocaleDateString('en-CA',{timeZone:'America/Recife'});try{await put(`events/${date}/${batch.visit.id}/${batchId}.json`,JSON.stringify(batch),{access:'private',addRandomSuffix:false,allowOverwrite:false,contentType:'application/json'})}catch(e){if(!String(e).includes('already exists'))throw e}}
export async function readBatches(from:string,to:string){
 const paths:string[]=[];let truncated=false;const months=new Set<string>();for(let t=Date.parse(from);t<=Date.parse(to);t+=86400000)months.add(new Date(t).toISOString().slice(0,7));
 outer:for(const month of months){let cursor:string|undefined;do{const result=await list({prefix:`events/${month}`,limit:1000,cursor});for(const b of result.blobs){const date=b.pathname.split('/')[1];if(date>=from&&date<=to)paths.push(b.pathname);if(paths.length>=10000){truncated=true;break outer}}cursor=result.hasMore?result.cursor:undefined}while(cursor)}
 const batches:EventBatch[]=[];let failed=0;for(let i=0;i<paths.length;i+=15){const rows=await Promise.allSettled(paths.slice(i,i+15).map(async path=>{const r=await get(path,{access:'private',useCache:false});if(!r||r.statusCode!==200)throw Error('missing');return JSON.parse(await new Response(r.stream).text()) as EventBatch}));for(const r of rows){if(r.status==='fulfilled')batches.push(r.value);else failed++}}return {batches,truncated,failed}}
