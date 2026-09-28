// Página inteira: entradas, menu, fio, diagnóstico e formulário. O topo mora em hero.js.
import { clamp, contactMessage, quizResult, waLink } from "./lib.js";
import "./hero.js";

// Entradas: põe .in uma vez quando o bloco aparece.
const reveal = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); reveal.unobserve(e.target); }
}, { rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));

// Elemento vivo por seção: anima só com a seção na tela, e nada anda com a aba escondida.
const live = new IntersectionObserver((entries) => {
  for (const e of entries) e.target.classList.toggle("live", e.isIntersecting);
});
document.querySelectorAll("main section").forEach((el) => live.observe(el));
document.addEventListener("visibilitychange", () => document.body.classList.toggle("paused", document.hidden));

// Menu do celular: fecha ao escolher uma seção.
const menu = document.getElementById("menu");
menu?.addEventListener("click", (e) => {
  if (e.target.closest("a") && menu.matches(":popover-open")) menu.hidePopover();
});

// O fio: acompanha a rolagem de Frentes até o contato.
const trilho = document.querySelector(".trilho");
if (trilho) {
  let last = -1, raf = 0;
  const draw = () => {
    raf = 0;
    const r = trilho.getBoundingClientRect();
    const p = clamp((innerHeight * 0.65 - r.top) / r.height, 0, 1);
    if (Math.abs(p - last) < 0.002) return;
    last = p;
    trilho.style.setProperty("--p", p.toFixed(3));
  };
  const ask = () => { raf ||= requestAnimationFrame(draw); };
  addEventListener("scroll", ask, { passive: true });
  addEventListener("resize", ask);
  draw();
}

// Diagnóstico e formulário dividem o resultado: o diagnóstico vai junto na mensagem.
const lead = document.getElementById("lead");
const attach = lead?.querySelector("[data-attach]");
let diagnostico = "";
const setDiagnostico = (text) => {
  diagnostico = text;
  if (attach) attach.hidden = !text;
};

const quiz = document.getElementById("quiz");
const result = document.getElementById("resultado");
if (quiz && result) {
  const steps = [...quiz.querySelectorAll(".q")];
  const count = quiz.querySelector("[data-count]");
  const ring = quiz.querySelector(".ring");
  const back = quiz.querySelector("[data-back]");
  const next = quiz.querySelector("[data-next]");
  let at = 0;
  quiz.noValidate = true; // uma pergunta por vez: a validação nativa travaria nas perguntas escondidas

  const show = (n, focus) => {
    at = n;
    steps.forEach((s, i) => s.classList.toggle("on", i === n));
    count.textContent = n + 1;
    ring.style.setProperty("--q", n / steps.length);
    back.hidden = n === 0;
    next.textContent = n === steps.length - 1 ? "Ver meu resultado" : "Próxima";
    if (focus) (steps[n].querySelector("input:checked") || steps[n].querySelector("input")).focus();
  };

  quiz.addEventListener("submit", (e) => {
    e.preventDefault();
    const current = steps[at];
    if (!current.querySelector("input:checked")) return current.querySelector("input").reportValidity();
    if (at < steps.length - 1) return show(at + 1, true);

    const id = quizResult(Object.fromEntries(new FormData(quiz)));
    let title = "";
    result.querySelectorAll("[data-result]").forEach((d) => {
      d.hidden = d.dataset.result !== id;
      if (!d.hidden) title = d.querySelector("h3").textContent;
    });
    const answers = steps.map((s) => `${s.querySelector("legend").textContent} ${s.querySelector("input:checked").parentElement.textContent.trim()}`);
    setDiagnostico([title, ...answers].join("\n"));

    ring.style.setProperty("--q", 1);
    quiz.hidden = true;
    result.hidden = false;
    result.focus();
    requestAnimationFrame(() => requestAnimationFrame(() => result.classList.add("lit")));
  });

  back.addEventListener("click", () => show(at - 1, true));
  result.querySelector("[data-redo]").addEventListener("click", () => {
    quiz.reset();
    setDiagnostico("");
    result.classList.remove("lit");
    result.hidden = true;
    quiz.hidden = false;
    show(0, true);
  });
  show(0);
}

if (lead) {
  const sent = document.querySelector("[data-sent]");
  const wa = sent.querySelector("[data-wa]");

  // Mensagens de erro em português, na voz do site.
  lead.querySelectorAll("[data-msg]").forEach((field) => {
    const check = () => field.setCustomValidity(field.validity.valueMissing || field.validity.tooShort ? field.dataset.msg : "");
    field.addEventListener("input", check);
    field.addEventListener("change", check);
    check();
  });

  attach?.querySelector("[data-detach]").addEventListener("click", () => setDiagnostico(""));

  // Só chega aqui com o formulário válido. window.open fica síncrono, senão o Safari bloqueia.
  lead.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = waLink(contactMessage({
      nome: lead.elements.nome.value,
      interesse: lead.elements.interesse.value,
      diagnostico,
    }));
    const tab = window.open(url, "_blank");
    if (tab) tab.opener = null;
    else location.href = url;
    wa.href = url;
    lead.hidden = true;
    sent.hidden = false;
    sent.focus();
  });
}
