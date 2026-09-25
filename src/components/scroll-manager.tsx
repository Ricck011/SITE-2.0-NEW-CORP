import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RETRY_MS = 1000;
const RETRY_STEP = 50;

/**
 * Rola para o topo ao trocar de rota, ou até o elemento da âncora quando o link
 * tem `#id` (ex.: /servicos#como-funciona). Tenta de novo por até 1s porque a
 * seção pode ainda não ter montado (Suspense) quando a rota troca.
 */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = hash.slice(1);
    let elapsed = 0;
    let cancelled = false;

    const tryScroll = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: "start" });
        return;
      }
      elapsed += RETRY_STEP;
      if (elapsed < RETRY_MS) {
        window.setTimeout(tryScroll, RETRY_STEP);
      }
    };

    tryScroll();
    return () => {
      cancelled = true;
    };
  }, [pathname, hash]);

  return null;
};

export default ScrollManager;
