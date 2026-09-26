// Máscara de WhatsApp BR, portada literal de CLAUDE-GERAL-\site\assets\js\landing.js
// (função `mask`). Formata progressivamente enquanto digita: (11) 98868-1657.

/** Formata um telefone brasileiro conforme a pessoa digita, até 11 dígitos. */
export function formatPhoneBR(value: string): string {
  const digits = String(value ?? "").replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/** DDD + número = pelo menos 10 dígitos (mesma regra do `setCustomValidity` original). */
export function isValidPhoneBR(value: string): boolean {
  const digits = String(value ?? "").replace(/\D/g, "");
  return digits.length >= 10;
}
