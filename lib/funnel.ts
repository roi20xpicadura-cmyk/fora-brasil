import {money,type Answers} from './engine';
export type Choice={label:string;emoji:string;values:Partial<Answers>};
export type Question={phase:string;title:string;choices:Choice[]};
const choice=(label:string,emoji:string,values:Partial<Answers>):Choice=>({label,emoji,values});
export function questionFor(step:number,name:string):Question{
 const questions:Record<number,Question>={
 0:{phase:'O que você quer',title:'O que você mais quer mudar ao sair do Brasil?',choices:[choice('Dar mais segurança e futuro à minha família','🛡️',{goal:'familia'}),choice('Buscar trabalho e uma vida financeira melhor','📈',{goal:'carreira'}),choice('Recomeçar onde seja mais fácil me comunicar','💬',{goal:'idioma'}),choice('Morar fora sem ficar tão longe do Brasil','📍',{goal:'proximidade'}),choice('Virar a página e viver algo novo','✈️',{goal:'experiencia'})]},
 8:{phase:'O que você quer',title:'Quem você quer levar para essa nova vida?',choices:[[1,'Vou sozinho','🎒'],[2,'Eu e mais uma pessoa','👥'],[3,'Somos 3 pessoas','👨‍👩‍👧'],[4,'Somos 4 pessoas','👨‍👩‍👧‍👦'],[5,'Somos 5 pessoas ou mais','🏡']].map(([n,label,emoji])=>choice(String(label),String(emoji),{people:Number(n),peopleAtLeast:Number(n)===5}))},
 9:{phase:'O que você quer',title:'Quando você quer tirar essa mudança do papel?',choices:[[6,'Nos próximos 6 meses','🚀'],[12,'Em até 1 ano','🗓️'],[24,'Em até 2 anos','🧳'],[36,'Em até 3 anos','🧭']].map(([n,label,emoji])=>choice(String(label),String(emoji),{months:Number(n)}))},
 3:{phase:'O que você quer',title:'Como posso te chamar nessa virada de vida?',choices:[]},
 2:{phase:'Seu ponto de partida',title:`${name}, em que área você trabalha hoje?`,choices:[['Comércio e vendas','🛍️'],['Serviços e atendimento','🤝'],['Construção e manutenção','🛠️'],['Transporte e entregas','🚚'],['Saúde e cuidados','🩺'],['Tecnologia e escritório','💻'],['Outra área','🧩']].map(([label,emoji])=>choice(label,emoji,{profession:label,education:'',experience:0}))},
 5:{phase:'Seu ponto de partida',title:'Além do português, qual idioma faz parte da sua bagagem?',choices:[['Inglês','💬'],['Espanhol','🗣️'],['Alemão','📖'],['Francês','📝'],['Não falo nenhum deles','🌱']].map(([label,emoji])=>choice(label,emoji,{languages:{Inglês:0,Espanhol:0,Alemão:0,Francês:0,...(label==='Não falo nenhum deles'?{}:{[label]:1})}}))},
 7:{phase:'Seu ponto de partida',title:'Quanto você consegue juntar por mês para começar?',choices:[0,500,1000,2000,3000].map((n,i)=>choice(n===0?'Ainda não consigo juntar':`Cerca de ${money(n)}`,['🌱','🪙','💵','💰','🎯'][i],{monthly:n,savings:0,financeEstimate:true}))},
 10:{phase:'O que está travando',title:'O que mais trava sua saída do Brasil hoje?',choices:[choice('Não sei nem por onde começar','🧭',{barrier:'inicio'}),choice('Tenho medo de escolher o país errado','🌎',{barrier:'destino'}),choice('A papelada parece um bicho de sete cabeças','📄',{barrier:'documentos'}),choice('Não consigo organizar dinheiro e prazos','🗓️',{barrier:'organizacao'}),choice('Ainda estou conhecendo as possibilidades','🔎',{barrier:'exploracao'})]},
 11:{phase:'O que está travando',title:'Quando você pesquisa sobre morar fora, o que acontece?',choices:[choice('Abro um monte de coisas e continuo perdido','📱',{research:'perdido'}),choice('Cada lugar fala uma coisa diferente','🌀',{research:'contradicao'}),choice('Salvo tudo, mas não coloco nada em prática','📌',{research:'adiando'}),choice('Já tenho algumas coisas encaminhadas','✅',{research:'andamento'}),choice('Ainda não comecei a pesquisar','🌱',{research:'inicio'})]},
 12:{phase:'Seu próximo passo',title:'O que seu plano precisa resolver primeiro?',choices:[choice('Saber qual deve ser meu primeiro passo','👣',{priority:'primeiro'}),choice('Ter os documentos e as tarefas em ordem','🗂️',{priority:'documentos'}),choice('Enxergar um caminho para levar minha família','🏡',{priority:'familia'}),choice('Entender as opções antes de decidir','🔎',{priority:'avaliar'})]},
 13:{phase:'Sua nova vida',title:'Imagine sua mudança organizada. O que mais importa nessa conquista?',choices:[choice('Ver minha família construindo um novo futuro','❤️',{future:'familia'}),choice('Ter orgulho de finalmente ter começado','🙌',{future:'acao'}),choice('Buscar novas oportunidades de trabalho','💼',{future:'carreira'}),choice('Viver essa experiência no meu próprio ritmo','🌅',{future:'experiencia'})]},
 14:{phase:'Conheça o caminho',title:'Quer ter destino e próximas tarefas no mesmo plano?',choices:[choice('Sim, é essa direção que está faltando','✅',{structure:'sim'}),choice('Quero ver como funciona antes de decidir','👀',{structure:'avaliar'}),choice('Prefiro continuar organizando sozinho','🧭',{structure:'sozinho'})]},
 16:{phase:'O que está travando',title:'Qual erro você mais quer evitar nessa mudança?',choices:[choice('Gastar dinheiro e descobrir que não era o caminho','💸',{risk:'dinheiro'}),choice('Esquecer um documento importante','📄',{risk:'documentos'}),choice('Mudar sem preparar quem vai comigo','🏡',{risk:'familia'}),choice('Ainda não pensei nisso','🔎',{risk:'avaliar'})]},
 17:{phase:'O que está travando',title:'Você sabe quais documentos precisa conferir primeiro?',choices:[choice('Não, ainda está tudo confuso','🌀',{documentStatus:'confuso'}),choice('Sei de alguns, mas falta organizar','🗂️',{documentStatus:'parcial'}),choice('Sim, já tenho uma lista','✅',{documentStatus:'lista'})]},
 18:{phase:'O que está travando',title:'O que acontece quando você tenta dar o próximo passo?',choices:[choice('Deixo para depois porque parece complicado','⏳',{delay:'complexo'}),choice('Começo, mas não sei o que vem depois','🧩',{delay:'sequencia'}),choice('Espero conseguir me preparar melhor','🗓️',{delay:'preparo'}),choice('Já estou avançando aos poucos','👣',{delay:'avancando'})]},
 19:{phase:'Como funciona',title:'Um passo a passo ajudaria mais do que dicas espalhadas?',choices:[choice('Sim, quero saber o que fazer primeiro','✅',{method:'sim'}),choice('Quero entender como funciona','👀',{method:'avaliar'}),choice('Prefiro montar minha própria sequência','🧭',{method:'sozinho'})]},
 20:{phase:'Preparação',title:'Conferir o caminho antes de gastar faria diferença para você?',choices:[choice('Sim, quero me preparar antes de gastar','💡',{spending:'conferir'}),choice('Já estou fazendo isso','✅',{spending:'andamento'}),choice('Quero entender o que preciso conferir','🔎',{spending:'avaliar'})]},
 21:{phase:'Sua decisão',title:'Quer colocar os documentos da mudança em ordem?',choices:[choice('Sim, quero saber o que conferir','📂',{documentPlan:'sim'}),choice('Quero comparar com o que já organizei','📝',{documentPlan:'comparar'}),choice('Prefiro continuar organizando por conta própria','🧭',{documentPlan:'sozinho'})]},
 15:{phase:'Seu roteiro inicial',title:`${name}, vamos tirar sua mudança do papel?`,choices:[choice('Sim, quero ver meu plano personalizado','🚀',{readiness:'comecar'}),choice('Quero conhecer e avaliar com calma','🔎',{readiness:'avaliar'})]},
 };return questions[step]??questions[0];
}
export function barrierInsight(a:Answers){
 const insights:Record<string,{title:string;body:string;action:string}>={
 inicio:{title:'Chega de pesquisar sem sair do lugar.',body:'Você disse que não sabe por onde começar. Pesquisar sem uma ordem pode deixar a mudança sempre para depois.',action:'Comece pela rota do destino e pelos documentos que precisa conferir.'},
 destino:{title:'Escolher no escuro pode custar tempo e dinheiro.',body:'Você marcou o medo de escolher o país errado. Um nome de país sozinho não resolve: você precisa conferir o caminho e as exigências.',action:'Use o destino indicado como ponto de partida e valide a rota em fontes oficiais.'},
 documentos:{title:'A papelada não precisa continuar travando você.',body:'Você apontou os documentos como sua maior trava. Separar o que conferir primeiro ajuda a transformar essa preocupação em tarefas.',action:'Confira os documentos da rota e depois organize os de quem vai com você.'},
 organizacao:{title:'Sem ordem, a mudança continua para depois.',body:'Você disse que precisa organizar dinheiro e prazos. Um cronograma ajuda a enxergar o que dá para preparar agora e o que depende de outras etapas.',action:'Divida a preparação em tarefas dentro do prazo que você escolheu.'},
 exploracao:{title:'Descobrir suas opções é o começo. Decidir exige conferir.',body:'Você está conhecendo as possibilidades. O próximo passo é sair das ideias soltas e comparar requisitos concretos.',action:'Confira uma rota possível e suas pendências antes de assumir despesas.'},
 };return insights[a.barrier||'']??insights.exploracao;
}
export function matchesChoice(a:Answers,c:Choice){return Object.entries(c.values).every(([key,value])=>JSON.stringify(a[key as keyof Answers])===JSON.stringify(value))}

