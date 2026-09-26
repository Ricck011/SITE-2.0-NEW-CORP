// Texto aprovado na landing atual (CLAUDE-GERAL-\site, seção #diagnostico),
// portado literal. Lógica de resultado fica em src/lib/quiz.ts — aqui só o
// texto de cada pergunta/opção/resultado.

import type { QuizNextStepVariant, QuizResultId } from "@/lib/quiz";

export const QUIZ_BADGE = "Diagnóstico";
export const QUIZ_TITLE = "Descubra por onde começar.";
export const QUIZ_LEDE = "Quatro perguntas. No fim, um protótipo de uma tela feito pro seu caso — sem custo.";

export interface QuizQuestion {
  question: string;
  options: string[];
}

// Pergunta 3 ("quantas pessoas na operação") é coletada mas não entra na
// lógica de resultado — comportamento aprovado, não é bug.
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "O que sua empresa tem hoje no digital?",
    options: ["Nada ainda", "Só Instagram", "Um site antigo", "Site e sistema, mas ruins"],
  },
  {
    question: "O que mais te trava agora?",
    options: ["Ninguém me acha", "Passo a imagem errada", "Controlo tudo no caderno", "Perco tempo com tarefa manual"],
  },
  {
    question: "Quantas pessoas estão na operação?",
    options: ["Só eu", "2 a 5", "6 a 20", "Mais de 20"],
  },
  {
    question: "Quando você quer isso no ar?",
    options: ["Essa semana", "Até 30 dias", "Sem pressa, quero entender"],
  },
];

export const QUIZ_LEAD_TITLE = "Pra onde eu mando o diagnóstico?";
export const QUIZ_LEAD_KICKER = "último passo";
export const QUIZ_LEAD_CONSENT_TEXT =
  "Autorizo a NEW CORP a usar meus dados para entrar em contato sobre este diagnóstico (LGPD).";
export const QUIZ_LEAD_SUBMIT_LABEL = "Ver meu diagnóstico";

export const QUIZ_DONE_KICKER = "diagnóstico pronto";
export const QUIZ_NEXT_STEP_LABEL = "próximo passo";
export const QUIZ_WHATSAPP_CTA = "Continuar no WhatsApp";

interface QuizResultContent {
  title: string;
  /** {nome} é substituído pelo primeiro nome de quem respondeu. */
  introTemplate: string;
  recommendations: [string, string, string];
}

export const QUIZ_RESULTS: Record<QuizResultId, QuizResultContent> = {
  "comece-presenca": {
    title: "Comece pela presença: marca e página primeiro.",
    introTemplate: "{nome}, pelas suas respostas o gargalo está em ser encontrado e entendido, antes de escalar a operação.",
    recommendations: [
      "Identidade visual enxuta: marca, paleta e tipografia prontas para uso digital.",
      "Uma landing page única com formulário e WhatsApp, feita para gerar contato.",
      "Perfil e página falando a mesma língua, com a mesma promessa.",
    ],
  },
  "gargalo-operacao": {
    title: "Seu gargalo é operação: comece pelo sistema.",
    introTemplate: "{nome}, o negócio já gera demanda — o que está custando dinheiro é o controle manual.",
    recommendations: [
      "Sistema de gestão sob medida para o processo que mais consome seu tempo hoje.",
      "Clientes, projetos e financeiro num lugar só, com relatório simples.",
      "Landing page conectada ao sistema, para o contato entrar já organizado.",
    ],
  },
  "problema-percepcao": {
    title: "O problema não é volume, é percepção.",
    introTemplate: "{nome}, chega gente até você, mas a apresentação está entregando menos do que a empresa é.",
    recommendations: [
      "Reposicionamento visual: identidade nova aplicada em tudo que o cliente vê.",
      "Landing page mostrando processo, cases e prova social.",
      "Padronização de propostas e materiais com a nova marca.",
    ],
  },
};

export const QUIZ_NEXT_STEP_TEXT: Record<QuizNextStepVariant, string> = {
  urgencia: "Marquei urgência: te chamo hoje no WhatsApp com o protótipo em andamento.",
  "sem-pressa": "Te chamo no WhatsApp com o protótipo e uma explicação de cada etapa, sem pressão de fechar.",
  padrao: "Vou preparar um protótipo de uma tela do seu projeto e te mostrar no WhatsApp.",
};
