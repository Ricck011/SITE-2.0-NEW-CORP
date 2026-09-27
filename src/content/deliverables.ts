// Dados da home: as 3 frentes, os 12 itens da entrega, os 4 números do topo
// e a vitrine do hero. Conteúdo aprovado, portado da landing atual
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
  /** Uma linha dizendo o que o item é na prática. */
  description: string;
  /** A qual das três frentes o item pertence (vira o rótulo do cartão). */
  front: "Marca" | "Web" | "Sistema";
  /** Nome do ícone lucide-react; o mapa fica em `integrations.tsx`. */
  icon: string;
}

// Ordem fixa (não sorteada): marca, depois web, depois sistema — a mesma
// ordem em que o trabalho acontece.
export const DELIVERABLES: DeliverableItem[] = [
  {
    id: "logotipo",
    label: "Logotipo",
    description: "Versão principal, reduzida e monocromática, em arquivo que não perde qualidade em nenhum tamanho.",
    front: "Marca",
    icon: "Hexagon",
  },
  {
    id: "paleta",
    label: "Paleta de cores",
    description: "As cores da marca com o código exato de cada uma, conferidas em fundo claro e escuro.",
    front: "Marca",
    icon: "Palette",
  },
  {
    id: "tipografia",
    label: "Tipografia",
    description: "As fontes escolhidas e onde usar cada uma: título, texto corrido e destaque.",
    front: "Marca",
    icon: "Type",
  },
  {
    id: "manual-marca",
    label: "Manual de marca",
    description: "Um guia curto com o certo e o errado, para quem for mexer na sua marca depois de mim.",
    front: "Marca",
    icon: "BookOpen",
  },
  {
    id: "landing-page",
    label: "Landing page",
    description: "Uma página feita para uma coisa só: transformar quem chega em contato no seu WhatsApp.",
    front: "Web",
    icon: "LayoutTemplate",
  },
  {
    id: "form-leads",
    label: "Formulário de leads",
    description: "A pessoa preenche e o pedido chega direto a você, sem plataforma no meio cobrando mensalidade.",
    front: "Web",
    icon: "ClipboardList",
  },
  {
    id: "whatsapp",
    label: "Integração WhatsApp",
    description: "Botão que já abre a conversa com a mensagem escrita, para a pessoa só apertar enviar.",
    front: "Web",
    icon: "MessageCircle",
  },
  {
    id: "cad-clientes",
    label: "Cadastro de clientes",
    description: "Cada cliente com histórico, telefone e em que pé está a negociação.",
    front: "Sistema",
    icon: "Users",
  },
  {
    id: "controle-projetos",
    label: "Controle de projetos",
    description: "O que está em andamento, o que travou e o que já foi entregue, numa tela só.",
    front: "Sistema",
    icon: "FolderKanban",
  },
  {
    id: "fluxo-caixa",
    label: "Fluxo de caixa",
    description: "Entrada e saída lançadas na hora, com o saldo do mês sempre à vista.",
    front: "Sistema",
    icon: "Wallet",
  },
  {
    id: "relatorios",
    label: "Relatórios",
    description: "Os números do mês prontos quando você abrir, sem montar planilha no domingo.",
    front: "Sistema",
    icon: "BarChart3",
  },
  {
    id: "painel-celular",
    label: "Painel no celular",
    description: "O mesmo painel no telefone, para consultar de qualquer lugar sem abrir o computador.",
    front: "Sistema",
    icon: "Smartphone",
  },
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
