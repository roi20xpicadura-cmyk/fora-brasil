# FORA BRASIL

Funil mobile-first em Next.js, React, TypeScript, Tailwind CSS e componentes shadcn/ui.

## Executar

Node 20.9+ e pnpm. `pnpm install`, `pnpm dev`, `pnpm build`. A exportação estática fica em `out/`. Testes: `pnpm test` ou `node --import tsx --test tests/*.test.ts`.

## Fluxo atual

Entrada → 20 telas de resposta rápida → resultado com destino, resumo do obstáculo e primeiras ações → oferta.

As perguntas incluem objetivo, família, prazo, nome, área de trabalho, idioma, economia mensal, obstáculo, experiência de pesquisa, prioridade, desejo de futuro, interesse na organização e escolha de ver o roteiro. Só o nome exige digitação. As outras respostas usam cards com emojis contextuais e avanço automático. Cidadania, formação, experiência, oferta de trabalho e reserva atual não são perguntadas. Dados antigos desses campos são desconsiderados na retomada.

## Personalização e dados

Respostas e checklist ficam no localStorage `plano-internacional-v1`; sem contas, upload de documentos ou sincronização entre dispositivos. As rotas por hash incluem `#inicio`, `#quiz`, `#explain`, `#result`, `#plan` e `#offer`. Perfil completo é necessário para retomar as telas posteriores ao quiz. A versão do funil é 4: sessões da sequência antiga preservam os dados, mas precisam responder à nova sequência antes de revelar o país.

`lib/engine.ts` ordena os países como prioridade editorial de investigação. Não calcula probabilidade de aprovação nem comprova elegibilidade. O nível dos idiomas não é avaliado. Cidadania não é presumida. Fontes oficiais foram consultadas em 26/10/2026 e precisam ser revalidadas quando as regras mudarem.

Valores financeiros escolhidos são aproximações para planejamento. A reserva atual não é coletada. A simulação de novos aportes usa apenas economia mensal × prazo. A opção de 5 pessoas ou mais é tratada como mínimo de cinco, sem inventar o total exato. A página de vendas foca em destino, documentos, família e próximos passos; não apresenta painel financeiro.

## Condições comerciais

Edite `lib/config.ts` para definir preço, modalidade de cobrança, checkout HTTPS, garantia real e suporte. Preço definido: R$ 37,90, pagamento único. Checkout Kirvano configurado nos botões de compra. Os antigos depoimentos ilustrativos estão no arquivo de configuração, mas não são exibidos na oferta atual. Não usar exemplos fictícios como prova social real. A oferta contém uma demonstração interativa e um aplicativo funcional em `/meu-plano`, com tarefas, situação dos documentos, familiares e meta de preparação. Dados ficam no navegador, sem contas, sincronização ou validação de compra. A entrega na Kirvano deve apontar para esse endereço; não há liberação automática implementada. Os materiais estão em `/bonus/checklist-de-partida.pdf` e `/bonus/cronograma-da-mudanca.pdf`.

## Conversão

Eventos `quiz_start`, `quiz_step`, `quiz_complete`, `view_*` e `checkout_click` são armazenados em `pi-events` (até 200) e emitidos como CustomEvent `plano:analytics`, sem nome ou respostas pessoais. Não há analytics centralizado nesta versão.

## Publicação

Produção: https://plano-internacional.vercel.app
Projeto Vercel: plano-internacional, equipe korafinance. Deploy por API com fontes, framework Next.js, Node 22.x, `pnpm run build`, instalação com lockfile e Output Directory automático (`null`). Não definir `out` como diretório de saída do adaptador Next.js. Configuração local em `.vercel/project.json`, ignorada no Git. A proteção padrão da equipe foi preservada.

O antigo endereço Sites foi substituído pelo endereço Vercel. `.openai/hosting.json` mantém a identidade anterior apenas para referência; atualizações deste funil são publicadas na Vercel.

Fotos via Unsplash e fonte Inter via Google Fonts dependem de acesso à internet. Nenhuma credencial deve ser adicionada ao código.

O roteiro inicial é gerado com destino, número de pessoas, área de trabalho e prazo declarados. A oferta apresenta R$ 37,90 com centavos, sem prometer visto, emprego ou data de saída.

