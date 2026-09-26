import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { SOBRE_BADGE, SOBRE_FACTS, SOBRE_LEDE, SOBRE_TITLE } from "@/content/sobre";

const CompanyHero = () => {
  return (
    <section className="relative bg-background overflow-hidden banner-top-padding pb-16 md:pb-20 lg:pb-24">
      <Container className="relative z-10">
        <AnimateOnView blur className="mb-4 md:mb-6">
          <Badge>{SOBRE_BADGE}</Badge>
        </AnimateOnView>

        <AnimateOnView blur className="mb-5 md:mb-7" delay={0.1}>
          {/* max-w em ch aqui, não no wrapper: ver nota igual em
              features/hero.tsx. */}
          <h1 className="h1 text-foreground max-w-[22ch]">{SOBRE_TITLE}</h1>
        </AnimateOnView>

        <AnimateOnView delay={0.2}>
          <p className="paragraph-large text-muted-foreground max-w-[54ch]">{SOBRE_LEDE}</p>
        </AnimateOnView>

        <AnimateOnView delay={0.3}>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 md:mt-16 lg:grid-cols-4">
            {SOBRE_FACTS.map((fact) => (
              <div key={fact.id}>
                <dt className="font-display text-2xl font-semibold tracking-[-0.02em] text-foreground md:text-[28px]">
                  {fact.value}
                </dt>
                <dd className="mt-2 text-sm leading-[1.5] text-muted-foreground">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </AnimateOnView>
      </Container>
    </section>
  );
};

export default CompanyHero;
