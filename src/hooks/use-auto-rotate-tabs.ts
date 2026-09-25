import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type PauseReason = "manual" | "reduced-motion" | "offscreen" | "hidden-tab" | "hover-or-focus" | null;

interface UseAutoRotateTabsOptions {
  itemIds: string[];
  initialId?: string;
  intersectionThreshold?: number;
}

interface UseAutoRotateTabsResult {
  activeId: string;
  isPaused: boolean;
  isManuallyPaused: boolean;
  pauseReason: PauseReason;
  containerRef: React.RefObject<HTMLDivElement>;
  handleValueChange: (id: string) => void;
  handleBarAnimationEnd: (event: React.AnimationEvent<HTMLElement>) => void;
  togglePause: () => void;
}

/**
 * Nunca reimplementa o timer da barra em JS — quem avança o tempo é a
 * animação CSS `tab-fill` (5s). Este hook só decide QUANDO ela roda
 * (data-autorotate-paused liga/desliga animation-play-state) e reage ao
 * `animationend` dela pra trocar de aba. Clique manual, seta do teclado e
 * avanço automático passam todos por `handleValueChange` — sem cronômetro
 * duplicado em lugar nenhum.
 */
export function useAutoRotateTabs({
  itemIds,
  initialId,
  intersectionThreshold = 0,
}: UseAutoRotateTabsOptions): UseAutoRotateTabsResult {
  const [activeId, setActiveId] = useState(initialId ?? itemIds[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const [offscreen, setOffscreen] = useState(false);
  const [hiddenTab, setHiddenTab] = useState(() => typeof document !== "undefined" && document.hidden);
  const [hoverOrFocus, setHoverOrFocus] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { threshold: intersectionThreshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [intersectionThreshold]);

  useEffect(() => {
    const onVisibility = () => setHiddenTab(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onEnter = () => setHoverOrFocus(true);
    const onLeave = () => setHoverOrFocus(false);
    // Sem esse check, mover o foco de uma aba pra outra com Tab dispara
    // focusout→focusin e pisca a pausa por um tick.
    const onFocusOut = (event: FocusEvent) => {
      if (el.contains(event.relatedTarget as Node)) return;
      setHoverOrFocus(false);
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("focusin", onEnter);
    el.addEventListener("focusout", onFocusOut);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("focusin", onEnter);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const pauseReason: PauseReason = useMemo(() => {
    if (prefersReducedMotion) return "reduced-motion";
    if (manuallyPaused) return "manual";
    if (offscreen) return "offscreen";
    if (hiddenTab) return "hidden-tab";
    if (hoverOrFocus) return "hover-or-focus";
    return null;
  }, [prefersReducedMotion, manuallyPaused, offscreen, hiddenTab, hoverOrFocus]);

  const handleValueChange = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const handleBarAnimationEnd = useCallback(
    (event: React.AnimationEvent<HTMLElement>) => {
      if (event.animationName !== "tab-fill") return;
      setActiveId((current) => {
        const index = itemIds.indexOf(current);
        if (index === -1) return current;
        return itemIds[(index + 1) % itemIds.length];
      });
    },
    [itemIds],
  );

  const togglePause = useCallback(() => setManuallyPaused((paused) => !paused), []);

  return {
    activeId,
    isPaused: pauseReason !== null,
    isManuallyPaused: manuallyPaused,
    pauseReason,
    containerRef,
    handleValueChange,
    handleBarAnimationEnd,
    togglePause,
  };
}
