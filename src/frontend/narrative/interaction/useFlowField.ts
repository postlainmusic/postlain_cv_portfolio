import { useCallback, useEffect, useRef, useState, type PointerEvent, type RefObject } from 'react';

type FlowField = {
  bind: {
    onPointerDown: (event: PointerEvent<HTMLElement>) => void;
    onPointerMove: (event: PointerEvent<HTMLElement>) => void;
    onPointerUp: () => void;
    onPointerLeave: () => void;
  };
  isReducedMotion: boolean;
  surfaceRef: RefObject<HTMLElement>;
};

export const useFlowField = (): FlowField => {
  const surfaceRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number>();
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const pointRef = useRef({ x: 0.5, y: 0.5, active: false });

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

  const write = useCallback(() => {
    const element = surfaceRef.current;
    if (!element) return;
    element.style.setProperty('--flow-x', pointRef.current.x.toFixed(3));
    element.style.setProperty('--flow-y', pointRef.current.y.toFixed(3));
    element.style.setProperty('--flow-active', pointRef.current.active ? '1' : '0');
    frameRef.current = undefined;
  }, []);

  const update = useCallback((event: PointerEvent<HTMLElement>) => {
    if (isReducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointRef.current = {
      x: Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width)),
      y: Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height)),
      active: true,
    };
    if (!frameRef.current) frameRef.current = requestAnimationFrame(write);
  }, [isReducedMotion, write]);

  const release = useCallback(() => {
    pointRef.current.active = false;
    if (!frameRef.current) frameRef.current = requestAnimationFrame(write);
  }, [write]);

  return {
    bind: {
      onPointerDown: (event) => {
        event.currentTarget.setPointerCapture?.(event.pointerId);
        update(event);
      },
      onPointerMove: update,
      onPointerUp: release,
      onPointerLeave: release,
    },
    isReducedMotion,
    surfaceRef,
  };
};
