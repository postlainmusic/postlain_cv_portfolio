export {};

declare global {
  interface Window {
    gsap?: {
      to: (target: object, vars: Record<string, unknown>) => { kill: () => void };
      quickTo: (target: object, property: string, vars?: Record<string, unknown>) => (value: number) => void;
      ticker: { add: (callback: () => void) => void; remove: (callback: () => void) => void };
      utils: { clamp: (min: number, max: number, value: number) => number };
    };
  }
}
