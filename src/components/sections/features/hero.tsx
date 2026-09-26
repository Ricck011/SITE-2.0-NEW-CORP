import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { SERVICOS_BADGE, SERVICOS_LEDE, SERVICOS_TITLE } from "@/content/servicos";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturesHero = () => {
  return (
    <section className="relative bg-background overflow-hidden banner-top-padding pb-16 md:pb-20 lg:pb-24">
      <Container className="relative z-10">
        <AnimateOnView blur className="mb-4 md:mb-6">
          <Badge>{SERVICOS_BADGE}</Badge>
        </AnimateOnView>

        <AnimateOnView blur className="mb-5 md:mb-7" delay={0.1}>
          {/* max-w em ch aqui, não no wrapper: "ch" mede o "0" da fonte do
              próprio elemento — no wrapper (16px) o título quebrava quase
              palavra por palavra. */}
          <h1 className="h1 text-foreground max-w-[20ch]">{SERVICOS_TITLE}</h1>
        </AnimateOnView>

        <AnimateOnView className="mb-9 md:mb-11" delay={0.2}>
          <p className="paragraph-large text-muted-foreground max-w-[58ch]">{SERVICOS_LEDE}</p>
        </AnimateOnView>

        <StaggerContainer className="flex flex-col sm:flex-row items-start gap-4">
          <AnimateOnView delay={0.3}>
            <Button asChild>
              <Link to="/#contato">
                Quero meu protótipo
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
          </AnimateOnView>
          <AnimateOnView delay={0.4}>
            <Button variant="link" asChild>
              <Link to="/sobre">Quem faz</Link>
            </Button>
          </AnimateOnView>
        </StaggerContainer>
      </Container>
    </section>
  );
};

export default FeaturesHero;
