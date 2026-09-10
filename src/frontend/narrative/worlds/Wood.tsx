import React, { useEffect, useRef } from 'react';
import type { WorldCopy } from '../../content/narrativeCopy';
import { WoodWebGL } from '../webgl/WoodWebGL';

interface WoodProps {
  copy: WorldCopy;
  locale: 'vi' | 'en';
  onNext?: () => void;
}

/**
 * World 02: WOOD (GROW — Persistent Organic Network)
 * Upgraded Awwwards WebGL Experience:
 * - Generative 3D organic branching roots with glowing xylem tubes
 * - 4,000 bioluminescent spores floating in atmospheric currents
 * - Luxury Cormorant Garamond typography with clean spatial hierarchy
 */
export const Wood: React.FC<WoodProps> = ({ copy, locale }) => {
  const webglContainerRef = useRef<HTMLDivElement | null>(null);
  const webglInstanceRef = useRef<WoodWebGL | null>(null);

  useEffect(() => {
    if (webglContainerRef.current) {
      webglInstanceRef.current = new WoodWebGL(webglContainerRef.current);
    }
    return () => {
      webglInstanceRef.current?.destroy();
      webglInstanceRef.current = null;
    };
  }, []);

  return (
    <div id="wood" className="world-stage world-stage--wood" aria-label="World 02: Wood">
      {/* Layer 0: 3D Organic Generative Mycorrhizal Roots & Spores */}
      <div ref={webglContainerRef} className="world-webgl-layer" aria-hidden="true" />
      <div className="world-vignette wood-vignette" aria-hidden="true" />

      {/* Layer 1: Semantic DOM Content & Luxury Typography */}
      <div className="world-content-layer wood-layout">
        <div className="world-editorial-header" aria-hidden="true">
          <span className="world-index-num">02 / WOOD</span>
          <span className="world-verb-badge">GROW · VẬT THỂ TÍCH LŨY HỮU CƠ</span>
        </div>

        {/* Narrative Context */}
        <div className="world-typography-block wood-typography">
          <p className="world-kicker-text">{copy.kicker}</p>
          <h2 className="world-display-heading">{copy.title}</h2>
          {copy.subtitle && <p className="world-subtitle-text">{copy.subtitle}</p>}
          <div className="world-statement-box">
            <p className="world-statement-text">{copy.statement}</p>
            {copy.secondary && <p className="world-secondary-text">{copy.secondary}</p>}
          </div>
        </div>

        {/* Non-overlapping Tactile Indicator at Bottom */}
        <div className="wood-tactile-footer" aria-hidden="true">
          <span className="tactile-pulse wood-pulse" />
          <span className="tactile-caption">
            {locale === 'vi'
              ? 'Rê chuột để nuôi dưỡng sự phát quang và hướng sinh trưởng của các nhánh rễ'
              : 'Move pointer to nurture bioluminescent spores and phototropic root growth'}
          </span>
        </div>
      </div>
    </div>
  );
};
