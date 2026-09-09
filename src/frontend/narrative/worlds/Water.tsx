import { useEffect, useRef } from 'react';
import type { RefCallback } from 'react';
import { WaterFluid } from '../interaction/WaterFluid';
import { loadGSAP } from '../interaction/gsap';
import './Water.css';

type WaterCopy = { water: string; label: string };
type WaterProps = { copy: WaterCopy; sectionRef: RefCallback<HTMLElement> };

export const Water = ({ copy, sectionRef }: WaterProps) => {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void loadGSAP().then((gsap) => {
      const field = fieldRef.current;
      if (!field || !gsap || cancelled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const onMove = (event: PointerEvent) => {
        const rect = field.getBoundingClientRect();
        const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
        const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
        const dx = (x - 0.5) * 2;
        const dy = (y - 0.5) * 2;

        gsap.to(field, {
          '--water-x': dx,
          '--water-y': dy,
          '--water-presence': 1,
          duration: 0.7,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      };

      const onLeave = () => {
        gsap.to(field, {
          '--water-x': 0,
          '--water-y': 0,
          '--water-presence': 0,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
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
    <section id="water" ref={sectionRef} className="world world--water water-field" aria-labelledby="water-title">
      <div ref={fieldRef} className="water-fluid-surface">
        <WaterFluid reducedMotion={reducedMotion} />

        <div className="water-header" aria-hidden="true">
          <span>01 / WATER</span>
          <span>FLOW</span>
        </div>

        <div className="water-composition">
          <p className="water-kicker">AN OPEN FIELD FOR MAKING</p>
          <h2 id="water-title">{copy.label}</h2>
          <p className="water-description">{copy.water}</p>
        </div>

        <div className="water-instruction" aria-hidden="true">Move through the field</div>
      </div>
    </section>
  );
};