export function researchInsight(a:Answers){
 const copy:Record<string,string>={perdido:'Você contou que abre muita coisa e continua perdido. Seu roteiro reúne o que conferir primeiro.',contradicao:'Você contou que encontra informações diferentes. Use as fontes oficiais do resultado para conferir as exigências.',adiando:'Você contou que salva conteúdos, mas ainda não coloca em prática. Escolha uma tarefa pequena para começar.',andamento:'Você já tem coisas encaminhadas. Use o roteiro para revisar o que falta e aproveitar o que já preparou.',inicio:'Você ainda não começou a pesquisar. Seu roteiro oferece um ponto de partida para essa pesquisa.'};
 return copy[a.research||'']||'';
}
export function desiredFuture(a:Answers){
 const copy:Record<string,string>={familia:'Sua família faz parte dessa virada. Coloque as necessidades de quem vai junto no plano.',acao:'Você escolheu o orgulho de ter começado. Uma primeira tarefa é algo que você pode tirar do papel.',carreira:'Você quer novas oportunidades. Comece conferindo as exigências da sua área no destino.',experiencia:'Você quer viver uma nova experiência no seu ritmo. Organize a preparação sem pular as verificações.'};
 return copy[a.future||'']||'';
}

export function preparationSummary(a:Answers){
 const copy:Record<string,string>={confuso:'Documentos: descobrir o que conferir primeiro.',parcial:'Documentos: completar e organizar sua lista.',lista:'Documentos: revisar a lista que você já preparou.'};
 return copy[a.documentStatus||'']||'';
}
export function riskSummary(a:Answers){
 const copy:Record<string,string>={dinheiro:'Antes de assumir despesas, confira os requisitos da rota.',documentos:'Use o checklist para revisar os documentos exigidos.',familia:'Confira também as exigências para quem vai com você.',avaliar:'Comece pelas exigências oficiais antes de decidir.'};
 return copy[a.risk||'']||'';
}
