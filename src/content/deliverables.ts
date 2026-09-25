// Dados da home: as 3 frentes, os 12 itens da entrega, os 4 números do topo
// e as abas do case do painel. Conteúdo aprovado, portado da landing atual
// (CLAUDE-GERAL-\site\assets\js\landing.js).

export interface CoreFrontItem {
  id: string;
  title: string;
  description: string;
  /** true só no card onde o anel da marca pousa ao final da rolagem. */
  hasEmblemSlot?: boolean;
}

// Frases curtas de rascunho, sem promessa inventada — ajustar com o Pedro no
// print de aprovação da etapa 3.
export const CORE_FRONTS: CoreFrontItem[] = [
  {
    id: "identidade-visual",
    title: "Identidade visual",
    description: "Logotipo, paleta e manual de marca prontos pra usar em qualquer material.",
  },
  {
    id: "landing-pages",
    title: "Landing pages",
    description: "Site que carrega rápido e leva direto ao WhatsApp.",
  },
  {
    id: "sistemas-gestao",
    title: "Sistemas de gestão",
    description: "Painel de clientes, projetos e financeiro sob medida para o seu negócio.",
    hasEmblemSlot: true,
  },
  {
    id: "atendimento",
    title: "Atendimento direto com quem faz",
    description: "Sem intermediário: fala com quem desenha e programa o seu projeto.",
  },
];

export interface DeliverableItem {
  id: string;
  label: string;
}

// Ordem fixa (não sorteada), igual à landing atual.
export const DELIVERABLES: DeliverableItem[] = [
  { id: "logotipo", label: "Logotipo" },
  { id: "paleta", label: "Paleta de cores" },
  { id: "tipografia", label: "Tipografia" },
  { id: "manual-marca", label: "Manual de marca" },
  { id: "landing-page", label: "Landing page" },
  { id: "form-leads", label: "Formulário de leads" },
  { id: "whatsapp", label: "Integração WhatsApp" },
  { id: "cad-clientes", label: "Cadastro de clientes" },
  { id: "controle-projetos", label: "Controle de projetos" },
  { id: "fluxo-caixa", label: "Fluxo de caixa" },
  { id: "relatorios", label: "Relatórios" },
  { id: "painel-celular", label: "Painel no celular" },
];

export interface HeroStat {
  id: string;
  target: number;
  suffix?: string;
  label: string;
}

export const HERO_STATS: HeroStat[] = [
  { id: "anos", target: 4, label: "anos de mercado" },
  { id: "prazo", target: 10, suffix: " dias", label: "prazo máximo de entrega" },
  { id: "frentes", target: 3, label: "frentes: arte, web e sistema" },
  { id: "atendimento", target: 1, label: "atendimento direto com quem faz" },
];

export interface CaseTabItem {
  id: string;
  label: string;
  image: string;
  imageAlt: string;
}

export const CASE_TABS: CaseTabItem[] = [
  { id: "resumo", label: "Resumo", image: "/images/homepage/painel-resumo.webp", imageAlt: "Tela de resumo do painel NEW CORP" },
  { id: "clientes", label: "Clientes", image: "/images/homepage/painel-clientes.webp", imageAlt: "Tela de clientes do painel NEW CORP" },
  { id: "projetos", label: "Projetos", image: "/images/homepage/painel-projetos.webp", imageAlt: "Tela de projetos do painel NEW CORP" },
  { id: "financeiro", label: "Financeiro", image: "/images/homepage/painel-financeiro.webp", imageAlt: "Tela de financeiro do painel NEW CORP" },
];
