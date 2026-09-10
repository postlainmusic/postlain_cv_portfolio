import React, { useEffect, useRef } from 'react';
import type { WorldCopy } from '../../content/narrativeCopy';
import { WaterWebGL } from '../webgl/WaterWebGL';

interface WaterProps {
  copy: WorldCopy;
  locale: 'vi' | 'en';
}

/**
 * World 01: WATER (FLOW — Fluidity / Mineral Caustics)
 * Upgraded Awwwards WebGL Experience:
 * - Real-time Voronoi water caustics GLSL shader
 * - 3D Gerstner wave displacement and luminous fluid wake
 * - Suspended bioluminescent mineral spores
 * - Luxury Cormorant Garamond editorial typography with clean spatial hierarchy
 */
export const Water: React.FC<WaterProps> = ({ copy, locale }) => {
  const webglContainerRef = useRef<HTMLDivElement | null>(null);
  const webglInstanceRef = useRef<WaterWebGL | null>(null);

  useEffect(() => {
    if (webglContainerRef.current) {
      webglInstanceRef.current = new WaterWebGL(webglContainerRef.current);
    }
    return () => {
      webglInstanceRef.current?.destroy();
      webglInstanceRef.current = null;
    };
  }, []);

  return (
    <div id="water" className="world-stage world-stage--water" aria-label="World 01: Water">
      {/* Layer 0: High-End WebGL 3D Mineral Fluid & Voronoi Caustics */}
      <div ref={webglContainerRef} className="world-webgl-layer" aria-hidden="true" />
      <div className="world-vignette water-vignette" aria-hidden="true" />

      {/* Layer 1: Semantic DOM Content & Luxury Editorial Typography */}
      <div className="world-content-layer water-layout">
        <div className="world-editorial-header" aria-hidden="true">
          <span className="world-index-num">01 / WATER</span>
          <span className="world-verb-badge">FLOW · DÒNG CHẢY KHOÁNG CHẤT</span>
        </div>

        {/* Narrative Context */}
        <div className="world-typography-block water-typography">
          <p className="world-kicker-text">{copy.kicker}</p>
          <h2 className="world-display-heading">{copy.title}</h2>
          {copy.subtitle && <p className="world-subtitle-text">{copy.subtitle}</p>}
          <div className="world-statement-box">
            <p className="world-statement-text">{copy.statement}</p>
            {copy.secondary && <p className="world-secondary-text">{copy.secondary}</p>}
          </div>
        </div>

        {/* Non-overlapping Tactile Indicator at Bottom */}
        <div className="water-tactile-footer" aria-hidden="true">
          <span className="tactile-pulse water-pulse" />
          <span className="tactile-caption">
            {locale === 'vi'
              ? 'Rê chuột hoặc vuốt chạm để tạo luồng khúc xạ và đánh thức sóng khoáng chất'
              : 'Interact to propagate fluid caustics and awaken deep mineral currents'}
          </span>
        </div>
      </div>
    </div>
  );
};
