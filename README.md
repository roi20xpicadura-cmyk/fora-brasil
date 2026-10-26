# FORA BRASIL

Funil mobile-first em Next.js, React, TypeScript, Tailwind CSS e componentes shadcn/ui.

## Executar

Node 20.9+ e pnpm. `pnpm install`, `pnpm dev`, `pnpm build`. A exportação estática fica em `out/`. Testes: `pnpm test` ou `node --import tsx --test tests/*.test.ts`.

## Fluxo atual

Entrada → 7 perguntas → explicação breve → resultado → plano em 3 passos → oferta.

As perguntas são nome, objetivo, área de trabalho, idioma, economia mensal planejada, família e prazo. Só o nome exige digitação. As outras respostas usam cards com emojis contextuais e avanço automático. Cidadania, formação, experiência, oferta de trabalho e reserva atual não são perguntadas. Dados antigos desses campos são desconsiderados na retomada.

## Personalização e dados

Respostas e checklist ficam no localStorage `plano-internacional-v1`; sem contas, upload de documentos ou sincronização entre dispositivos. As rotas por hash incluem `#inicio`, `#quiz`, `#explain`, `#result`, `#plan` e `#offer`. Perfil completo é necessário para retomar as telas posteriores ao quiz.

`lib/engine.ts` ordena os países como prioridade editorial de investigação. Não calcula probabilidade de aprovação nem comprova elegibilidade. O nível dos idiomas não é avaliado. Cidadania não é presumida. Fontes oficiais foram consultadas em 26/10/2026 e precisam ser revalidadas quando as regras mudarem.

Valores financeiros escolhidos são aproximações para planejamento. A reserva atual não é coletada. A simulação de novos aportes usa apenas economia mensal × prazo. A opção de 5 pessoas ou mais é tratada como mínimo de cinco, sem inventar o total exato. A página de vendas foca em destino, documentos, família e próximos passos; não apresenta painel financeiro.

## Condições comerciais

Edite `lib/config.ts` para definir preço, modalidade de cobrança, checkout HTTPS, garantia real e suporte. Preço definido: R$ 37,90, pagamento único. Checkout Kirvano configurado nos botões de compra. Os antigos depoimentos ilustrativos estão no arquivo de configuração, mas não são exibidos na oferta atual. Não usar exemplos fictícios como prova social real. Esta entrega contém a prévia interativa do aplicativo, não um serviço de área de membros com liberação automática após pagamento.

## Conversão

Eventos `quiz_start`, `quiz_step`, `quiz_complete`, `view_*` e `checkout_click` são armazenados em `pi-events` (até 200) e emitidos como CustomEvent `plano:analytics`, sem nome ou respostas pessoais. Não há analytics centralizado nesta versão.

## Publicação

Produção: https://plano-internacional.vercel.app
Projeto Vercel: plano-internacional, equipe korafinance. Deploy por API com fontes, framework Next.js, Node 22.x, `pnpm run build`, instalação com lockfile e Output Directory automático (`null`). Não definir `out` como diretório de saída do adaptador Next.js. Configuração local em `.vercel/project.json`, ignorada no Git. A proteção padrão da equipe foi preservada.

O antigo endereço Sites foi substituído pelo endereço Vercel. `.openai/hosting.json` mantém a identidade anterior apenas para referência; atualizações deste funil são publicadas na Vercel.

Fotos via Unsplash e fonte Inter via Google Fonts dependem de acesso à internet. Nenhuma credencial deve ser adicionada ao código.

O roteiro inicial é gerado com destino, número de pessoas, área de trabalho e prazo declarados. A oferta apresenta R$ 37,90 com centavos, sem prometer visto, emprego ou data de saída.

Marca atual: FORA BRASIL. O endereço e o nome técnico do projeto Vercel permanecem os mesmos. O resultado exige todas as sete respostas explicitamente registradas; valores padrão não liberam o destino. A foto inicial mostra uma família no aeroporto, sem legenda e sem indicar um país.