Marca atual: FORA BRASIL. O endereço e o nome técnico do projeto Vercel permanecem os mesmos. O resultado exige todas as vinte respostas explicitamente registradas; valores padrão não liberam o destino. A foto inicial mostra uma família no aeroporto, sem legenda e sem indicar um país.

## Estrutura editorial atual

Remodelagem baseada nos três materiais fornecidos: desejo → reconhecimento do obstáculo → introdução da organização como solução. São 5 perguntas de desejo, 5 de problema e 7 de solução, além de 3 respostas de perfil (profissão, idioma e economia mensal). As últimas 3 perguntas fazem a transição por confirmações, com alternativas de avaliação e autonomia. Os rótulos de fase não aparecem na interface. As antigas rotas #explain e #plan agora encaminham para o resultado consolidado. Resumos usam o obstáculo e a experiência de pesquisa declarados, sem notas, diagnósticos ou provas sociais fictícias. Respostas de dúvida e interesse em avaliar são aceitas. A prioridade por documentos altera a ordem das tarefas; escolhas emocionais não alteram a elegibilidade migratória.

## Página de vendas e bônus

A página final segue os materiais de referência: promessa, conexão emocional, benefícios, por que funciona, demonstração, público, entregáveis, prova pela personalização, bônus, oferta, condições de compra e FAQ. Os bônus são o aplicativo e dois PDFs de duas páginas cada. Não são exibidos depoimentos fictícios, estatísticas de resultados, descontos sem preço anterior . Garantia de 30 dias informada pelo responsável, configurada em `lib/config.ts`. O quiz foi preservado.

## Auditoria da página de vendas

Revisão completa dos dois PDFs: headline agora explicita a organização da saída do Brasil; conexão emocional contém benefício de clareza e preparo da família; motivo de funcionamento e uso foram separados; comparação visual adicionada; bônus mostram prévias dos PDFs; oferta discrimina o pacote sem custo adicional dos bônus; garantia tem destaque de 30 dias; FAQ inclui iniciantes e início da preparação. `previousPrice` só deve receber um preço anterior real; null não apresenta desconto fictício. As provas são de funcionamento e personalização, não estatísticas de sucesso ou depoimentos inventados.

## Escolha de destino

A primeira tela permite escolher Estados Unidos, Portugal, Canadá, Espanha, Alemanha, Uruguai ou Ainda não decidi. A preferência explícita define o destino das perguntas, do resultado, das tarefas e da oferta. Quem não decidiu mantém a indicação editorial. O resultado informa que o plano de preparação está pronto, sem simular aprovação migratória. A versão 4 exige completar a nova sequência. Estados Unidos foi incluído com referência ao Departamento de Estado: https://travel.state.gov/content/travel/en/us-visas/immigrate.html. Não se determina uma categoria nem elegibilidade pelo quiz.

## Edição visual da venda

A página final mantém os 12 blocos principais, com textos reduzidos, comparação ilustrada, mapa visual do plano, etapas em três passos, cards de público e bônus compactos. A prévia usa gráfico circular calculado apenas pelas tarefas marcadas, identificado como progresso da demonstração. País, preço, checkout e garantia foram preservados.

## Seleção do quiz e copy simples

As opções entram neutras em cada tela. Respostas continuam salvas para o resultado, sem marcação visual automática. O preenchimento de hover foi removido e um novo quiz após a conclusão começa com respostas limpas. Tentativas incompletas podem ser retomadas. A venda passou a usar frases curtas, lista do que fazer e calendário da mudança no lugar de termos mais técnicos. Os nomes comerciais simplificados dos bônus correspondem aos mesmos PDFs entregues.


## Quiz enxuto — versão 6
O fluxo atual tem 13 telas: destino, objetivo, família, prazo, nome, profissão, idioma, economia mensal, principal dificuldade, documentos, mecanismo da solução, visualização da mudança e decisão de ver o plano. Preserva as três fases dos PDFs com uma transição curta de três perguntas diferentes. A sequência de confirmações repetidas foi removida. Sessões das versões 4 e 5 preservam respostas relevantes e avançam para a próxima pergunta válida; respostas de etapas removidas não influenciam o resultado.
