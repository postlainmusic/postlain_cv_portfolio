import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { WorldCopy } from '../../content/narrativeCopy';

interface WoodProps {
  copy: WorldCopy;
  locale: 'vi' | 'en';
  onNext?: () => void;
}

interface GrowthSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  thickness: number;
  growth: number; // 0 to 1
  targetGrowth: number;
  generation: number;
  colorAlpha: number;
}

interface BudNode {
  x: number;
  y: number;
  angle: number;
  speed: number;
  generation: number;
  length: number;
  currentLength: number;
  thickness: number;
  isComplete: boolean;
}

const MAX_SEGMENTS = 250;

export const Wood: React.FC<WoodProps> = ({ copy, locale }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [accumulatedGrowth, setAccumulatedGrowth] = useState<number>(0);
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const segmentsRef = useRef<GrowthSegment[]>([]);
  const budsRef = useRef<BudNode[]>([]);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const pointerEnergyRef = useRef<number>(0);

  // Initialize initial organic trunk anchor
  const initSeed = useCallback((w: number, h: number) => {
    segmentsRef.current = [];
    budsRef.current = [];

    // Base root anchor
    const rootX = w * 0.5;
    const rootY = h * 0.95;
    const trunkHeight = h * 0.28;

    segmentsRef.current.push({
      x1: rootX,
      y1: rootY,
      x2: rootX + (Math.random() - 0.5) * 20,
      y2: rootY - trunkHeight,
      thickness: 4.5,
      growth: 1,
      targetGrowth: 1,
      generation: 0,
      colorAlpha: 0.85,
    });

    // Seed initial buds from trunk top
    budsRef.current.push(
      {
        x: rootX,
        y: rootY - trunkHeight,
        angle: -Math.PI / 2 - 0.35,
        speed: 2.2,
        generation: 1,
        length: 70,
        currentLength: 0,
        thickness: 3.2,
        isComplete: false,
      },
      {
        x: rootX,
        y: rootY - trunkHeight,
        angle: -Math.PI / 2 + 0.35,
        speed: 2.0,
        generation: 1,
        length: 65,
        currentLength: 0,
        thickness: 3.0,
        isComplete: false,
      }
    );
  }, []);

  // Grow memory from pointer trail
  const addPointerTrace = useCallback((x: number, y: number) => {
    if (!lastPointRef.current) {
      lastPointRef.current = { x, y };
      return;
    }

    const prev = lastPointRef.current;
    const dist = Math.hypot(x - prev.x, y - prev.y);

    if (dist > 18) {
      const segments = segmentsRef.current;
      if (segments.length >= MAX_SEGMENTS) {
        // Recycle oldest branch while preserving trunk
        segments.splice(1, 1);
      }

      // Add user trace directly to permanent growth memory
      segments.push({
        x1: prev.x,
        y1: prev.y,
        x2: x,
        y2: y,
        thickness: Math.max(1.2, 3.8 - segments.length * 0.01),
        growth: 0.1,
        targetGrowth: 1,
        generation: 2,
        colorAlpha: 0.75,
      });

      // Sprout sub-branch buds from the user's path
      if (Math.random() > 0.4 && budsRef.current.length < 15) {
        const branchAngle = Math.atan2(y - prev.y, x - prev.x) + (Math.random() > 0.5 ? 0.7 : -0.7);
        budsRef.current.push({
          x,
          y,
          angle: branchAngle,
          speed: 1.5 + Math.random() * 1.5,
          generation: 3,
          length: 40 + Math.random() * 45,
          currentLength: 0,
          thickness: 2.0,
          isComplete: false,
        });
      }

      lastPointRef.current = { x, y };
      setAccumulatedGrowth((g) => Math.min(100, g + 1));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    initSeed(width, height);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      if (segmentsRef.current.length === 0) initSeed(width, height);
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      // Dark organic canvas background trail
      ctx.fillStyle = 'rgba(12, 17, 13, 0.15)';
      ctx.fillRect(0, 0, width, height);

      const segments = segmentsRef.current;
      const buds = budsRef.current;

      // Update active buds and convert completed steps into persistent memory
      for (let i = buds.length - 1; i >= 0; i--) {
        const bud = buds[i];
        if (bud.isComplete) {
          buds.splice(i, 1);
          continue;
        }

        const step = bud.speed;
        bud.currentLength += step;
        const nextX = bud.x + Math.cos(bud.angle) * step;
        const nextY = bud.y + Math.sin(bud.angle) * step;

        segments.push({
          x1: bud.x,
          y1: bud.y,
          x2: nextX,
          y2: nextY,
          thickness: bud.thickness * (1 - (bud.currentLength / bud.length) * 0.4),
          growth: 1,
          targetGrowth: 1,
          generation: bud.generation,
          colorAlpha: 0.7,
        });

        bud.x = nextX;
        bud.y = nextY;

        // Random subtle organic curvature
        bud.angle += (Math.random() - 0.5) * 0.12;

        if (bud.currentLength >= bud.length) {
          bud.isComplete = true;
          // Chance to sprout secondary offspring
          if (bud.generation < 4 && Math.random() > 0.5) {
            buds.push({
              x: bud.x,
              y: bud.y,
              angle: bud.angle + (Math.random() - 0.5) * 0.9,
              speed: bud.speed * 0.85,
              generation: bud.generation + 1,
              length: bud.length * 0.65,
              currentLength: 0,
              thickness: bud.thickness * 0.75,
              isComplete: false,
            });
          }
        }
      }

      // Draw all persistent growth memory segments
      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        if (seg.growth < seg.targetGrowth) {
          seg.growth = Math.min(seg.targetGrowth, seg.growth + 0.08);
        }

        const currentX2 = seg.x1 + (seg.x2 - seg.x1) * seg.growth;
        const currentY2 = seg.y1 + (seg.y2 - seg.y1) * seg.growth;

        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(currentX2, currentY2);

        // Natural earthy xylem and chlorophyll palette
        const alpha = seg.colorAlpha;
        if (seg.generation === 0) {
          ctx.strokeStyle = `rgba(180, 160, 130, ${alpha})`;
        } else if (seg.generation === 1) {
          ctx.strokeStyle = `rgba(142, 175, 133, ${alpha})`;
        } else {
          ctx.strokeStyle = `rgba(165, 205, 150, ${alpha * 0.9})`;
        }

        ctx.lineWidth = seg.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Node crystallization point on tips
        if (i % 7 === 0 && seg.growth >= 0.9) {
          ctx.beginPath();
          ctx.arc(currentX2, currentY2, seg.thickness * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(215, 235, 195, ${alpha * 0.8})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [initSeed]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isReducedMotion) return;
    pointerEnergyRef.current = 1;
    addPointerTrace(e.clientX, e.clientY);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    lastPointRef.current = { x: e.clientX, y: e.clientY };
    addPointerTrace(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    lastPointRef.current = null;
  };

  return (
    <div
      id="wood"
      ref={containerRef}
      className="world-stage world-stage--wood"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      aria-label="World 02: Wood"
    >
      <canvas ref={canvasRef} className="world-canvas wood-canvas" aria-hidden="true" />
      <div className="world-vignette wood-vignette" aria-hidden="true" />

      <div className="world-content-layer">
        <div className="world-editorial-header" aria-hidden="true">
          <span className="world-index-num">02 / WOOD</span>
          <span className="world-verb-badge">GROW · VẬT THỂ TÍCH LŨY</span>
        </div>

        <div className="world-typography-block wood-typography">
          <p className="world-kicker-text">{copy.kicker}</p>
          <h2 className="world-display-heading">{copy.title}</h2>
          {copy.subtitle && <p className="world-subtitle-text">{copy.subtitle}</p>}
          <div className="world-statement-box">
            <p className="world-statement-text">{copy.statement}</p>
            {copy.secondary && <p className="world-secondary-text">{copy.secondary}</p>}
          </div>
        </div>

        <div className="world-tactile-indicator" aria-hidden="true">
          <div className="tactile-pulse" />
          <span className="tactile-caption">
            {locale === 'vi'
              ? 'Mọi đường nét bạn kéo qua đều trở thành cấu trúc tồn tại vĩnh viễn'
              : 'Every stroke you draw crystallizes into living structural memory'}
          </span>
        </div>
      </div>
    </div>
  );
};
