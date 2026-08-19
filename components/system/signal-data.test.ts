import { describe, expect, it } from "vitest";

import { serviceRoutes, signalLinks, signalNodes } from "./signal-data";

describe("signal data", () => {
  it("connects every signal link to known nodes", () => {
    const nodeIds = new Set(signalNodes.map((node) => node.id));

    for (const link of signalLinks) {
      expect(nodeIds).toContain(link.source);
      expect(nodeIds).toContain(link.target);
    }
  });

  it("defines the five required signals and makes prioridad the shared target", () => {
    expect(signalNodes.map((node) => node.id)).toEqual([
      "ventas",
      "operacion",
      "clientes",
      "sistemas",
      "prioridad",
    ]);
    expect(signalNodes.map((node) => node.label)).toEqual([
      "VENTAS",
      "OPERACIÓN",
      "CX",
      "SISTEMAS",
      "PRIORIDAD",
    ]);
    expect(signalLinks).toHaveLength(4);
    expect(signalLinks.map((link) => link.source)).toEqual([
      "ventas",
      "operacion",
      "clientes",
      "sistemas",
    ]);
    expect(new Set(signalLinks.map((link) => link.source)).size).toBe(4);
    expect(signalLinks.every((link) => link.target === "prioridad")).toBe(true);
  });

  it("defines the three service routes", () => {
    expect(serviceRoutes).toHaveLength(3);
    expect(serviceRoutes).toEqual([
      { number: "01", label: "SOFTWARE", outcome: "Procesos que responden a la operación." },
      { number: "02", label: "MARCA B2B", outcome: "Una propuesta que se entiende y se recuerda." },
      { number: "03", label: "CX", outcome: "Experiencias que eliminan fricción." },
    ]);
  });
});
