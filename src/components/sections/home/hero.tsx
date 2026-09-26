import { HERO_FEATS } from "@/content/deliverables";
import { fetchPriority } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "./hero-neural.css";

// Vídeo do prompt "Neural Pathway" (MotionSites), comprimido com ffmpeg:
// o original tinha 36,5 MB; estes têm ~1,2 MB, em 1600x900.
const HERO_VIDEO_WEBM = "/videos/hero-neural.webm";
const HERO_VIDEO_MP4 = "/videos/hero-neural.mp4";
const HERO_POSTER = "/videos/hero-neural-poster.webp";

const Chevron = () => (
  <svg className="neural-chev" viewBox="0 0 11 20" aria-hidden="true">
    <path d="M1.15 1.15 L9.6 10 L1.15 18.85" />
  </svg>
);

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  // Começa sem vídeo: celular e quem pediu menos movimento ficam só no pôster
  // (que é o primeiro quadro do vídeo) e nunca chegam a baixar o arquivo.
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
  // e o botão de pausa, em posições fixas. Trocar a árvore inteira reiniciaria
  // a animação de entrada no meio.
  return (
    <section className="neural-hero">
      <img src={HERO_POSTER} alt="" aria-hidden {...fetchPriority("high")} className="neural-art" />
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          poster={HERO_POSTER}
          onPlay={() => setIsPaused(false)}
          onPause={() => setIsPaused(true)}
          className="neural-art"
        >
          <source src={HERO_VIDEO_WEBM} type="video/webm" />
          <source src={HERO_VIDEO_MP4} type="video/mp4" />
        </video>
      )}
      <div className="neural-veil" />

      <div className="neural-body">
        <h1 className="neural-title">
          <span className="neural-h1a">Arte que chama.</span>
          <span className="neural-h1b">Sistema que sustenta.</span>
        </h1>

        <p className="neural-sub">
          <span className="neural-sub1">Marca que passa confiança, página que traz contato</span>
          <span className="neural-sub2">e um painel para largar a planilha.</span>
        </p>

        <Link to="/#contato" className="neural-cta">
          <span>Começar meu projeto</span>
          <svg className="neural-arrow" viewBox="0 0 16 11" aria-hidden="true">
            <path d="M0 5.5 H14.6 M10.3 1.2 L14.9 5.5 L10.3 9.8" />
          </svg>
        </Link>

        <ul className="neural-feats">
          {HERO_FEATS.map((feat) => (
            <li key={feat.id}>
              <Chevron />
              <span>{feat.label}</span>
            </li>
          ))}
        </ul>

        <span className="neural-rule" aria-hidden="true" />
      </div>

      <p className="neural-foot">
        <span className="neural-foot1">Cajamar, atendo toda SP.</span>
        <span className="neural-foot2">Protótipo de uma tela sem custo.</span>
      </p>

      {showVideo && (
        <button
          type="button"
          onClick={togglePause}
          aria-pressed={isPaused}
          aria-label={isPaused ? "Tocar vídeo de fundo" : "Pausar vídeo de fundo"}
          className="neural-pause"
        >
          {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
        </button>
      )}
    </section>
  );
};

export default Hero;
