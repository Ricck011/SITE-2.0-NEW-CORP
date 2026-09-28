// Rodar na raiz do repositório: node --test "testes/*.test.js"
import { test } from "node:test";
import assert from "node:assert/strict";
import { approach, bandK, bandOpacity, contactMessage, quizResult, rng, waLink } from "../site/assets/js/lib.js";

test("diagnóstico: caderno, trabalho manual ou sistema ruim apontam para operação", () => {
  assert.equal(quizResult({ digital: "instagram", trava: "caderno" }), "operacao");
  assert.equal(quizResult({ digital: "nada", trava: "manual" }), "operacao");
  assert.equal(quizResult({ digital: "sistema", trava: "achar" }), "operacao");
});

test("diagnóstico: imagem aponta para percepção; o resto, para presença", () => {
  assert.equal(quizResult({ digital: "site-antigo", trava: "imagem" }), "percepcao");
  assert.equal(quizResult({ digital: "nada", trava: "achar" }), "presenca");
  assert.equal(quizResult({}), "presenca");
});

test("diagnóstico: o tamanho da equipe não muda o resultado", () => {
  const base = { digital: "instagram", trava: "imagem" };
  assert.equal(quizResult({ ...base, equipe: "so-eu" }), quizResult({ ...base, equipe: "mais-de-20" }));
});

test("mensagem do WhatsApp: primeiro nome, interesse e diagnóstico, sem linha vazia", () => {
  assert.equal(
    contactMessage({ nome: "  Ana  Paula Souza ", interesse: "Sistema de gestão", diagnostico: "Comece pelo sistema." }),
    "Olá! Sou Ana e quero meu protótipo de uma tela.\nInteresse: Sistema de gestão.\nMeu diagnóstico: Comece pelo sistema.",
  );
  assert.equal(contactMessage({ nome: "Ana" }), "Olá! Sou Ana e quero meu protótipo de uma tela.");
});

test("link do WhatsApp codifica acento e quebra de linha", () => {
  assert.equal(waLink(), "https://wa.me/5511988681657");
  assert.equal(waLink("Olá\nsim"), "https://wa.me/5511988681657?text=Ol%C3%A1%0Asim");
});

test("faixas do topo: primeira começa acesa, última termina acesa, meio sobe e desce", () => {
  assert.equal(bandOpacity(0, 0, 0.3, { first: true }), 1);
  assert.equal(bandOpacity(1, 0.7, 1, { last: true }), 1);
  assert.equal(bandOpacity(0.36, 0.36, 0.64), 0);
  assert.equal(bandOpacity(0.5, 0.36, 0.64), 1);
  assert.equal(bandOpacity(0.64, 0.36, 0.64), 0);
  assert.equal(bandOpacity(0.2, 0.36, 0.64), 0);
  assert.equal(bandK(0.36, 0.36, 0.64), 0);
  assert.equal(bandK(0.5, 0.36, 0.64), 1);
});

test("suavização igual em 60 Hz e 120 Hz", () => {
  let at60 = 0, at120 = 0;
  for (let i = 0; i < 30; i++) at60 = approach(at60, 1, 1000 / 60);
  for (let i = 0; i < 60; i++) at120 = approach(at120, 1, 1000 / 120);
  assert.ok(Math.abs(at60 - at120) < 1e-9);
});

test("gerador com semente repete a mesma sequência", () => {
  const a = rng(7), b = rng(7);
  assert.deepEqual([a(), a(), a()], [b(), b(), b()]);
});
