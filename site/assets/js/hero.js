// Topo guiado pela rolagem, no padrão de site-de-10k/references/pipeline-scrub.md.
// Sem vídeo, as faixas e a logo continuam guiadas pela rolagem sobre o ambiente da marca.
import { approach, bandK, bandOpacity, rng } from "./lib.js";

// Vídeo aprovado no portão (Veo 3.1, 28/09). VIDEO_BYTES é o tamanho real do arquivo (conferido em testes/).
export const VIDEO_URL = "assets/video/hero-scrub.mp4";
export const VIDEO_BYTES = 6104132;
const POSTER_URL = "assets/img/hero-inicio.webp";

// Iguais, caractere por caractere, à media query dos portões em assets/css/site.css
export const GATES = [
  "(max-width: 720px)",
  "(orientation: portrait) and (max-width: 1024px)",
  "(orientation: portrait) and (pointer: coarse)",
  "(orientation: landscape) and (pointer: coarse) and (max-height: 560px)",
  "(prefers-reduced-motion: reduce)",
];

const hero = document.getElementById("topo");
if (hero) initHero(hero);

function initHero(hero) {
  const stage = hero.querySelector(".hero-stage");
  const video = stage.querySelector(".hero-video");
  const ring = stage.querySelector(".hero-ring");
  const els = [...hero.querySelectorAll(".band")];
  const bands = els.map((el, n) => {
    const [a, b] = el.dataset.band.split(",").map(Number);
    el.querySelectorAll("[data-split]").forEach((t) => split(t, Number(el.dataset.seed) || n + 1));
    return { el, a, b, first: n === 0, last: n === els.length - 1, ramp: Number(el.dataset.ramp) || 0, op: -1, k: -1 };
  });

  let target = 0, shown = 0, rafId = null, lastTick = 0, loadK = 0, kl = -1;
  let onScreen = true, scrubOn = false, started = false;

  const progress = () => {
    const r = hero.getBoundingClientRect();
    const range = r.height - innerHeight;
    return range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
  };

  // Escreve no DOM só quando o valor muda.
  function render(p) {
    for (const band of bands) {
      const op = Math.round(bandOpacity(p, band.a, band.b, band) * 1000) / 1000;
      if (op !== band.op) {
        band.op = op;
        band.el.style.opacity = op;
        band.el.style.visibility = op ? "visible" : "hidden";
      }
      let k = bandK(p, band.a, band.b, band.ramp);
      if (band.first) k = Math.max(k, loadK);
      if (Math.abs(k - band.k) >= 0.008 || (k !== band.k && (k === 0 || k === 1))) {
        band.k = k;
        band.el.style.setProperty("--k", k.toFixed(3));
        if (band.last && k !== kl) { kl = k; stage.style.setProperty("--kl", k.toFixed(3)); }
      }
    }
  }

  // Seeks travados: nunca dois ao mesmo tempo, guarda só o mais novo.
  let seekBusy = false, pending = null;
  function requestSeek(t) {
    if (!video.duration) return;
    if (seekBusy) { pending = t; return; }
    seekBusy = true;
    video.currentTime = t;
  }
  video.addEventListener("seeked", () => {
    seekBusy = false;
    if (pending !== null) { const t = pending; pending = null; requestSeek(t); }
  });
  video.addEventListener("error", () => {
    seekBusy = false;
    pending = null;
    if (video.getAttribute("src")) stage.classList.add("video-failed");
  });

  // Um loop rAF que descansa quando converge ou quando o topo sai da tela.
  function tick(now) {
    const dt = lastTick ? now - lastTick : 16.667;
    lastTick = now;
    shown = approach(shown, target, dt);
    if (loadK < 1) loadK = Math.min(1, loadK + dt / 900);
    const settled = Math.abs(target - shown) < 0.0005 && loadK === 1;
    if (settled) shown = target;
    requestSeek(shown * video.duration);
    render(shown);
    if (settled || !onScreen || !scrubOn) { rafId = null; lastTick = 0; }
    else rafId = requestAnimationFrame(tick);
  }
  function onScroll() {
    target = progress();
    if (rafId === null && onScreen && scrubOn) rafId = requestAnimationFrame(tick);
  }
  new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; if (onScreen) onScroll(); }).observe(hero);

  // Pôster e vídeo só existem no caminho com portão: celular e movimento reduzido não baixam nada.
  function initOnce() {
    if (started) return;
    started = true;
    if (!VIDEO_URL) { stage.classList.add("no-video"); return; }
    let go = false;
    const start = () => { if (!go) { go = true; loadVideo().catch(() => stage.classList.add("video-failed")); } };
    if (POSTER_URL) {
      stage.style.background = `center / cover no-repeat url("${POSTER_URL}")`;
      const img = new Image();
      img.onload = img.onerror = start;
      img.src = POSTER_URL;
      setTimeout(start, 4000);
    } else start();
  }

  // Blob inteiro na memória (a hospedagem pode não aceitar Range), com anel e vigia de 20 s.
  async function loadVideo() {
    const ctrl = new AbortController();
    let watchdog = setTimeout(() => ctrl.abort(), 20000);
    const res = await fetch(VIDEO_URL, { priority: "low", signal: ctrl.signal });
    if (!res.ok) throw new Error(res.status);
    const total = Number(res.headers.get("Content-Length")) || VIDEO_BYTES;
    const reader = res.body.getReader();
    const chunks = [];
    let got = 0, lastRing = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      clearTimeout(watchdog);
      watchdog = setTimeout(() => ctrl.abort(), 20000);
      chunks.push(value);
      got += value.length;
      const frac = Math.min(1, got / total);
      const now = performance.now();
      if (now - lastRing > 100 || frac === 1) { lastRing = now; ring.style.setProperty("--ld", Math.round(107 * (1 - frac))); }
    }
    clearTimeout(watchdog);
    video.src = URL.createObjectURL(new Blob(chunks, { type: "video/mp4" }));
    video.addEventListener("canplay", () => {
      requestSeek(progress() * video.duration);
      stage.classList.add("video-ready");
    }, { once: true });
    video.load();
  }

  function enableScrub() {
    if (scrubOn) return;
    scrubOn = true;
    initOnce();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    bands.forEach((b) => { b.op = -1; b.k = -1; });
    kl = -1;
    target = shown = progress();
    render(shown);
    onScroll();
  }
  function disableScrub() {
    if (!scrubOn) return;
    scrubOn = false;
    removeEventListener("scroll", onScroll);
    removeEventListener("resize", onScroll);
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; lastTick = 0; }
  }

  // Portão decidido ao vivo: girar o tablet ou ligar o movimento reduzido troca o modo na hora.
  const mqls = GATES.map((q) => matchMedia(q));
  const apply = () => (mqls.some((m) => m.matches) ? disableScrub() : enableScrub());
  mqls.forEach((m) => m.addEventListener("change", apply));
  apply();
}

