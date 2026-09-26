import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { DELIVERABLES } from "@/content/deliverables";
import { SERVICE_FRONTS } from "@/content/servicos";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

// As três frentes abertas, uma por bloco: o problema que ela resolve, o que
// eu faço e o que sai no fim. As entregas vêm de DELIVERABLES, a mesma lista
// da home — assim o site não tem duas versões da mesma promessa.
const FrontsDetail = () => {
  return (
    <section className="bg-card py-20 md:py-24 lg:py-28" id="frentes">
      <Container>
        <div className="space-y-20 md:space-y-24 lg:space-y-28">
          {SERVICE_FRONTS.map((front, index) => {
            const deliverables = DELIVERABLES.filter((item) => item.front === front.deliverablesFront);
            return (
              <AnimateOnView key={front.id} id={front.id} className="scroll-mt-28">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                  <div className="lg:col-span-7">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand-accent-soft">
                      {front.kicker}
                    </p>
                    <h2 className="h3 mt-3">{front.title}</h2>
                    <p className="mt-6 text-xl leading-[1.45] text-foreground md:text-2xl">{front.problem}</p>
                    <p className="paragraph-regular mt-5 max-w-[60ch] text-muted-foreground">{front.body}</p>
                    <p className="mt-6 border-l-2 border-border pl-4 text-sm leading-[1.6] text-muted-foreground">
                      {front.forWho}
                    </p>
                  </div>

                  <div className="lg:col-span-5">
                    <div
                      className={cn(
                        "rounded-lg border border-border bg-background p-6 md:p-7",
                        // Alinha o topo do cartão com o rótulo do bloco.
                        "lg:mt-1",
                      )}
                    >
                      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        O que sai no fim
                      </p>
                      <ul className="mt-5 space-y-3.5">
                        {deliverables.map((item) => (
                          <li key={item.id} className="flex items-center gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-card">
                              <Check
                                className="h-3.5 w-3.5 text-brand-accent-soft"
                                strokeWidth={2.25}
                                aria-hidden="true"
                              />
                            </span>
                            <span className="text-[15px] leading-snug text-foreground">{item.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {index < SERVICE_FRONTS.length - 1 && (
                  <div className="mt-20 h-px bg-border md:mt-24 lg:mt-28" aria-hidden="true" />
                )}
              </AnimateOnView>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default FrontsDetail;
