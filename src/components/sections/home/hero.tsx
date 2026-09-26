import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { HERO_STATS } from "@/content/deliverables";
import { useCountUp } from "@/hooks/use-count-up";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { MotionValue, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const HERO_VIDEO = "/videos/hero-cortina.mp4";
const HERO_POSTER = "/videos/hero-cortina-poster.webp";
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
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const targetTimeRef = useRef(0);

  const prefersReducedMotion = useReducedMotion();
  // Começa desligado de propósito: assim celular e quem pediu menos movimento
  // ficam só no poster e nunca chegam a baixar o vídeo.
  const [scrubEnabled, setScrubEnabled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setScrubEnabled(false);
      return;
    }
    const query = window.matchMedia("(min-width: 768px)");
    const sync = () => setScrubEnabled(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [prefersReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    targetTimeRef.current = progress * durationRef.current;
  });

  // O scroll só anota o tempo-alvo; quem aplica é este laço, no máximo uma vez
  // por quadro e nunca com um seek ainda em andamento. Setar currentTime direto
  // no evento de scroll empilha seeks mais rápido do que o decodificador
  // responde, e a imagem congela até drenar a fila.
  useEffect(() => {
    if (!scrubEnabled) return;
    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      const video = videoRef.current;
      if (!video || !durationRef.current || video.seeking) return;
      const target = targetTimeRef.current;
      if (Math.abs(target - video.currentTime) < 1 / 30) return;
      video.currentTime = target;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [scrubEnabled]);

  const background = (
    <>
      <img
        src={HERO_POSTER}
        alt=""
        aria-hidden
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {scrubEnabled && (
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster={HERO_POSTER}
          onLoadedMetadata={(event) => {
            durationRef.current = event.currentTarget.duration;
          }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      )}
      <div className="hero-video-scrim absolute inset-0" />
    </>
  );

  const heroContent = (
    <Container className="relative z-10 w-full">
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
  );

  if (scrubEnabled) {
    // 180vh no total: a seção fica presa pelos 80vh de sobra, que é o trecho de
    // rolagem que consome o vídeo inteiro. Mais que isso prende o visitante
    // longe demais do resto da página.
    return (
      <section ref={sectionRef} className="relative h-[180vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-background banner-top-padding md:pb-20 lg:pb-24 pb-[60px] flex items-center">
          {background}
          {heroContent}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-background overflow-hidden banner-top-padding md:pb-20 lg:pb-24 pb-[60px]"
    >
      {background}
      {heroContent}
    </section>
  );
};

export default Hero;
