export const offer = {
  price: 37.90 as number | null, // Preço da oferta em reais.
  billing: 'pagamento único',
  checkoutUrl: 'https://pay.kirvano.com/e3104457-9618-499e-8e8f-93007cffa1a9', // URL HTTPS do seu checkout. Não envie respostas pessoais na URL.
  guarantee: '', // Somente a política real, aprovada pelo responsável pelo produto.
  guaranteeUrl: '',
  supportEmail: '',
  testimonials: [
    {name:'Marina A.', destination:'Planejamento em família',text:'Quando colocamos os documentos e as metas no mesmo lugar, ficou muito mais fácil enxergar nosso próximo passo.'},
    {name:'Rafael M.', destination:'Organização financeira',text:'O sonho parecia distante. Dividir a reserva em metas mensais deixou o planejamento mais concreto.'},
    {name:'Camila S.', destination:'Uma etapa de cada vez',text:'Ter um checklist nos ajudou a conversar sobre prazos e decidir o que precisava de atenção primeiro.'},
  ],
  testimonialsAreIllustrative: true,
};
