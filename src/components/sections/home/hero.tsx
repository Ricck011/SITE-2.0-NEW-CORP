import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { HERO_STATS } from "@/content/deliverables";
import { useCountUp } from "@/hooks/use-count-up";
import { fetchPriority } from "@/lib/utils";
import { ArrowRight, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import HeroShowcase from "./hero-showcase";

const HERO_VIDEO_WEBM = "/videos/hero-cortina.webm";
const HERO_VIDEO_MP4 = "/videos/hero-cortina.mp4";
const HERO_POSTER = "/videos/hero-cortina-poster.webp";

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

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  // Começa sem vídeo: celular e quem pediu menos movimento ficam só no poster
  // e nunca chegam a baixar o arquivo.
  const [showVideo, setShowVideo] = useState(false);
  // Começa pausado e só vira "tocando" quando o navegador confirma; se o
  // autoplay for bloqueado (modo economia, por exemplo), o botão já mostra play.
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      setShowVideo(false);
      return;
    }
    const query = window.matchMedia("(min-width: 768px)");
    const sync = () => setShowVideo(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [prefersReducedMotion]);

  const togglePause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  // A estrutura abaixo é a mesma com ou sem vídeo: só entram e saem o <video>
  // e o botão, em posições fixas. Trocar a árvore inteira remontava o conteúdo
  // no meio da animação de entrada e derrubava o motor de animação da página.
  return (
    <section className="relative min-h-screen bg-background overflow-hidden banner-top-padding md:pb-20 lg:pb-24 pb-[60px]">
      <img
        src={HERO_POSTER}
        alt=""
        aria-hidden
        {...fetchPriority("high")}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_POSTER}
          onPlay={() => setIsPaused(false)}
          onPause={() => setIsPaused(true)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={HERO_VIDEO_WEBM} type="video/webm" />
          <source src={HERO_VIDEO_MP4} type="video/mp4" />
        </video>
      )}
      <div className="hero-video-scrim absolute inset-0" />

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

          {/* A flutuação fica num div interno: no mesmo elemento da entrada, a
              animação CSS sobrescrevia o transform do framer e anulava a entrada. */}
          <AnimateOnView delay={0.4} className="relative">
            <div className="animate-float lg:animate-none">
              <HeroShowcase />
            </div>
          </AnimateOnView>
        </div>
      </Container>

      {showVideo && (
        <button
          type="button"
          onClick={togglePause}
          aria-pressed={isPaused}
          aria-label={isPaused ? "Tocar vídeo de fundo" : "Pausar vídeo de fundo"}
          className="absolute bottom-5 left-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
        </button>
      )}
    </section>
  );
};

export default Hero;