// Divide o título em palavras e letras com números "aleatórios" que se repetem a cada carregamento.
// Um <br> no título vira quebra de linha fixa.
function split(el, seed) {
  const r = rng(seed);
  const lines = el.innerHTML.split(/<br\s*\/?>/i).map((l) => l.replace(/<[^>]*>/g, "").trim().split(/\s+/));
  const text = lines.map((l) => l.join(" ")).join(" ");
  const count = lines.flat().length;
  const total = text.replace(/\s/g, "").length;
  let i = 0, wi = 0;
  const visual = document.createElement("span");
  visual.setAttribute("aria-hidden", "true");
  lines.forEach((words, li) => {
    if (li) visual.append(document.createElement("br"));
    words.forEach((word, n) => {
      const w = document.createElement("span");
      w.className = "w";
      w.style.setProperty("--th", (wi++ / count * 0.5).toFixed(3));
      for (const ch of word) {
        const c = document.createElement("span");
        c.className = "c";
        c.textContent = ch;
        c.style.setProperty("--th", (i++ / total * 0.45 + r() * 0.06).toFixed(3));
        c.style.setProperty("--jx", `${(-10 - r() * 26).toFixed(1)}px`);
        w.append(c);
      }
      visual.append(w, n < words.length - 1 ? " " : "");
    });
  });
  const sr = document.createElement("span");
  sr.className = "sr";
  sr.textContent = text;
  el.replaceChildren(sr, visual);
}
