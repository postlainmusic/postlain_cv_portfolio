import React, { useEffect, useRef } from 'react';
import { WaterFluid } from '../interaction/WaterFluid';
import { loadGSAP } from '../interaction/gsap';
import { InputSampler } from '../interaction/InputSampler';
import type { WorldCopy } from '../../content/narrativeCopy';
import './Water.css';

interface WaterProps {
  copy: WorldCopy;
  locale: 'vi' | 'en';
}

export const Water: React.FC<WaterProps> = ({ copy, locale }) => {
  const fieldRef = useRef<HTMLDivElement>(null);
  const typoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void loadGSAP().then((gsap) => {
      const field = fieldRef.current;
      const typo = typoRef.current;
      if (!field || !gsap || cancelled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const sampler = InputSampler.getInstance();

      const onMove = (event: PointerEvent) => {
        const rect = field.getBoundingClientRect();
        const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
        const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
        const dx = (x - 0.5) * 2;
        const dy = (y - 0.5) * 2;

        const ptr = sampler.getPointerState();
        const speed = Math.hypot(ptr.vx, ptr.vy);

        // Fluid presence and refraction coupling
        gsap.to(field, {
          '--water-x': dx,
          '--water-y': dy,
          '--water-presence': 1,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto',
        });

        // Typography physical displacement (Strictly bounded to 3.5px max)
        if (typo) {
          const shiftX = dx * Math.min(3.5, 1 + speed * 1.5);
          const shiftY = dy * Math.min(2.5, 1 + speed * 1.0);
          gsap.to(typo, {
            x: shiftX,
            y: shiftY,
            duration: 0.8,
            ease: 'sine.out',
            overwrite: 'auto',
          });
        }
      };

      const onLeave = () => {
        gsap.to(field, {
          '--water-x': 0,
          '--water-y': 0,
          '--water-presence': 0,
          duration: 1.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        if (typo) {
          gsap.to(typo, {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.4)',
            overwrite: 'auto',
          });
        }
      };

      field.addEventListener('pointermove', onMove, { passive: true });
      field.addEventListener('pointerleave', onLeave, { passive: true });
      cleanup = () => {
        field.removeEventListener('pointermove', onMove);
        field.removeEventListener('pointerleave', onLeave);
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div id="water" className="world-stage world-stage--water water-field" aria-label="World 01: Water">
      <div ref={fieldRef} className="water-fluid-surface">
        {/* Preserving verified baseline fluid simulation */}
        <WaterFluid reducedMotion={reducedMotion} />

        <div className="world-content-layer water-layout">
          <div className="world-editorial-header" aria-hidden="true">
            <span className="world-index-num">01 / WATER</span>
            <span className="world-verb-badge">FLOW · DÒNG CHẢY KHOÁNG CHẤT</span>
          </div>

          <div ref={typoRef} className="world-typography-block water-composition">
            <p className="world-kicker-text">{copy.kicker}</p>
            <h2 className="world-display-heading">{copy.title}</h2>
            {copy.subtitle && <p className="world-subtitle-text">{copy.subtitle}</p>}
            <div className="world-statement-box">
              <p className="world-statement-text">{copy.statement}</p>
              {copy.secondary && <p className="world-secondary-text">{copy.secondary}</p>}
            </div>
          </div>

          <div className="world-tactile-indicator" aria-hidden="true">
            <span className="tactile-caption">{copy.prompt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
