import React, { useEffect, useRef, useState } from 'react';
import type { WorldCopy } from '../../content/narrativeCopy';
import { EarthWebGL } from '../webgl/EarthWebGL';

interface EarthProps {
  copy: WorldCopy;
  locale: 'vi' | 'en';
  brand: {
    entity: string;
    person: string;
    tagline: string;
    email: string;
  };
  onRestart?: () => void;
}

/**
 * World 05: EARTH (SETTLE — Density / Human Ground)
 * Upgraded Awwwards WebGL Experience:
 * - 6,000 3D golden sedimentation particles gently falling in laminar flow
 * - Timeless luxury typography revealing NGÔ PHÚC / POSTLAIN
 * - Direct contact gateway and ouroboros loop back to Void
 */
export const Earth: React.FC<EarthProps> = ({ copy, locale, brand, onRestart }) => {
  const webglContainerRef = useRef<HTMLDivElement | null>(null);
  const webglInstanceRef = useRef<EarthWebGL | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (webglContainerRef.current) {
      webglInstanceRef.current = new EarthWebGL(webglContainerRef.current);
    }
    return () => {
      webglInstanceRef.current?.destroy();
      webglInstanceRef.current = null;
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(brand.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <div id="earth" className="world-stage world-stage--earth" aria-label="World 05: Earth">
      {/* Layer 0: 3D Golden Sedimentation & Mineral Bedrock Depth */}
      <div ref={webglContainerRef} className="world-webgl-layer" aria-hidden="true" />
      <div className="world-vignette earth-vignette" aria-hidden="true" />

      {/* Layer 1: Semantic DOM Content & Luxury Typography */}
      <div className="world-content-layer earth-layout">
        <div className="world-editorial-header" aria-hidden="true">
          <span className="world-index-num">05 / EARTH</span>
          <span className="world-verb-badge">SETTLE · ĐIỂM TỰA BẢN NGUYÊN</span>
        </div>

        {/* Quiet Human Reveal */}
        <div className="earth-identity-block">
          <p className="earth-kicker">{copy.kicker}</p>
          <div className="earth-person-name">
            <span className="name-primary">{brand.person}</span>
            <span className="name-entity">[{brand.entity}]</span>
          </div>
          <p className="earth-tagline">{brand.tagline}</p>

          <div className="earth-narrative-prose">
            <p className="prose-statement">{copy.statement}</p>
            {copy.secondary && <p className="prose-secondary">{copy.secondary}</p>}
          </div>

          {/* Contact & Frequency Channels */}
          <div className="earth-actions">
            <a
              href={`mailto:${brand.email}`}
              className="earth-email-button"
              aria-label={`Send email to ${brand.email}`}
            >
              <span className="email-label">{brand.email}</span>
              <span className="email-arrow" aria-hidden="true">
                →
              </span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="earth-copy-btn"
              aria-label="Copy email address to clipboard"
            >
              {copied
                ? locale === 'vi'
                  ? 'Đã sao chép email'
                  : 'Copied to clipboard'
                : locale === 'vi'
                ? 'Sao chép'
                : 'Copy address'}
            </button>
          </div>

          {/* Settle Ground Footer & Ouroboros Loop */}
          <div className="earth-footer-meta">
            <span className="meta-item">© 2026 POSTLAIN</span>
            <span className="meta-separator" aria-hidden="true">
              ·
            </span>
            <span className="meta-item">ALL DISCIPLINES CONVERGE INTO ART</span>
            <span className="meta-separator" aria-hidden="true">
              ·
            </span>
            {onRestart && (
              <button
                type="button"
                onClick={onRestart}
                className="earth-restart-btn"
                aria-label="Return to beginning (World 00: Void)"
              >
                {locale === 'vi' ? 'Khởi động lại từ Hư Không (00)' : 'Return to Void (00)'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
