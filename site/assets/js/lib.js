// Regras puras do site, sem DOM. Testadas com: node --test "testes/*.test.js"

export const waLink = (message) =>
  "https://wa.me/5511988681657" + (message ? `?text=${encodeURIComponent(message)}` : "");

/**
 * Resultado do diagnóstico pelas chaves (value) das opções, nunca pelo texto delas.
 * a = { digital, trava, equipe, prazo }; "equipe" não pesa no resultado.
 */
export function quizResult(a) {
  if (a.trava === "caderno" || a.trava === "manual" || a.digital === "sistema") return "operacao";
  if (a.trava === "imagem") return "percepcao";
  return "presenca";
}

/** Mensagem que o formulário final abre no WhatsApp. */
export function contactMessage({ nome, interesse, diagnostico } = {}) {
  const first = String(nome ?? "").trim().split(/\s+/)[0];
  return [
    `Olá! Sou ${first} e quero meu protótipo de uma tela.`,
    interesse && `Interesse: ${interesse}.`,
    diagnostico && `Meu diagnóstico: ${diagnostico}`,
  ].filter(Boolean).join("\n");
}

/* ---------- Matemática do topo guiado pela rolagem ---------- */

export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export const smoothstep = (p, e0, e1) => {
  const t = clamp((p - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

/** Opacidade de uma faixa de legenda [a, b]. A primeira não tem rampa de entrada; a última, de saída. */
export function bandOpacity(p, a, b, { first = false, last = false } = {}) {
  const f = Math.min(0.02, (b - a) / 3);
  const enter = first ? +(p >= a) : smoothstep(p, a, a + f);
  const leave = last ? +(p <= b) : 1 - smoothstep(p, b - f, b);
  return enter * leave;
}

/** Progresso de montagem do texto dentro da faixa (0 a 1). */
export const bandK = (p, a, b, ramp) => clamp((p - a) / (ramp || Math.min(0.025, (b - a) * 0.35)), 0, 1);

/** Aproxima `shown` de `target` com a mesma sensação em 60 Hz ou 120 Hz. */
export const approach = (shown, target, dtMs, k = 0.16) =>
  shown + (target - shown) * (1 - Math.pow(1 - k, Math.min(100, dtMs) / 16.667));

/** Gerador pseudoaleatório com semente: os mesmos "aleatórios" a cada carregamento. */
export function rng(seed) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}
