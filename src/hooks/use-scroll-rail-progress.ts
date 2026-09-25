import { useRef } from "react";
import { MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface UseScrollRailProgressResult {
  containerRef: React.RefObject<HTMLDivElement>;
  fillScaleY: MotionValue<number>;
}

// Preenchimento do trilho (steps-trail.tsx) acompanhando o quanto o
// container já rolou pela tela. Com prefers-reduced-motion, fica parado
// em 100% (sem animação de preenchimento).
export function useScrollRailProgress(): UseScrollRailProgressResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const fillScaleY = useTransform(scrollYProgress, (p) => (prefersReducedMotion ? 1 : p));

  return { containerRef, fillScaleY };
}
