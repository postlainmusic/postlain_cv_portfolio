import React, { type MutableRefObject } from 'react';
import { usePointerField } from '../interaction/usePointerField';
import type { WorldCopy } from '../../content/narrativeCopy';

interface VoidProps {
  copy: WorldCopy;
  locale: 'vi' | 'en';
}

export const Void: React.FC<VoidProps> = ({ copy, locale }) => {
  const { bind, composition, isReducedMotion, nextComposition, surfaceRef } = usePointerField();

  return (
    <div
      id="void"
      ref={(node) => {
        (surfaceRef as MutableRefObject<HTMLElement | null>).current = node;
      }}
      className="world-stage world-stage--void"
      data-composition={composition}
      data-reduced-motion={isReducedMotion || undefined}
      {...bind}
      aria-label="World 00: The Void"
    >
      <div className="void-orbit" aria-hidden="true" />
      <div className="void-axis" aria-hidden="true" />

      <div className="world-content-layer void-layout">
        <div className="world-editorial-header" aria-hidden="true">
          <span className="world-index-num">00 / VOID</span>
          <span className="world-verb-badge">RESPOND · TRƯỜNG PHẢN HỒI</span>
        </div>

        <div className="void-copy-main">
          <p className="world-kicker-text">{copy.kicker}</p>
          <h1 className="void-hero-title" aria-label="POSTLAIN">
            <span>POST</span>
            <span>LAIN</span>
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
