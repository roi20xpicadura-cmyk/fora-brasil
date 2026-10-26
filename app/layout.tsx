import type { Metadata } from 'next';
import './globals.css';
import {trackingScripts} from '@/lib/tracking-scripts';
export const metadata:Metadata={title:'FORA BRASIL · Seu próximo capítulo começa com um plano',description:'Descubra um destino para investigar, entenda possíveis caminhos legais e organize sua mudança para o exterior.',robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><head>{trackingScripts.map((code,i)=><script key={i} id={`utmify-loader-${i+1}`} dangerouslySetInnerHTML={{__html:code}}/>)}</head><body>{children}</body></html>}
