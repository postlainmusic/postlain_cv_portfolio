import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { WorldCopy } from '../../content/narrativeCopy';
import { InputSampler } from '../interaction/InputSampler';
import { TypographyEngine } from '../interaction/TypographyEngine';

interface VoidProps {
  copy: WorldCopy;
  locale: 'vi' | 'en';
}

export const Void: React.FC<VoidProps> = ({ copy, locale }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [composition, setComposition] = useState<number>(0);
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const typoEngineRef = useRef<TypographyEngine>(new TypographyEngine('void'));
  const heroLettersRef = useRef<HTMLSpanElement[]>([]);
  const animFrameRef = useRef<number>();

  const titleWord1 = 'POST';
  const titleWord2 = 'LAIN';

  // Cycle intentional spatial composition layout
  const nextComposition = useCallback(() => {
    setComposition((c) => (c + 1) % 3);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const sampler = InputSampler.getInstance();
    const typoEngine = typoEngineRef.current;
    typoEngine.setWorldProfile('void');

    // Mathematical light field render loop
    let decayEnergy = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const ptr = sampler.getPointerState();
      const forces = sampler.sampleForces();

      // Energy decay logic
      if (ptr.isDown || forces.length > 0) {
        decayEnergy = Math.min(1.5, decayEnergy + 0.15);
      } else {
        decayEnergy *= 0.94;
      }

      const activeRadius = Math.max(width, height) * 0.38;
      const ptrX = ptr.x * width;
      const ptrY = ptr.y * height;

      // Draw subtle inverse-square mathematical light falloff
      if (decayEnergy > 0.01) {
        const gradient = ctx.createRadialGradient(
          ptrX,
          ptrY,
          0,
          ptrX,
          ptrY,
          activeRadius * (0.8 + decayEnergy * 0.25)
        );
        gradient.addColorStop(0, `rgba(235, 85, 55, ${0.14 * decayEnergy})`);
        gradient.addColorStop(0.35, `rgba(180, 60, 40, ${0.06 * decayEnergy})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Update Typography Letter Physics based on proximity
      const letters = heroLettersRef.current;
      for (let i = 0; i < letters.length; i++) {
        const el = letters[i];
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const charCx = rect.left + rect.width * 0.5;
        const charCy = rect.top + rect.height * 0.5;

        const dist = Math.hypot(ptrX - charCx, ptrY - charCy);
        const influenceRadius = 240;

        if (dist < influenceRadius && !isReducedMotion) {
          const normDist = 1 - dist / influenceRadius;
          const pushX = ((charCx - ptrX) / dist) * normDist * 3.5;
          const pushY = ((charCy - ptrY) / dist) * normDist * 2.5;
          const letterOpacity = 0.75 + normDist * 0.25;

          el.style.transform = `translate3d(${pushX.toFixed(2)}px, ${pushY.toFixed(2)}px, 0px)`;
          el.style.color = `rgba(255, 255, 255, ${letterOpacity.toFixed(2)})`;
        } else {
          el.style.transform = 'translate3d(0px, 0px, 0px)';
          el.style.color = 'rgba(236, 232, 223, 0.85)';
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isReducedMotion]);

  return (
    <div
      id="void"
      ref={containerRef}
      className={`world-stage world-stage--void comp-mode--${composition}`}
      aria-label="World 00: The Void"
    >
      <canvas ref={canvasRef} className="world-canvas void-light-canvas" aria-hidden="true" />
      <div className="void-orbit" aria-hidden="true" />
      <div className="void-axis" aria-hidden="true" />

      <div className="world-content-layer void-layout">
        <div className="world-editorial-header" aria-hidden="true">
          <span className="world-index-num">00 / VOID</span>
          <span className="world-verb-badge">RESPOND · TRƯỜNG KHỞI NGUYÊN</span>
        </div>

        <div className="void-copy-main">
          <p className="world-kicker-text">{copy.kicker}</p>
          <h1 className="void-hero-title" aria-label="POSTLAIN">
            <span className="title-row title-row--1">
              {titleWord1.split('').map((char, idx) => (
                <span
                  key={`w1-${idx}`}
                  ref={(el) => {
                    if (el) heroLettersRef.current[idx] = el;
                  }}
                  className="physical-glyph"
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="title-row title-row--2">
              {titleWord2.split('').map((char, idx) => (
                <span
                  key={`w2-${idx}`}
                  ref={(el) => {
                    if (el) heroLettersRef.current[4 + idx] = el;
                  }}
                  className="physical-glyph"
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>

          <div className="void-statements-grid">
            <p className="void-statement-text">{copy.statement}</p>
            {copy.secondary && <p className="void-secondary-text">{copy.secondary}</p>}
          </div>
        </div>

        <div className="void-composition-switch">
          <button
            type="button"
            className="void-compose-btn"
            onClick={nextComposition}
            aria-label="Cycle typographical composition"
          >
            <span className="compose-num">{(composition + 1).toString().padStart(2, '0')}</span>
            <span className="compose-label">
              {locale === 'vi' ? 'Biến đổi bố cục trường' : 'Shift field composition'}
            </span>
          </button>
        </div>

        <div className="world-tactile-indicator" aria-hidden="true">
          <span className="tactile-caption">{copy.prompt}</span>
        </div>
      </div>
    </div>
  );
};
