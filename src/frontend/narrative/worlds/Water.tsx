import { useEffect, useRef } from 'react';
import type { RefCallback } from 'react';
import { WaterFluid } from '../interaction/WaterFluid';
import '../interaction/gsap';

type WaterCopy = { water: string; label: string };
type WaterProps = { copy: WaterCopy; sectionRef: RefCallback<HTMLElement> };

const fragments = ['LISTEN', 'BUILD', 'OBSERVE', 'MAKE', 'LEARN', 'REPEAT'];

export const Water = ({ copy, sectionRef }: WaterProps) => {
  const fieldRef = useRef<HTMLDivElement>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = media.matches;
    const onChange = () => { reducedMotionRef.current = media.matches; };
    media.addEventListener('change', onChange);

    const field = fieldRef.current;
    const gsap = window.gsap;
    if (!field || !gsap || reducedMotionRef.current) {
      return () => media.removeEventListener('change', onChange);
    }

    const copyLayer = field.querySelector<HTMLElement>('.water-copy');
    const fragmentNodes = Array.from(field.querySelectorAll<HTMLElement>('.water-fragments span'));

    const onMove = (event: PointerEvent) => {
      const rect = field.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      const centerX = x - 0.5;
      const centerY = y - 0.5;

      gsap.to(field, {
        '--flow-x': x,
        '--flow-y': y,
        '--flow-active': 1,
        duration: 0.75,
        ease: 'power3.out',
        overwrite: 'auto',
      });

      if (copyLayer) {
        gsap.to(copyLayer, {
          x: centerX * -22,
          y: centerY * -14,
          duration: 0.9,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      }

      fragmentNodes.forEach((node, index) => {
        const strength = 10 + index * 3;
        gsap.to(node, {
          x: centerX * -strength,
          y: centerY * -strength * 0.7,
          rotation: centerX * (index % 2 ? -7 : 7),
          duration: 0.7 + index * 0.04,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });
    };

    const onLeave = () => {
      gsap.to(field, { '--flow-active': 0, duration: 1.4, ease: 'power2.out' });
      if (copyLayer) gsap.to(copyLayer, { x: 0, y: 0, duration: 1.5, ease: 'elastic.out(1, 0.7)' });
      fragmentNodes.forEach((node, index) => {
        gsap.to(node, { x: 0, y: 0, rotation: 0, duration: 1.2 + index * 0.05, ease: 'elastic.out(1, 0.75)' });
      });
    };

    field.addEventListener('pointermove', onMove, { passive: true });
    field.addEventListener('pointerleave', onLeave, { passive: true });
    return () => {
      field.removeEventListener('pointermove', onMove);
      field.removeEventListener('pointerleave', onLeave);
      media.removeEventListener('change', onChange);
    };
  }, []);

  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section
      id="water"
      ref={sectionRef}
      className="world world--water water-field"
      aria-labelledby="water-title"
    >
      <div ref={fieldRef} className="water-fluid-surface">
        <WaterFluid reducedMotion={reducedMotion} />
        <div className="water-copy">
          <p className="world-index">01 / WATER · FLOW</p>
          <h2 id="water-title">{copy.label}</h2>
          <p className="water-description">{copy.water}</p>
        </div>
        <div className="water-fragments" aria-hidden="true">
          {fragments.map((fragment, index) => (
            <span key={fragment} style={{ ['--fragment-index' as string]: index }}>{fragment}</span>
          ))}
        </div>
        <div className="water-instruction">Move through the field</div>
      </div>
    </section>
  );
};
