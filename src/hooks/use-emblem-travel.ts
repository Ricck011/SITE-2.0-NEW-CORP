import { useLayoutEffect, useState } from "react";
import { MotionValue, useTransform } from "framer-motion";

interface UseEmblemTravelParams {
  /** Anel no topo (hero) — é medido e também recebe o fade de saída. */
  originRef: React.RefObject<HTMLElement>;
  /** Slot vazio dentro do cartão "Sistemas de gestão" — só é medido. */
  targetRef: React.RefObject<HTMLElement>;
  scrollYProgress: MotionValue<number>;
  /** true só em telas ≥1024px e com prefers-reduced-motion desligado. */
  active: boolean;
  /** Fração do progresso em que o anel do hero termina de sumir. */
  heroFadeEnd?: number;
  /** Janela (início/fim) em que o anel do cartão aparece. */
  cardRevealRange?: [number, number];
}

interface EmblemTravelResult {
  originOpacity: MotionValue<number>;
  cardX: MotionValue<number>;
  cardY: MotionValue<number>;
  cardScale: MotionValue<number>;
  cardOpacity: MotionValue<number>;
}

/**
 * Mede a distância real entre o anel do hero e o slot de destino (em vez de
 * um offset fixo tipo "+250") e devolve valores prontos pra motion.img.
 * Quando `active` é false, os componentes nem usam esses valores — renderizam
 * <img> estático no lugar final, sem custo de ResizeObserver nenhum.
 */
export function useEmblemTravel({
  originRef,
  targetRef,
  scrollYProgress,
  active,
  heroFadeEnd = 0.12,
  cardRevealRange = [0.15, 0.55],
}: UseEmblemTravelParams): EmblemTravelResult {
  const [delta, setDelta] = useState({ x: 0, y: 0, scale: 1 });

  useLayoutEffect(() => {
    if (!active) return;
    const origin = originRef.current;
    const target = targetRef.current;
    if (!origin || !target) return;

    let frame = 0;
    const measure = () => {
      const originRect = origin.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      if (originRect.width === 0 || targetRect.width === 0) return;

      const originCenterX = originRect.left + originRect.width / 2;
      const originCenterY = originRect.top + originRect.height / 2;
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;

      setDelta({
        x: originCenterX - targetCenterX,
        y: originCenterY - targetCenterY,
        scale: originRect.width / targetRect.width,
      });
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    scheduleMeasure();

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(origin);
    resizeObserver.observe(target);
    window.addEventListener("resize", scheduleMeasure);
    document.fonts?.ready?.then(scheduleMeasure).catch(() => {});

    const originImg = origin instanceof HTMLImageElement ? origin : null;
    originImg?.addEventListener("load", scheduleMeasure);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      originImg?.removeEventListener("load", scheduleMeasure);
    };
  }, [active, originRef, targetRef]);

  const originOpacity = useTransform(scrollYProgress, (p) =>
    active ? Math.max(0, 1 - p / heroFadeEnd) : 1,
  );

  // Progresso normalizado dentro da janela de revelação do cartão — x, y,
  // scale e opacity usam TODOS o mesmo valor, pra terminar de assentar no
  // mesmo instante (senão a opacidade chega a 1 antes da posição terminar
  // de encolher, e o anel "flutua" fora do card por um trecho da rolagem).
  const cardSettle = useTransform(scrollYProgress, (p) => {
    const [start, end] = cardRevealRange;
    if (p <= start) return 0;
    if (p >= end) return 1;
    return (p - start) / (end - start);
  });

  const cardOpacity = useTransform(cardSettle, (s) => (active ? s : 1));
  const cardX = useTransform(cardSettle, (s) => (active ? delta.x * (1 - s) : 0));
  const cardY = useTransform(cardSettle, (s) => (active ? delta.y * (1 - s) : 0));
  const cardScale = useTransform(cardSettle, (s) => (active ? delta.scale + (1 - delta.scale) * s : 1));

  return { originOpacity, cardX, cardY, cardScale, cardOpacity };
}
