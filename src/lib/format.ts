// Pequenos formatadores de texto usados pelo quiz e pelo formulário de
// contato (mensagens com o primeiro nome de quem respondeu).

/** Primeiro nome, ou "você" se vazio — mesma regra do `firstName()` original. */
export function getFirstName(fullName: string): string {
  const trimmed = String(fullName ?? "").trim();
  if (!trimmed) return "você";
  return trimmed.split(/\s+/)[0];
}

/** Troca "{nome}" pelo primeiro nome dentro de um texto-modelo. */
export function fillNameTemplate(template: string, fullName: string): string {
  return template.replace("{nome}", getFirstName(fullName));
}
