import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import {
  PRINCIPLES,
  SOBRE_CTA_LEDE,
  SOBRE_CTA_TITLE,
  SOBRE_PROOF_BODY,
  SOBRE_PROOF_TITLE,
} from "@/content/sobre";
import { ArrowRight, CalendarCheck, KeyRound, MessageSquare, Receipt, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ICONS: Record<string, LucideIcon> = { MessageSquare, Receipt, CalendarCheck, KeyRound };

// Substitui o "Values" do template, que eram três animações Lottie de
// pagamento global sem uma palavra escrita.
const Principles = () => {
  return (
    <section className="py-20 md:py-24 lg:py-28">
      <Container>
        <AnimateOnView>
          <h2 className="h3 max-w-[16ch]">Como eu trabalho</h2>
        </AnimateOnView>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:mt-16 sm:grid-cols-2">
          {PRINCIPLES.map((principle, index) => {
            const Icon = ICONS[principle.icon];
            return (
              <AnimateOnView key={principle.id} asChild delay={index * 0.07}>
                <div className="bg-background p-7 md:p-8">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-brand-accent-soft">
                    {Icon ? <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" /> : null}
                  </span>
                  <h3 className="h6 mt-5">{principle.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.55] text-muted-foreground">{principle.description}</p>
                </div>
              </AnimateOnView>
            );
          })}
        </div>

        <AnimateOnView className="mt-16 md:mt-20">
          <div className="rounded-lg border border-border bg-card p-8 md:p-12">
            <h2 className="h4 max-w-[22ch]">{SOBRE_PROOF_TITLE}</h2>
            <p className="paragraph-regular mt-5 max-w-[62ch] text-muted-foreground">{SOBRE_PROOF_BODY}</p>
          </div>
        </AnimateOnView>

        <AnimateOnView className="mt-20 text-center md:mt-24">
          <h2 className="h3">{SOBRE_CTA_TITLE}</h2>
          <p className="paragraph-regular mx-auto mt-4 max-w-[52ch] text-muted-foreground">{SOBRE_CTA_LEDE}</p>
          <div className="mt-8 flex justify-center">
            <Button asChild>
              <Link to="/#contato">
                Começar meu projeto
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </AnimateOnView>
      </Container>
    </section>
  );
};

export default Principles;
