// "Como funciona" (4 passos). Conteúdo aprovado, portado da landing atual
// (CLAUDE-GERAL-\site\index.html, seção #como).

export const HOW_IT_WORKS_TITLE = "Do primeiro papo ao ar em 10 dias úteis.";

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: "01",
    title: "Conversa de 20 minutos",
    description: "Você conta como a empresa funciona hoje e o que está travando. Sem briefing longo nem formulário gigante.",
  },
  {
    number: "02",
    title: "Protótipo de uma tela",
    description: "Desenho uma tela real do seu projeto — a home, o painel, o que fizer mais sentido. Sem custo e sem compromisso.",
  },
  {
    number: "03",
    title: "Produção",
    description: "Aprovado o rumo, entra a produção: arte, página e sistema na mesma linha visual.",
  },
  {
    number: "04",
    title: "No ar em até 10 dias úteis",
    description: "Entrega publicada, com você sabendo mexer. Ajustes da primeira semana já estão inclusos.",
  },
];
