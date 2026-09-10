import React, { useEffect, useRef } from 'react';
import type { WorldCopy } from '../../content/narrativeCopy';
import { VoidWebGL } from '../webgl/VoidWebGL';

interface VoidProps {
  copy: WorldCopy;
  locale: 'vi' | 'en';
}

/**
 * World 00: VOID (RESPOND — Absence / Light)
 * Upgraded Awwwards WebGL Experience:
 * - 16,000 GPU quantum dust particles swirling in 3D gravitational field
 * - Pure Cormorant Garamond luxury editorial typography
 * - Clean non-overlapping layout hierarchy
 */
export const Void: React.FC<VoidProps> = ({ copy, locale }) => {
  const webglContainerRef = useRef<HTMLDivElement | null>(null);
  const webglInstanceRef = useRef<VoidWebGL | null>(null);

  useEffect(() => {
    if (webglContainerRef.current) {
      webglInstanceRef.current = new VoidWebGL(webglContainerRef.current);
    }
    return () => {
      webglInstanceRef.current?.destroy();
      webglInstanceRef.current = null;
    };
  }, []);

  const titleChars = 'POSTLAIN'.split('');

  return (
    <div id="void" className="world-stage world-stage--void" aria-label="World 00: Void">
      {/* Layer 0: High-End WebGL 3D Quantum Dust & Gravitational Lens */}
      <div ref={webglContainerRef} className="world-webgl-layer" aria-hidden="true" />
      <div className="world-vignette void-vignette" aria-hidden="true" />

      {/* Layer 1: Semantic DOM Content & Luxury Typography */}
      <div className="world-content-layer void-layout">
        <div className="world-editorial-header" aria-hidden="true">
          <span className="world-index-num">00 / VOID</span>
          <span className="world-verb-badge">RESPOND · TRƯỜNG KHỞI NGUYÊN</span>
        </div>

        {/* Hero Title: Unified, Majestic, Editorial Cormorant Garamond */}
        <div className="void-hero-wrapper">
          <h1 className="void-grand-title" aria-label="POSTLAIN">
            {titleChars.map((char, idx) => (
              <span key={idx} className="void-glyph" style={{ '--char-index': idx } as React.CSSProperties}>
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Narrative Context */}
        <div className="world-typography-block void-typography">
          <p className="world-kicker-text">{copy.kicker}</p>
          <div className="world-statement-box">
            <p className="world-statement-text">{copy.statement}</p>
            {copy.secondary && <p className="world-secondary-text">{copy.secondary}</p>}
          </div>
        </div>

        {/* Non-overlapping Tactile Indicator at Bottom */}
        <div className="void-tactile-footer" aria-hidden="true">
          <span className="tactile-pulse" />
          <span className="tactile-caption">
            {locale === 'vi'
              ? 'Rê chuột hoặc chạm để hội tụ bụi lượng tử và khuấy động trường hư không'
              : 'Move pointer or touch to gather quantum dust and disturb the void'}
          </span>
        </div>
      </div>
    </div>
  );
};
