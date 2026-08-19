export type SignalNode = {
  id: "ventas" | "operacion" | "clientes" | "sistemas" | "prioridad";
  label: "VENTAS" | "OPERACIÓN" | "CX" | "SISTEMAS" | "PRIORIDAD";
  x: number;
  y: number;
  tone: "muted" | "cyan" | "emerald";
};

export type SignalLink = {
  source: SignalNode["id"];
  target: SignalNode["id"];
};

export const signalNodes: SignalNode[] = [
  { id: "ventas", label: "VENTAS", x: 16, y: 18, tone: "muted" },
  { id: "operacion", label: "OPERACIÓN", x: 14, y: 68, tone: "cyan" },
  { id: "clientes", label: "CX", x: 76, y: 16, tone: "emerald" },
  { id: "sistemas", label: "SISTEMAS", x: 78, y: 70, tone: "muted" },
  { id: "prioridad", label: "PRIORIDAD", x: 47, y: 44, tone: "cyan" },
];

export const signalLinks: SignalLink[] = [
  { source: "ventas", target: "prioridad" },
  { source: "operacion", target: "prioridad" },
  { source: "clientes", target: "prioridad" },
  { source: "sistemas", target: "prioridad" },
];

export const serviceRoutes = [
  { number: "01", label: "SOFTWARE", outcome: "Procesos que responden a la operación." },
  { number: "02", label: "MARCA B2B", outcome: "Una propuesta que se entiende y se recuerda." },
  { number: "03", label: "CX", outcome: "Experiencias que eliminan fricción." },
] as const;
