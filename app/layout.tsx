import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'FORA BRASIL · Seu próximo capítulo começa com um plano',description:'Descubra um destino para investigar, entenda possíveis caminhos legais e organize sua mudança para o exterior.',robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
