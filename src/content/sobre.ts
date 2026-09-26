// Texto da página /sobre. Substitui o conteúdo do template Revio, que trazia
// um "James Whitaker, Founder & CEO" inventado, escritórios em Londres e
// animações de pagamento global — nada disso existe.
//
// Fatos usados aqui, todos verdadeiros: fundador único, veio de três anos de
// vendas na indústria, base em Cajamar e atende São Paulo.

export const SOBRE_BADGE = "Sobre";
export const SOBRE_TITLE = "Vim de vendas. Por isso aqui ninguém fala difícil.";
export const SOBRE_LEDE =
  "Sou o Pedro Henrique. Toco a NEW CORP STUDIO sozinho, de Cajamar, atendendo toda São Paulo.";

/** Cada parágrafo da história, na ordem. */
export const SOBRE_STORY: string[] = [
  "Passei três anos vendendo para a indústria. Nesse tempo entrei em muita empresa pequena que trabalhava bem e vendia mal — não por falta de qualidade, mas porque quem procurava no Google não achava, e quem achava via uma apresentação que não combinava com o serviço prestado.",
  "Aprendi a programar para resolver exatamente isso. Hoje faço as três coisas que faltavam naquelas empresas: a marca, a página e o sistema que segura a operação por dentro.",
  "Como vim de vendas e não de tecnologia, eu explico em português. Se em algum momento eu soltar uma palavra que você não entendeu, pode me parar na hora — o erro é meu, não seu.",
];

export interface Principle {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const PRINCIPLES: Principle[] = [
  {
    id: "direto",
    title: "Você fala comigo, não com um atendimento",
    description:
      "Quem responde o WhatsApp é a mesma pessoa que desenha a marca e escreve o código. Não tem time no meio nem número de chamado.",
    icon: "MessageSquare",
  },
  {
    id: "preco",
    title: "Preço fechado antes de começar",
    description:
      "Você aprova escopo e valor antes da primeira parcela. O que não estava combinado eu falo na hora, não na fatura do fim.",
    icon: "Receipt",
  },
  {
    id: "prazo",
    title: "Prazo curto, e dito na cara",
    description:
      "Até 10 dias úteis do primeiro papo ao ar. Se alguma coisa atrasar, você descobre pelo motivo que eu te conto, não pelo silêncio.",
    icon: "CalendarCheck",
  },
  {
    id: "posse",
    title: "Você fica dono de tudo",
    description:
      "Arquivos, código e acessos ficam no seu nome. Se um dia quiser trocar de fornecedor, leva o trabalho inteiro junto.",
    icon: "KeyRound",
  },
];

export interface SobreFact {
  id: string;
  value: string;
  label: string;
}

export const SOBRE_FACTS: SobreFact[] = [
  { id: "base", value: "Cajamar", label: "Base do estúdio, atendendo toda SP" },
  { id: "prazo", value: "10 dias", label: "Prazo máximo, do primeiro papo ao ar" },
  { id: "frentes", value: "3 frentes", label: "Marca, página e sistema pela mesma pessoa" },
  { id: "prototipo", value: "Sem custo", label: "O protótipo de uma tela, antes de fechar" },
];

export const SOBRE_PROOF_TITLE = "O sistema que eu vendo é o que eu uso";
export const SOBRE_PROOF_BODY =
  "O painel de clientes, projetos e financeiro da própria NEW CORP foi construído por mim e roda todos os meus projetos. Quando eu digo que o fluxo funciona, é porque é nele que eu lanço a minha própria conta no fim do mês.";
export const SOBRE_PROOF_CTA = "Ver o painel por dentro";

export const SOBRE_CTA_TITLE = "Vamos conversar?";
export const SOBRE_CTA_LEDE =
  "Vinte minutos para você me contar como a empresa funciona hoje. Saio dali e te devolvo uma tela desenhada do seu projeto.";
