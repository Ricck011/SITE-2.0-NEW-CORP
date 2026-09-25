import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface UseCountUpOptions {
  target: number;
  durationMs?: number;
  threshold?: number;
}

interface UseCountUpResult {
  ref: React.RefObject<HTMLDivElement>;
  value: number;
}

// Mesma fórmula da landing atual (landing.js): IntersectionObserver dispara
// uma vez, requestAnimationFrame com easing cúbico de saída, 1200ms.
export function useCountUp({ target, durationMs = 1200, threshold = 0.4 }: UseCountUpOptions): UseCountUpResult {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    let frame: number;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(el);

          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / durationMs);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));
            if (progress < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        });
      },
      { threshold },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target, durationMs, threshold, prefersReducedMotion]);

  return { ref, value };
}
