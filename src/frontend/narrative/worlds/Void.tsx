import type { MutableRefObject, RefCallback } from 'react';
import { usePointerField } from '../interaction/usePointerField';

type VoidCopy = {
  entity: string;
  opening: string;
  openingSmall: string;
  scroll: string;
};

type VoidProps = {
  copy: VoidCopy;
  sectionRef: RefCallback<HTMLElement>;
};

export const Void = ({ copy, sectionRef }: VoidProps) => {
  const { bind, composition, isReducedMotion, nextComposition, surfaceRef } = usePointerField();

  return (
    <section
      id="void"
      ref={(node) => {
        sectionRef(node);
        (surfaceRef as MutableRefObject<HTMLElement | null>).current = node;
      }}
      className="world world--void"
      data-composition={composition}
      data-reduced-motion={isReducedMotion || undefined}
      {...bind}
      aria-labelledby="void-title"
    >
      <div className="void-orbit" aria-hidden="true" />
      <div className="void-axis" aria-hidden="true" />
      <p className="void-index" aria-hidden="true">00 — RESPOND</p>
      <div className="void-copy">
        <p className="void-kicker">AN OPEN FIELD FOR MAKING</p>
        <h1 id="void-title" aria-label={copy.entity}>
          <span>POST</span>
          <span>LAIN</span>
        </h1>
        <p className="void-statement">{copy.opening}</p>
        <p className="void-secondary">{copy.openingSmall}</p>
      </div>
      <div className="void-controls">
        <button type="button" className="void-compose" onClick={nextComposition} aria-describedby="void-instruction">
          <span aria-hidden="true">{String(composition + 1).padStart(2, '0')}</span>
          {isReducedMotion ? 'Shift composition' : 'Move / touch the field'}
        </button>
        <p id="void-instruction" className="sr-only">
          Move a pointer or drag across this section to change the typographic composition. The button cycles the same states.
        </p>
      </div>
      <a className="void-next" href="#water">
        <span>{copy.scroll}</span><i aria-hidden="true">↓</i>
      </a>
    </section>
  );
};
