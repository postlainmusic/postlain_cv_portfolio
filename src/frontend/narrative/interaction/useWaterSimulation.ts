import { useCallback, useEffect, useRef, useState, type PointerEvent, type RefObject } from 'react';

export type WaterSimulation = {
  canvasRef: RefObject<HTMLCanvasElement>;
  containerRef: RefObject<HTMLElement>;
  flowState: number;
  isReducedMotion: boolean;
  nextFlowState: () => void;
  dropRipple: (normX: number, normY: number, strength?: number, radius?: number) => void;
  bind: {
    onPointerDown: (event: PointerEvent<HTMLElement>) => void;
    onPointerMove: (event: PointerEvent<HTMLElement>) => void;
    onPointerLeave: () => void;
  };
};

const SIM_COLS = 128;
const SIM_ROWS = 72;
const DAMPING = 0.965;

export const useWaterSimulation = (): WaterSimulation => {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>();
  const [flowState, setFlowState] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Simulation buffers
  const buf1Ref = useRef<Float32Array>(new Float32Array(SIM_COLS * SIM_ROWS));
  const buf2Ref = useRef<Float32Array>(new Float32Array(SIM_COLS * SIM_ROWS));
  const pointerRef = useRef({ x: 0.5, y: 0.5, prevX: 0.5, prevY: 0.5, speed: 0 });
  const isPointerDownRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setIsReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const dropRipple = useCallback((normX: number, normY: number, strength = 1.0, radius = 3) => {
    if (isReducedMotion) return;
    const cx = Math.floor(Math.max(1, Math.min(SIM_COLS - 2, normX * SIM_COLS)));
    const cy = Math.floor(Math.max(1, Math.min(SIM_ROWS - 2, normY * SIM_ROWS)));
    const buf = buf1Ref.current;

    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const x = cx + dx;
        const y = cy + dy;
        if (x >= 1 && x < SIM_COLS - 1 && y >= 1 && y < SIM_ROWS - 1) {
          const dist = Math.hypot(dx, dy);
          if (dist <= radius) {
            const factor = (1 - dist / radius) * strength * 255;
            buf[y * SIM_COLS + x] += factor;
          }
        }
      }
    }
  }, [isReducedMotion]);

  // Main simulation and render loop
  useEffect(() => {
    if (isReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = SIM_COLS;
    offscreenCanvas.height = SIM_ROWS;
    const offCtx = offscreenCanvas.getContext('2d');
    const imgData = offCtx?.createImageData(SIM_COLS, SIM_ROWS);

    let lastAutoDrop = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const render = (time: number) => {
      let b1 = buf1Ref.current;
      const b2 = buf2Ref.current;

      // Ambient stream pulse according to flow state
      if (flowState === 1 && time - lastAutoDrop > 800) {
        lastAutoDrop = time;
        const rx = 0.3 + Math.sin(time * 0.001) * 0.2;
        const ry = 0.4 + Math.cos(time * 0.0013) * 0.2;
        dropRipple(rx, ry, 0.45, 2);
      } else if (flowState === 2 && time - lastAutoDrop > 350) {
        lastAutoDrop = time;
        const rx = 0.5 + (Math.random() - 0.5) * 0.6;
        const ry = 0.5 + (Math.random() - 0.5) * 0.6;
        dropRipple(rx, ry, 0.8, 3);
      }

      // Discrete Wave Equation Propagation
      for (let y = 1; y < SIM_ROWS - 1; y++) {
        const rowOffset = y * SIM_COLS;
        for (let x = 1; x < SIM_COLS - 1; x++) {
          const idx = rowOffset + x;
          const val = (b1[idx - 1] + b1[idx + 1] + b1[idx - SIM_COLS] + b1[idx + SIM_COLS]) * 0.5 - b2[idx];
          b2[idx] = val * DAMPING;
        }
      }

      // Swap buffers
      buf1Ref.current = b2;
      buf2Ref.current = b1;
      b1 = b2; // current active height

      // Render heightmap and light caustics to offscreen image
      if (imgData && offCtx) {
        const data = imgData.data;
        for (let y = 1; y < SIM_ROWS - 1; y++) {
          const rowOffset = y * SIM_COLS;
          for (let x = 1; x < SIM_COLS - 1; x++) {
            const idx = rowOffset + x;
            const pIdx = idx * 4;

            // Optical slope gradient
            const dx = b1[idx + 1] - b1[idx - 1];
            const dy = b1[idx + SIM_COLS] - b1[idx - SIM_COLS];
            const intensity = Math.max(-128, Math.min(128, (dx + dy) * 1.8));

            // Alpha-blended refractive shading
            data[pIdx] = Math.min(255, Math.max(0, 40 + intensity * 0.9));     // R
            data[pIdx + 1] = Math.min(255, Math.max(0, 58 + intensity * 1.1)); // G
            data[pIdx + 2] = Math.min(255, Math.max(0, 70 + intensity * 1.3)); // B
            data[pIdx + 3] = Math.min(255, Math.max(0, Math.abs(intensity) * 2.2 + 20)); // Alpha
          }
        }
        offCtx.putImageData(imgData, 0, 0);

        // Draw scaled to target canvas with smooth filtering
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'medium';
        ctx.drawImage(offscreenCanvas, 0, 0, canvas.width, canvas.height);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      ro.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [flowState, isReducedMotion, dropRipple]);

  const updatePointer = useCallback((event: PointerEvent<HTMLElement>) => {
    if (isReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));

    const prev = pointerRef.current;
    const dist = Math.hypot(x - prev.x, y - prev.y);
    const speed = Math.min(2.5, dist * 14 + 0.15);

    pointerRef.current = { x, y, prevX: prev.x, prevY: prev.y, speed };

    // Inject ripple on continuous movement
    if (dist > 0.008 || isPointerDownRef.current) {
      dropRipple(x, y, isPointerDownRef.current ? 1.5 : speed, 3);
    }
  }, [isReducedMotion, dropRipple]);

  return {
    canvasRef,
    containerRef,
    flowState,
    isReducedMotion,
    nextFlowState: () => {
      setFlowState((curr) => {
        const next = (curr + 1) % 3;
        dropRipple(0.5, 0.5, 1.8, 5);
        return next;
      });
    },
    dropRipple,
    bind: {
      onPointerDown: (event) => {
        isPointerDownRef.current = true;
        event.currentTarget.setPointerCapture?.(event.pointerId);
        updatePointer(event);
      },
      onPointerMove: updatePointer,
      onPointerLeave: () => {
        isPointerDownRef.current = false;
      },
    },
  };
};
