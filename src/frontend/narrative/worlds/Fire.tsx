import React, { useEffect, useRef } from 'react';
import type { WorldCopy } from '../../content/narrativeCopy';
import { FireWebGL } from '../webgl/FireWebGL';

interface FireProps {
  copy: WorldCopy;
  locale: 'vi' | 'en';
  project: {
    name: string;
    url: string;
    status: string;
    description: string;
    action: string;
  };
}

/**
 * World 03: FIRE (REACT — Energy / Singularity / Hidden Music)
 * Upgraded Awwwards WebGL Experience:
 * - Blazing 3D plasma singularity sphere with procedural simplex noise flares
 * - 5,000 thermal ember sparks swirling in convection
 * - Acoustic frequency rings pulsing with harmonic resonance
 * - Ethereal sonic artifact gateway to Hidden Music (zero SaaS cliché)
 */
export const Fire: React.FC<FireProps> = ({ copy, locale, project }) => {
  const webglContainerRef = useRef<HTMLDivElement | null>(null);
  const webglInstanceRef = useRef<FireWebGL | null>(null);

  useEffect(() => {
    if (webglContainerRef.current) {
      webglInstanceRef.current = new FireWebGL(webglContainerRef.current);
    }
    return () => {
      webglInstanceRef.current?.destroy();
      webglInstanceRef.current = null;
    };
  }, []);

  return (
    <div id="fire" className="world-stage world-stage--fire" aria-label="World 03: Fire">
      {/* Layer 0: 3D Plasma Singularity & Thermal Embers */}
      <div ref={webglContainerRef} className="world-webgl-layer" aria-hidden="true" />
      <div className="world-vignette fire-vignette" aria-hidden="true" />

      {/* Layer 1: Semantic DOM Content & Luxury Typography */}
      <div className="world-content-layer fire-layout">
        <div className="fire-editorial-column">
          <div className="world-editorial-header" aria-hidden="true">
            <span className="world-index-num">03 / FIRE</span>
            <span className="world-verb-badge">REACT · KHÔNG GIAN NĂNG LƯỢNG</span>
          </div>

          <div className="world-typography-block fire-typography">
            <p className="world-kicker-text">{copy.kicker}</p>
            <h2 className="world-display-heading">{copy.title}</h2>
            {copy.subtitle && <p className="world-subtitle-text">{copy.subtitle}</p>}
            <div className="world-statement-box">
              <p className="world-statement-text">{copy.statement}</p>
              {copy.secondary && <p className="world-secondary-text">{copy.secondary}</p>}
            </div>
          </div>
        </div>

        {/* Ethereal Living Artifact: Hidden Music (Art-Directed Editorial Gateway) */}
        <div className="hidden-music-portal" role="region" aria-label="Hidden Music Artifact Gateway">
          <div className="portal-glass-panel">
            <div className="portal-status-badge">
              <span className="portal-status-dot" />
              <span>{project.status}</span>
            </div>

            <h3 className="portal-title">{project.name.toUpperCase()}</h3>
            <p className="portal-description">{project.description}</p>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="portal-action-btn"
              aria-label={`${project.action} - ${project.name}`}
            >
              <span className="action-txt">{project.action}</span>
              <span className="action-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* Non-overlapping Tactile Indicator at Bottom */}
        <div className="fire-tactile-footer" aria-hidden="true">
          <span className="tactile-pulse fire-pulse" />
          <span className="tactile-caption">
            {locale === 'vi'
              ? 'Rê chuột về phía điểm kỳ dị năng lượng để kích hoạt cộng hưởng sóng hài âm thanh'
              : 'Pull toward the energy singularity to excite harmonic audio resonance'}
          </span>
        </div>
      </div>
    </div>
  );
};
