import React, { useEffect, useRef, useState } from 'react';
import type { WorldCopy } from '../../content/narrativeCopy';
import { MetalWebGL } from '../webgl/MetalWebGL';

interface MetalProps {
  copy: WorldCopy;
  locale: 'vi' | 'en';
  materials: Array<{
    id: string;
    name: string;
    descriptor: string;
    detail: string;
  }>;
}

/**
 * World 04: METAL (COMPOSE — 7 Crystalline Material Instruments)
 * Upgraded Awwwards WebGL Experience:
 * - 7 3D geometric metallic crystals with Fresnel specular reflections
 * - Real-time dynamic laser connection filaments in 3D space
 * - Crystalline material synthesis monitor
 * - Refined luxury typography
 */
export const Metal: React.FC<MetalProps> = ({ copy, locale, materials: rawMaterials }) => {
  const webglContainerRef = useRef<HTMLDivElement | null>(null);
  const webglInstanceRef = useRef<MetalWebGL | null>(null);
  const [activeMaterial, setActiveMaterial] = useState<string | null>(null);

  useEffect(() => {
    if (webglContainerRef.current) {
      webglInstanceRef.current = new MetalWebGL(webglContainerRef.current);
    }
    return () => {
      webglInstanceRef.current?.destroy();
      webglInstanceRef.current = null;
    };
  }, []);

  return (
    <div id="metal" className="world-stage world-stage--metal" aria-label="World 04: Metal">
      {/* Layer 0: 7 3D Metallic Crystals & Laser Matrix */}
      <div ref={webglContainerRef} className="world-webgl-layer" aria-hidden="true" />
      <div className="world-vignette metal-vignette" aria-hidden="true" />

      {/* Layer 1: Semantic DOM Content & Luxury Typography */}
      <div className="world-content-layer metal-layout">
        <div className="world-editorial-header" aria-hidden="true">
          <span className="world-index-num">04 / METAL</span>
          <span className="world-verb-badge">COMPOSE · KHÍ CỤ SÁNG TẠO</span>
        </div>

        {/* Narrative Context */}
        <div className="world-typography-block metal-typography">
          <p className="world-kicker-text">{copy.kicker}</p>
          <h2 className="world-display-heading">{copy.title}</h2>
          {copy.subtitle && <p className="world-subtitle-text">{copy.subtitle}</p>}
          <div className="world-statement-box">
            <p className="world-statement-text">{copy.statement}</p>
            {copy.secondary && <p className="world-secondary-text">{copy.secondary}</p>}
          </div>

          {/* 7 Material Pills */}
          <div className="metal-pills-row" role="group" aria-label="Material Disciplines">
            {rawMaterials.map((mat) => (
              <button
                key={mat.id}
                type="button"
                className={`metal-pill ${activeMaterial === mat.id ? 'is-active' : ''}`}
                onClick={() => setActiveMaterial(activeMaterial === mat.id ? null : mat.id)}
                aria-label={`${mat.name}: ${mat.descriptor}`}
              >
                <span className="pill-name">{mat.name}</span>
                <span className="pill-desc">{mat.descriptor}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Non-overlapping Tactile Indicator at Bottom */}
        <div className="metal-tactile-footer" aria-hidden="true">
          <span className="tactile-pulse metal-pulse" />
          <span className="tactile-caption">
            {locale === 'vi'
              ? 'Tương tác con trỏ để xoay và kích hoạt liên kết quang học giữa các khối tinh thể'
              : 'Rotate and activate optical laser filaments between crystalline material nodes'}
          </span>
        </div>
      </div>
    </div>
  );
};
