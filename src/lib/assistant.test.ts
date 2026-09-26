import { describe, expect, it } from "vitest";
import { getAssistantReply } from "./assistant";

describe("getAssistantReply", () => {
  it("reconhece um telefone digitado e promete retorno", () => {
    expect(getAssistantReply("meu whats é 11 98868-1657")).toContain("Anotado");
  });

  it("nunca informa valor quando perguntam preço", () => {
    const reply = getAssistantReply("quanto custa uma landing page?");
    expect(reply).toContain("escopo");
    expect(reply).not.toMatch(/R\$|\d{3,}/);
  });

  it("responde prazo com os 10 dias úteis", () => {
    expect(getAssistantReply("qual o prazo de entrega?")).toContain("10 dias úteis");
  });

  it("fala do painel quando perguntam de sistema", () => {
    expect(getAssistantReply("vocês fazem sistema de estoque?")).toContain("painel");
  });

  it("oferece o protótipo sem custo quando perguntam de landing", () => {
    expect(getAssistantReply("preciso de uma landing page")).toContain("protótipo");
  });

  it("fala de marca quando perguntam de identidade visual", () => {
    expect(getAssistantReply("vocês criam logo?")).toContain("Identidade visual");
  });

  it("coloca na fila quando pedem amostra grátis", () => {
    expect(getAssistantReply("tem teste grátis?")).toContain("fila");
  });

  it("informa a cidade de atendimento", () => {
    expect(getAssistantReply("onde vocês ficam?")).toContain("Cajamar");
  });

  it("devolve pergunta de triagem na saudação", () => {
    expect(getAssistantReply("bom dia")).toContain("primeiro");
  });

  it("cai no fallback limitado ao escopo da NEW CORP", () => {
    expect(getAssistantReply("qual a capital da França?")).toContain("Só consigo falar sobre a NEW CORP");
  });

  it("trata entrada vazia sem quebrar", () => {
    expect(typeof getAssistantReply("")).toBe("string");
  });

  // O telefone é checado antes de tudo: quem manda o número junto com a
  // pergunta de preço precisa cair no ramo do contato, não no de orçamento.
  it("prioriza o telefone sobre as outras regras", () => {
    expect(getAssistantReply("quanto custa? 11988681657")).toContain("Anotado");
  });
});
