import React, { useState } from 'react';
import type { WorldCopy } from '../../content/narrativeCopy';

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

export const Earth: React.FC<EarthProps> = ({ copy, locale, brand, onRestart }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(brand.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="earth" className="world-stage world-stage--earth" aria-label="World 05: Earth">
      <div className="earth-warm-glow" aria-hidden="true" />
      <div className="earth-subtle-grain" aria-hidden="true" />

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
              <span className="email-arrow">→</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="earth-copy-btn"
              aria-label="Copy email address"
            >
              {copied
                ? (locale === 'vi' ? 'Đã sao chép email' : 'Copied to clipboard')
                : (locale === 'vi' ? 'Sao chép' : 'Copy address')}
            </button>
          </div>

          <div className="earth-footer-meta">
            <span className="meta-item">© 2026 POSTLAIN</span>
            <span className="meta-separator">·</span>
            <span className="meta-item">ALL DISCIPLINES CONVERGE INTO ART</span>
            <span className="meta-separator">·</span>
            {onRestart && (
              <button type="button" onClick={onRestart} className="earth-restart-btn">
                {locale === 'vi' ? 'Khởi động lại từ Hư Không (00)' : 'Return to Void (00)'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
