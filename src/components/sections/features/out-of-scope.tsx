import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import {
  OUT_OF_SCOPE,
  SERVICOS_CTA_LEDE,
  SERVICOS_CTA_TITLE,
  SERVICOS_SCOPE_LEDE,
  SERVICOS_SCOPE_TITLE,
} from "@/content/servicos";
import { ArrowRight, Minus } from "lucide-react";
import { Link } from "react-router-dom";

// Dizer o que fica de fora é argumento de venda: filtra o cliente errado
// antes da proposta e mostra que o escopo tem borda definida.
const OutOfScope = () => {
  return (
    <section className="py-20 md:py-24 lg:py-28" id="escopo">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <AnimateOnView>
              <h2 className="h3">{SERVICOS_SCOPE_TITLE}</h2>
              <p className="paragraph-regular mt-5 max-w-[46ch] text-muted-foreground">{SERVICOS_SCOPE_LEDE}</p>
            </AnimateOnView>
          </div>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-border border-y border-border">
              {OUT_OF_SCOPE.map((item, index) => (
                <AnimateOnView key={item.id} asChild delay={index * 0.06}>
                  <li className="flex gap-4 py-5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-card">
                      <Minus
                        className="h-3.5 w-3.5 text-muted-foreground"
                        strokeWidth={2.25}
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <p className="text-[15px] font-semibold leading-snug text-foreground">{item.label}</p>
                      <p className="mt-1.5 text-sm leading-[1.55] text-muted-foreground">{item.reason}</p>
                    </div>
                  </li>
                </AnimateOnView>
              ))}
            </ul>
          </div>
        </div>

        <AnimateOnView className="mt-20 md:mt-24">
          <div className="rounded-lg border border-border bg-card px-6 py-10 text-center md:px-12 md:py-14">
            <h2 className="h4">{SERVICOS_CTA_TITLE}</h2>
            <p className="paragraph-regular mx-auto mt-4 max-w-[54ch] text-muted-foreground">{SERVICOS_CTA_LEDE}</p>
            <div className="mt-8 flex justify-center">
              <Button asChild>
                <Link to="/#contato">
                  Começar meu projeto
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </AnimateOnView>
      </Container>
    </section>
  );
};

export default OutOfScope;
