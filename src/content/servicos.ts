// Texto da página /servicos. Substitui o conteúdo do template Revio
// ("Everything you need to power payments", API, multi-moeda, chargeback),
// que era de uma fintech e não tinha nada a ver com o estúdio.
//
// Regra do estúdio: preço não aparece no site. O orçamento sai em 3 opções
// pelo WhatsApp, caso a caso.

export const SERVICOS_BADGE = "Serviços";
export const SERVICOS_TITLE = "Três frentes. Dá para começar por uma.";
export const SERVICOS_LEDE =
  "Identidade visual, landing page e sistema de gestão. Você pode contratar o pacote inteiro ou só a parte que está travando a sua empresa hoje.";

export interface ServiceFront {
  id: string;
  /** Número + frente, no rótulo pequeno acima do título. */
  kicker: string;
  title: string;
  /** A frase que nomeia o problema, em destaque. */
  problem: string;
  /** O que eu faço a respeito. */
  body: string;
  /** Quem é o cliente típico dessa frente. */
  forWho: string;
  /** Casa com o campo `front` de DELIVERABLES, para listar as entregas. */
  deliverablesFront: "Marca" | "Web" | "Sistema";
}

export const SERVICE_FRONTS: ServiceFront[] = [
  {
    id: "identidade-visual",
    kicker: "01 · Marca",
    title: "Identidade visual",
    problem: "Quando a arte muda a cada post, a empresa parece menor do que ela é.",
    body: "Monto a marca inteira: logotipo, cores, fontes e um guia curto de como aplicar cada coisa. Em arquivo que não perde qualidade, do cartão de visita ao letreiro da fachada.",
    forWho: "Para quem já tem cliente, mas ainda usa um logo feito no celular — ou nunca teve marca nenhuma.",
    deliverablesFront: "Marca",
  },
  {
    id: "landing-page",
    kicker: "02 · Web",
    title: "Landing page",
    problem: "Site bonito que não gera contato é despesa, não investimento.",
    body: "Uma página só, que abre rápido no celular e leva quem chega até o seu WhatsApp. Sem menu gigante e sem páginas que ninguém abre.",
    forWho: "Para quem só tem Instagram, ou tem um site em plataforma genérica que ninguém atualiza há anos.",
    deliverablesFront: "Web",
  },
  {
    id: "sistema-gestao",
    kicker: "03 · Sistema",
    title: "Sistema de gestão",
    problem: "Com o controle na cabeça e na planilha, a empresa não anda sem você dentro.",
    body: "Um painel com clientes, projetos e financeiro, desenhado a partir de como a sua operação já funciona — não de um modelo pronto que você teria que obedecer.",
    forWho: "Para quem já perdeu prazo, cobrança ou cliente por não ter um lugar único para olhar.",
    deliverablesFront: "Sistema",
  },
];

export const SERVICOS_SCOPE_TITLE = "O que eu não faço";
export const SERVICOS_SCOPE_LEDE =
  "Dizer isso agora evita nós dois descobrirmos no meio do projeto. Em qualquer um destes casos, eu indico alguém.";

export interface OutOfScopeItem {
  id: string;
  label: string;
  reason: string;
}

export const OUT_OF_SCOPE: OutOfScopeItem[] = [
  {
    id: "loja",
    label: "Loja virtual com estoque e pagamento",
    reason: "Integro a sua página com quem já faz isso bem, mas não construo a loja do zero.",
  },
  {
    id: "social",
    label: "Gestão de redes sociais",
    reason: "Entrego a marca pronta para usar. Quem posta é você ou o seu social media.",
  },
  {
    id: "trafego",
    label: "Tráfego pago",
    reason: "Faço a página converter quem chega. Levar gente até ela é trabalho de outro profissional.",
  },
  {
    id: "plataforma",
    label: "Site em plataforma de arrastar e soltar",
    reason: "Se a ideia é montar num Wix da vida, você não precisa me pagar para isso.",
  },
];

export const SERVICOS_CTA_TITLE = "Não precisa decidir agora.";
export const SERVICOS_CTA_LEDE =
  "Me conta em 20 minutos como a empresa funciona hoje. Eu desenho uma tela real do seu projeto e te mostro — sem custo e sem compromisso.";
