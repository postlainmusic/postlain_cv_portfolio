import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent, type RefObject } from 'react';

type PointerField = {
  bind: {
    onPointerDown: (event: PointerEvent<HTMLElement>) => void;
    onPointerMove: (event: PointerEvent<HTMLElement>) => void;
    onPointerLeave: () => void;
  };
  composition: number;
  isReducedMotion: boolean;
  nextComposition: () => void;
  surfaceRef: RefObject<HTMLElement>;
};

const fieldStyle = (element: HTMLElement, x: number, y: number, energy: number) => {
  element.style.setProperty('--pointer-x', `${x.toFixed(3)}`);
  element.style.setProperty('--pointer-y', `${y.toFixed(3)}`);
  element.style.setProperty('--pointer-energy', `${energy.toFixed(3)}`);
};

export const usePointerField = (): PointerField => {
  const surfaceRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number>();
  const pointRef = useRef({ x: 0.5, y: 0.5, previousX: 0.5, previousY: 0.5 });
  const [composition, setComposition] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setIsReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => {
      media.removeEventListener('change', update);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const updateField = useCallback((event: PointerEvent<HTMLElement>) => {
    if (isReducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    const previous = pointRef.current;
    const energy = Math.min(1, Math.hypot(x - previous.previousX, y - previous.previousY) * 9 + 0.18);
    pointRef.current = { x, y, previousX: x, previousY: y };

    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      if (surfaceRef.current) fieldStyle(surfaceRef.current, pointRef.current.x, pointRef.current.y, energy);
      frameRef.current = undefined;
    });
  }, [isReducedMotion]);

  const resetField = useCallback(() => {
    if (!surfaceRef.current || isReducedMotion) return;
    fieldStyle(surfaceRef.current, 0.5, 0.5, 0);
  }, [isReducedMotion]);

  return {
    bind: {
      onPointerDown: (event) => {
        event.currentTarget.setPointerCapture?.(event.pointerId);
        updateField(event);
      },
      onPointerMove: updateField,
      onPointerLeave: resetField,
    },
    composition,
    isReducedMotion,
    nextComposition: () => setComposition((current) => (current + 1) % 3),
    surfaceRef,
  };
};
