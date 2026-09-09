type GSAPLike = {
  to: (target: Element | object, vars: Record<string, unknown>) => { kill?: () => void };
  set?: (target: Element | object, vars: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    gsap?: GSAPLike;
  }
}

let loader: Promise<GSAPLike | null> | null = null;

export const loadGSAP = (): Promise<GSAPLike | null> => {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (window.gsap) return Promise.resolve(window.gsap);
  if (loader) return loader;

  loader = new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-postlain-gsap]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.gsap ?? null), { once: true });
      existing.addEventListener('error', () => resolve(null), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js';
    script.async = true;
    script.dataset.postlainGsap = 'true';
    script.onload = () => resolve(window.gsap ?? null);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });

  return loader;
};

export {};
