// Varredura da página publicada. Rodar na raiz do repositório: node --test "testes/*.test.js"
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../site/${p}`, import.meta.url), "utf8");
const html = read("index.html");
const pages = { "index.html": html, "404.html": read("404.html") };
const css = read("assets/css/site.css");
const heroJs = read("assets/js/hero.js");

test("texto: zero travessão nas páginas", () => {
  for (const [name, src] of Object.entries(pages)) assert.doesNotMatch(src, /[—–]/, name);
});

test("texto: zero palavra de estoque e zero sinal de IA", () => {
  const stock = /alavanc|robust|empoder|destrav|acionáve|orientad[oa]s? a dados|soluç|sinergi|escaláve|testamento|panorama|mergulh|\belev(a|ar|am|e)\b/i;
  for (const [name, src] of Object.entries(pages)) assert.doesNotMatch(src, stock, name);
});

test("verdade: sem preço, sem promessa de 24h e sem os fatos antigos", () => {
  for (const bad of [/R\$/, /priceRange/i, /24\s?h/i, /\ba gente\b/i, /quatro anos/i]) assert.doesNotMatch(html, bad);
});

test("ação única: todo botão de destaque diz Quero meu protótipo", () => {
  const labels = [...html.matchAll(/class="btn(?: btn-sm)?"[^>]*>([^<]+)</g)].map((m) => m[1].trim());
  assert.ok(labels.length >= 4);
  assert.deepEqual([...new Set(labels)].sort(), ["Abrir o WhatsApp", "Quero meu protótipo"]);
});

test("âncoras: todo link #algo tem o id na página", () => {
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(id), `#${id} sem destino`);
});

test("portões do topo: as cinco queries idênticas no CSS e no JS", () => {
  const gates = [...heroJs.match(/GATES = \[([\s\S]*?)\]/)[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  assert.equal(gates.length, 5);
  assert.ok(css.includes(`@media ${gates.join(", ")}{`), "a media query do CSS precisa ser a lista do JS, na mesma ordem");
});

test("diagnóstico: os value do HTML são as chaves que lib.js conhece", () => {
  const values = (name) => [...html.matchAll(new RegExp(`name="${name}" value="([^"]+)"`, "g"))].map((m) => m[1]);
  assert.deepEqual(values("digital"), ["nada", "instagram", "site-antigo", "sistema"]);
  assert.deepEqual(values("trava"), ["achar", "imagem", "caderno", "manual"]);
  assert.deepEqual(values("equipe"), ["so-eu", "2-a-5", "6-a-20", "mais-de-20"]);
  assert.deepEqual(values("prazo"), ["semana", "30-dias", "entender"]);
});

test("vídeo: VIDEO_BYTES é o tamanho real do arquivo", () => {
  const url = heroJs.match(/VIDEO_URL = (null|"([^"]+)")/);
  const bytes = Number(heroJs.match(/VIDEO_BYTES = (\d+)/)[1]);
  if (url[1] === "null") return assert.equal(bytes, 0);
  assert.equal(statSync(new URL(`../site/${url[2]}`, import.meta.url)).size, bytes);
});

test("peso: JavaScript abaixo de 30 KB", () => {
  const dir = new URL("../site/assets/js/", import.meta.url);
  const total = readdirSync(dir).reduce((s, f) => s + statSync(new URL(f, dir)).size, 0);
  assert.ok(total < 30 * 1024, `${total} bytes`);
});
