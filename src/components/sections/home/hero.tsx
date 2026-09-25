import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { HERO_STATS } from "@/content/deliverables";
import { useCountUp } from "@/hooks/use-count-up";
import { motion, MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroStat = ({ target, suffix, label }: { target: number; suffix?: string; label: string }) => {
  const { ref, value } = useCountUp({ target });
  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-3xl sm:text-4xl font-bold text-foreground tabular-nums">
        {value}
        {suffix}
      </p>
      <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-snug">{label}</p>
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
        <StaggerContainer className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 md:gap-4 xl:gap-6 mb-4 md:mb-8">
          <AnimateOnView>
            <Badge variant="color">Artes e sistemas</Badge>
          </AnimateOnView>
          <AnimateOnView delay={0.1}>
            <Badge variant="color">Cajamar, atendo SP</Badge>
          </AnimateOnView>
        </StaggerContainer>

        <AnimateOnView blur className="text-center max-w-3xl mx-auto lg:mb-6 md:mb-5 mb-4" delay={0.2}>
          <h1 className="h1 text-foreground">
            Arte que chama.
            <br />
            <span className="text-primary">Sistema que sustenta.</span>
          </h1>
        </AnimateOnView>

        <AnimateOnView className="text-center max-w-xl mx-auto lg:mb-10 md:mb-8 mb-4" delay={0.3}>
          <p className="text-lg text-muted-foreground">
            Identidade visual, landing page e sistema de gestão para pequenas empresas que ainda não existem no
            digital.
          </p>
        </AnimateOnView>

        <StaggerContainer className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
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

        {/* Composição visual: print do painel · anel da marca · 4 números */}
        <div className="relative flex items-center justify-center xl:gap-10 gap-6 flex-wrap lg:flex-nowrap mt-[50px] xl:mt-24 max-w-[980px] mx-auto">
          <div className="relative z-10 order-2 lg:order-1">
            <AnimateOnView
              delay={0.6}
              className={`relative sm:max-w-[340px] w-full aspect-[340/220] rounded-2xl overflow-hidden border border-border ${active ? "" : "animate-float"}`}
            >
              <img
                src="/images/homepage/painel-resumo.webp"
                alt="Tela de resumo do painel NEW CORP"
                className="w-full h-full object-cover"
                width="340"
                height="220"
                fetchPriority="high"
                loading="eager"
              />
            </AnimateOnView>
          </div>

          <div className="relative z-10 order-1 lg:order-2 shrink-0">
            {active ? (
              <motion.img
                ref={emblemRef}
                src="/images/marca/newcorp-emblema.webp"
                alt="Emblema NEW CORP"
                className="w-[140px] sm:w-[180px] xl:w-[220px] h-auto"
                style={{ opacity: originOpacity }}
                width="1174"
                height="740"
                fetchPriority="high"
                loading="eager"
              />
            ) : (
              <img
                ref={emblemRef}
                src="/images/marca/newcorp-emblema.webp"
                alt="Emblema NEW CORP"
                className="w-[140px] sm:w-[180px] xl:w-[220px] h-auto"
                width="1174"
                height="740"
                fetchPriority="high"
                loading="eager"
              />
            )}
          </div>

          <div className="relative z-10 order-3">
            <AnimateOnView
              delay={0.7}
              className="grid grid-cols-2 gap-4 sm:gap-6 bg-card border border-border rounded-2xl p-5 sm:p-6 sm:max-w-[300px]"
            >
              {HERO_STATS.map((stat) => (
                <HeroStat key={stat.id} target={stat.target} suffix={stat.suffix} label={stat.label} />
              ))}
            </AnimateOnView>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
