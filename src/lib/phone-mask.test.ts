import { describe, expect, it } from "vitest";
import { formatPhoneBR, isValidPhoneBR } from "./phone-mask";

describe("formatPhoneBR", () => {
  it("mantém os dois primeiros dígitos sem formatar", () => {
    expect(formatPhoneBR("1")).toBe("1");
    expect(formatPhoneBR("11")).toBe("11");
  });

  it("abre parênteses no DDD a partir do terceiro dígito", () => {
    expect(formatPhoneBR("119")).toBe("(11) 9");
  });

  it("formata telefone fixo de 10 dígitos", () => {
    expect(formatPhoneBR("1133334444")).toBe("(11) 3333-4444");
  });

  it("formata celular de 11 dígitos", () => {
    expect(formatPhoneBR("11988681657")).toBe("(11) 98868-1657");
  });

  it("descarta o que passa de 11 dígitos", () => {
    expect(formatPhoneBR("1198868165799999")).toBe("(11) 98868-1657");
  });

  it("ignora caracteres que não são dígito", () => {
    expect(formatPhoneBR("(11) 98868-1657")).toBe("(11) 98868-1657");
  });

  it("devolve vazio para entrada vazia", () => {
    expect(formatPhoneBR("")).toBe("");
  });
});

describe("isValidPhoneBR", () => {
  it("aceita a partir de 10 dígitos", () => {
    expect(isValidPhoneBR("(11) 3333-4444")).toBe(true);
    expect(isValidPhoneBR("(11) 98868-1657")).toBe(true);
  });

  it("recusa menos de 10 dígitos", () => {
    expect(isValidPhoneBR("(11) 9886-165")).toBe(false);
    expect(isValidPhoneBR("")).toBe(false);
  });
});
