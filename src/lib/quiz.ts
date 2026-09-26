// Lógica de resultado do diagnóstico, portada literal de
// CLAUDE-GERAL-\site\assets\js\landing.js (função `result`). Decisão por
// regra (substring das respostas), não soma de pontos — a resposta 3
// ("quantas pessoas na operação") é coletada mas não entra na conta, igual
// ao aprovado.

export type QuizResultId = "gargalo-operacao" | "problema-percepcao" | "comece-presenca";
export type QuizNextStepVariant = "urgencia" | "sem-pressa" | "padrao";

/** answers = [resposta1, resposta2, resposta3, resposta4], texto literal de cada opção escolhida. */
export function getQuizResultId(answers: string[]): QuizResultId {
  const digital = (answers[0] ?? "").toLowerCase();
  const pain = (answers[1] ?? "").toLowerCase();

  if (pain.indexOf("caderno") >= 0 || pain.indexOf("manual") >= 0 || digital.indexOf("sistema") >= 0) {
    return "gargalo-operacao";
  }
  if (pain.indexOf("imagem") >= 0) {
    return "problema-percepcao";
  }
  return "comece-presenca";
}

export function getNextStepVariant(urgencyAnswer: string): QuizNextStepVariant {
  const urgency = (urgencyAnswer ?? "").toLowerCase();
  if (urgency.indexOf("semana") >= 0) return "urgencia";
  if (urgency.indexOf("entender") >= 0) return "sem-pressa";
  return "padrao";
}
