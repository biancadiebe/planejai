import { describe, expect, it } from "vitest";

import { calcMonthlySavingsNeeded } from "./simulation";

describe("calcMonthlySavingsNeeded", () => {
  it("retorna o valor da meta dividido pelo prazo quando não há valor guardado", () => {
    const data = {
      income: "R$ 5000,00",
      expenses: "R$ 2000,00",
      debts: "R$ 500,00",
      goalName: "Viagem",
      goalAmount: "R$ 12000,00",
      goalDeadline: "12",
    } as const;

    expect(calcMonthlySavingsNeeded(data)).toBeCloseTo(1000, 2);
  });

  it("mantém o cálculo original para o prazo informado", () => {
    const data = {
      income: "R$ 5000,00",
      expenses: "R$ 2000,00",
      debts: "R$ 500,00",
      goalName: "Viagem",
      goalAmount: "R$ 12000,00",
      goalDeadline: "12",
    } as const;

    expect(calcMonthlySavingsNeeded(data)).toBeCloseTo(1000, 2);
  });
});
