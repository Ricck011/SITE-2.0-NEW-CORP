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

// Texto aprovado, literal da landing atual (CLAUDE-GERAL-\site, seção
// #solucoes) — o 4º cartão (prototipo) usa o texto do passo 02 do "como
// funciona", também já aprovado.
export const CORE_FRONTS: CoreFrontItem[] = [
  {
    id: "identidade-visual",
    title: "Identidade visual",
    description: "Marca, paleta, tipografia e aplicações — feitas para viver no digital, não só no papel.",
  },
  {
    id: "landing-pages",
    title: "Landing pages",
    description: "Página única, rápida e construída para uma coisa só: transformar visita em contato.",
  },
  {
    id: "sistemas-gestao",
    title: "Sistemas de gestão",
    description: "Clientes, projetos e financeiro no mesmo lugar — o fluxo desenhado a partir da sua operação.",
    hasEmblemSlot: true,
  },
  {
    id: "prototipo",
    title: "Protótipo de uma tela",
    description: "Desenho uma tela real do seu projeto — a home, o painel, o que fizer mais sentido. Sem custo e sem compromisso.",
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

export interface HeroFeat {
  id: string;
  label: string;
}

// Os 4 selos com seta embaixo do botão do topo (layout Neural Pathway).
// Texto curto: no computador os quatro ficam numa linha só.
export const HERO_FEATS: HeroFeat[] = [
  { id: "identidade", label: "Identidade visual" },
  { id: "landing", label: "Landing page" },
  { id: "sistema", label: "Sistema de gestão" },
  { id: "prazo", label: "Entrega em até 10 dias" },
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

export interface ShowcaseItem {
  id: string;
  label: string;
  image: string;
  imageAlt: string;
}

// Vitrine do topo: só trabalho real (case Game Brothers + telas do painel
// próprio), nada de foto de banco de imagem.
export const HERO_SHOWCASE: ShowcaseItem[] = [
  {
    id: "landing-game-brothers",
    label: "case · landing page",
    image: "/images/case-game-brothers/gb-depois-desktop.webp",
    imageAlt: "Site da Game Brothers depois da reconstrução",
  },
  {
    id: "sistema-resumo",
    label: "case · sistema",
    image: "/images/homepage/painel-resumo.webp",
    imageAlt: "Tela de resumo do painel NEW CORP",
  },
  {
    id: "sistema-projetos",
    label: "case · sistema",
    image: "/images/homepage/painel-projetos.webp",
    imageAlt: "Tela de projetos do painel NEW CORP",
  },
];
