import { describe, expect, it } from "vitest";
import { getNextStepVariant, getQuizResultId } from "./quiz";

describe("getQuizResultId", () => {
  it("aponta gargalo de operação quando o controle é no caderno", () => {
    expect(getQuizResultId(["Tenho site", "Controle no caderno", "2 a 5", "Esse mês"])).toBe("gargalo-operacao");
  });

  it("aponta gargalo de operação quando o controle é manual", () => {
    expect(getQuizResultId(["Tenho site", "Tudo manual", "2 a 5", "Esse mês"])).toBe("gargalo-operacao");
  });

  it("aponta gargalo de operação quando já existe sistema na frente digital", () => {
    expect(getQuizResultId(["Site e sistema", "Poucos clientes", "2 a 5", "Esse mês"])).toBe("gargalo-operacao");
  });

  it("aponta problema de percepção quando a dor é imagem", () => {
    expect(getQuizResultId(["Só rede social", "Imagem fraca", "1", "Esse mês"])).toBe("problema-percepcao");
  });

  it("cai em começar pela presença quando nada mais se aplica", () => {
    expect(getQuizResultId(["Só rede social", "Poucos clientes", "1", "Sem pressa"])).toBe("comece-presenca");
  });

  // Regra do original: a resposta 3 é coletada mas não pesa no resultado.
  it("ignora a terceira resposta no cálculo", () => {
    const comUm = getQuizResultId(["Só rede social", "Imagem fraca", "1", "Esse mês"]);
    const comMuitos = getQuizResultId(["Só rede social", "Imagem fraca", "mais de 10", "Esse mês"]);
    expect(comUm).toBe(comMuitos);
  });

  it("não quebra com respostas faltando", () => {
    expect(getQuizResultId([])).toBe("comece-presenca");
  });
});

describe("getNextStepVariant", () => {
  it("marca urgência para quem precisa essa semana", () => {
    expect(getNextStepVariant("Preciso essa semana")).toBe("urgencia");
  });

  it("marca sem pressa para quem só quer entender", () => {
    expect(getNextStepVariant("Só quero entender")).toBe("sem-pressa");
  });

  it("cai no padrão nos demais casos", () => {
    expect(getNextStepVariant("Nos próximos meses")).toBe("padrao");
  });
});
