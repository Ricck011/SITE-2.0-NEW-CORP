// Motor de respostas do assistente, portado literal de
// CLAUDE-GERAL-\site\assets\js\landing.js (função `answer`). Mock por regras
// de palavra-chave, sem IA de verdade e sem chamada de rede — nunca informa
// preço, só coleta contato e sugere continuar no WhatsApp.

/** Tempo de "digitando" antes da resposta aparecer (igual ao original). */
export const ASSISTANT_TYPING_DELAY_MS = 650;

function hasAny(text: string, ...keywords: string[]): boolean {
  return keywords.some((keyword) => text.indexOf(keyword) >= 0);
}

/** Dado o texto da pergunta, devolve a resposta do assistente (regra fixa, sem estado). */
export function getAssistantReply(question: string): string {
  const t = String(question ?? "").toLowerCase();

  if (t.replace(/\D/g, "").length >= 10) {
    return "Anotado, obrigado! Te chamo nesse WhatsApp hoje ainda. Enquanto isso, pode perguntar o que quiser.";
  }
  if (hasAny(t, "preço", "preco", "custa", "custo", "valor", "orçamento", "orcamento", "quanto")) {
    return "Não trabalho com tabela fixa: cada projeto é orçado pelo escopo. Posso montar o seu e te devolver em 24h. Me diz seu nome e WhatsApp?";
  }
  if (hasAny(t, "prazo", "tempo", "quando", "demora", "dias")) {
    return "O prazo de entrega é de até 10 dias úteis depois do escopo aprovado. Sistemas com muitos módulos podem variar. Quer que eu monte um cronograma pro seu caso?";
  }
  if (hasAny(t, "sistema", "gestão", "gestao", "estoque", "erp", "pedido", "financeiro", "caixa", "relatório", "relatorio")) {
    return "Sim. O painel que a NEW CORP usa tem clientes, projetos e financeiro — dá uma olhada na seção de cases. O seu é desenhado a partir da sua operação, não de um template. Que processo você quer organizar primeiro?";
  }
  if (hasAny(t, "landing", "site", "página", "pagina", "web")) {
    return "Landing page é uma das três frentes, junto com identidade visual e sistemas. Começo sempre por um protótipo de uma tela, sem custo, pra você ver o resultado antes de fechar. Quer o seu?";
  }
  if (hasAny(t, "identidade", "logo", "marca", "arte", "visual", "design")) {
    return "Identidade visual completa: marca, paleta, tipografia e aplicações. A arte é pensada para viver no digital, não só no papel. Sua empresa já tem alguma marca hoje?";
  }
  if (hasAny(t, "protótipo", "prototipo", "teste", "amostra", "grátis", "gratis")) {
    return "Faço um protótipo de uma tela sem custo pra você ver a direção. Me passa nome e WhatsApp que eu coloco na fila.";
  }
  if (hasAny(t, "onde", "cidade", "local", "presencial", "cajamar", "atende")) {
    return "A NEW CORP fica em Cajamar e atende SP.";
  }
  if (hasAny(t, "oi", "olá", "ola", "bom dia", "boa tarde", "boa noite")) {
    return "Olá! Me conta rapidinho: o que sua empresa precisa resolver primeiro — a marca, a página ou o sistema?";
  }
  return "Só consigo falar sobre a NEW CORP: identidade visual, landing pages e sistemas de gestão. Qual dos três te interessa?";
}
