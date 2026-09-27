// Dados que se repetem pelo site: WhatsApp, menu, contato e texto de privacidade.
// Conteúdo aprovado, portado da landing atual (CLAUDE-GERAL-\site).

export const WHATSAPP_NUMBER = "5511988681657";
export const WHATSAPP_DISPLAY = "11 98868-1657";
export const GITHUB_URL = "https://github.com/Ricck011";

export function waLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const NAV_LINKS = [
  { label: "Serviços", href: "/servicos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Diagnóstico", href: "/#diagnostico" },
  { label: "Assistente", href: "/#assistente" },
] as const;

export const FOOTER_PAGE_LINKS = [
  { label: "Sobre", href: "/sobre" },
  { label: "Soluções", href: "/servicos" },
  { label: "Como funciona", href: "/servicos#como-funciona" },
  { label: "Diagnóstico", href: "/#diagnostico" },
] as const;

export const LOCATION = "Cajamar, atendo SP";

export const LGPD_TEXT =
  "Coletamos nome e WhatsApp apenas para responder ao seu contato. Não compartilhamos com terceiros. Para apagar seus dados, é só pedir pelo WhatsApp.";

export const FOOTER_TAGLINE = "Artes e sistemas para pequenas empresas. Cajamar, atendo SP.";

export const COPYRIGHT = `© ${new Date().getFullYear()} NEW CORP · Artes e sistemas`;

export const DOMAIN_PENDING_NOTE = "domínio a definir";
