import type { MutableRefObject, RefCallback } from 'react';
import { useFlowField } from '../interaction/useFlowField';

type WaterCopy = { water: string; label: string };

type WaterProps = { copy: WaterCopy; sectionRef: RefCallback<HTMLElement> };

const fragments = ['LISTEN', 'BUILD', 'OBSERVE', 'MAKE', 'LEARN', 'REPEAT'];

export const Water = ({ copy, sectionRef }: WaterProps) => {
  const { bind, isReducedMotion, surfaceRef } = useFlowField();

  return (
    <section
      id="water"
      ref={(node) => {
        sectionRef(node);
        (surfaceRef as MutableRefObject<HTMLElement | null>).current = node;
      }}
      className="world world--water water-field"
      data-reduced-motion={isReducedMotion || undefined}
      {...bind}
      aria-labelledby="water-title"
    >
      <div className="water-current water-current--one" aria-hidden="true" />
      <div className="water-current water-current--two" aria-hidden="true" />
      <div className="water-copy">
        <p className="world-index">01 / WATER · FLOW</p>
        <h2 id="water-title">{copy.label}</h2>
        <p className="water-description">{copy.water}</p>
      </div>
      <div className="water-fragments" aria-label="A field of things gathered through experience">
        {fragments.map((fragment, index) => (
          <span key={fragment} style={{ ['--fragment-index' as string]: index }}>{fragment}</span>
        ))}
      </div>
      <div className="water-instruction">Move through the field</div>
    </section>
  );
};
