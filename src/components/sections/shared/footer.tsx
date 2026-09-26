import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { COPYRIGHT, DOMAIN_PENDING_NOTE, FOOTER_PAGE_LINKS, FOOTER_TAGLINE, GITHUB_URL, LGPD_TEXT, WHATSAPP_DISPLAY, waLink } from "@/content/site";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-background text-foreground pt-24 md:pt-36 pb-8 overflow-hidden">
      <Container className="relative z-20">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          <div className="space-y-6 max-w-[310px]">
            <Link to="/">
              <img className="mb-6 h-10 w-auto" src="/images/marca/newcorp-nc-mark.png" alt="NEW CORP" />
            </Link>
            <p className="text-muted-foreground">{FOOTER_TAGLINE}</p>
          </div>

          <div className="max-w-[537px] grid grid-cols-1 sm:grid-cols-2 gap-10">
            <AnimateOnView once delay={0.1}>
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground mb-6">Página</h3>
              <ul className="space-y-3">
                {FOOTER_PAGE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimateOnView>

            <AnimateOnView once delay={0.2}>
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground mb-6">Contato</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    WhatsApp {WHATSAPP_DISPLAY}
                  </a>
                </li>
                <li>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </AnimateOnView>
          </div>
        </div>

        <AnimateOnView once delay={0.25} className="mb-8">
          <p id="privacidade" className="text-sm text-muted-foreground max-w-[640px]">
            {LGPD_TEXT}
          </p>
        </AnimateOnView>

        <AnimateOnView once delay={0.3} className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-sm text-muted-foreground text-center md:text-left">{COPYRIGHT}</p>
            <p className="font-mono text-sm text-muted-foreground">{DOMAIN_PENDING_NOTE}</p>
          </div>
        </AnimateOnView>
      </Container>
    </footer>
  );
};

export default Footer;
