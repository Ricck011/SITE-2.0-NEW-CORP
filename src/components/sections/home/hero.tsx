import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { HERO_STATS } from "@/content/deliverables";
import { useCountUp } from "@/hooks/use-count-up";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { MotionValue } from "framer-motion";
import HeroShowcase from "./hero-showcase";

const HeroStat = ({ target, suffix, label }: { target: number; suffix?: string; label: string }) => {
  const { ref, value } = useCountUp({ target });
  return (
    <div ref={ref}>
      <p className="font-display text-2xl sm:text-3xl font-bold text-foreground tabular-nums">
        {value}
        {suffix}
      </p>
      <p className="font-mono text-[11px] sm:text-xs text-muted-foreground mt-1 leading-snug">{label}</p>
    </div>
  );
};

interface HeroProps {
  emblemRef: React.RefObject<HTMLImageElement>;
  originOpacity: MotionValue<number>;
  active: boolean;
}

const Hero = ({ emblemRef, originOpacity, active }: HeroProps) => {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden banner-top-padding md:pb-20 lg:pb-24 pb-[60px]">
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          <div>
            <AnimateOnView blur className="mb-4 md:mb-6">
              <Badge>Artes e sistemas · Cajamar, atendo SP</Badge>
            </AnimateOnView>

            <AnimateOnView blur className="lg:mb-6 mb-4" delay={0.1}>
              <h1 className="h1 text-foreground">
                Arte que chama.
                <br />
                <span className="text-primary">Sistema que sustenta.</span>
              </h1>
            </AnimateOnView>

            <AnimateOnView className="max-w-xl mb-8 lg:mb-10" delay={0.2}>
              <p className="text-lg text-muted-foreground">
                Identidade visual, landing page e sistema de gestão para pequenas empresas que ainda não existem no
                digital.
              </p>
            </AnimateOnView>

            <AnimateOnView delay={0.3}>
              <div className="grid grid-cols-2 gap-6 sm:gap-8 mb-8 lg:mb-10 max-w-sm">
                {HERO_STATS.map((stat) => (
                  <HeroStat key={stat.id} target={stat.target} suffix={stat.suffix} label={stat.label} />
                ))}
              </div>
            </AnimateOnView>

            <StaggerContainer className="flex flex-col sm:flex-row items-start gap-4">
              <AnimateOnView delay={0.4}>
                <Button asChild>
                  <Link to="/#contato">
                    Começar meu projeto
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </Link>
                </Button>
              </AnimateOnView>
              <AnimateOnView delay={0.5}>
                <Button variant="link" asChild>
                  <Link to="/#assistente">Falar com a IA</Link>
                </Button>
              </AnimateOnView>
            </StaggerContainer>
          </div>

          <AnimateOnView delay={0.4} className={`relative ${active ? "" : "animate-float"}`}>
            <HeroShowcase emblemRef={emblemRef} originOpacity={originOpacity} active={active} />
          </AnimateOnView>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
