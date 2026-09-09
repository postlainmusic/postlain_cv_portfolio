import React, { useState } from 'react';
import { Mail, MapPin, Copy, Check, Send } from 'lucide-react';
import { SiteContent } from '../content/types';
import { EditorialSection } from '../components/EditorialSection';
import { EditorialGrid } from '../components/EditorialGrid';
import { ContactForm } from '../components/ContactForm';

interface Chapter04Props {
  content: SiteContent['chapter04'];
}

export const Chapter04Transmission: React.FC<Chapter04Props> = ({ content }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (text: string, key: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for non-secure / restricted contexts
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      setCopiedKey(null);
    }
  };

  return (
    <EditorialSection id="transmission">
      <div className="space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-accent-amber font-semibold tracking-wider uppercase">
            <Send className="w-3.5 h-3.5" />
            <span>{content.index}</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-ink-hero tracking-tight uppercase">
            {content.title}
          </h2>
          <p className="text-sm sm:text-base text-ink-muted">
            {content.subtitle}
          </p>
          <p className="text-sm text-ink-hero/80 italic border-l-2 border-edge-subtle pl-3.5 pt-1 max-w-2xl">
            "{content.layerAObservation}"
          </p>
        </div>

        {/* Live Screen Reader Announcement for Copy */}
        <div aria-live="polite" className="sr-only">
          {copiedKey ? content.copiedNotice : ''}
        </div>

        {/* Contact Grid */}
        <EditorialGrid>
          
          {/* Left Column: Direct Access Cards (Hotline & Email) */}
          <div className="md:col-span-8 lg:col-span-5 space-y-4">
            
            {/* Direct Phone / Hotline Card */}
            <div className="p-6 rounded-lg border border-edge-subtle bg-bg-surface space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-accent-amber font-semibold uppercase">
                  {content.hotlineLabel}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy('0938649420', 'phone')}
                  className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-mono text-ink-muted hover:text-ink-hero hover:bg-bg-elevated transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber"
                  aria-label={`Copy hotline: ${content.hotlineNumber}`}
                >
                  {copiedKey === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-accent-amber" />
                      <span className="text-accent-amber font-semibold">{content.copiedNotice}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{content.copyNotice}</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={`tel:${content.hotlineNumber.replace(/[^0-9+]/g, '')}`}
                className="font-display font-black text-2xl sm:text-3xl text-ink-hero tracking-tight hover:text-accent-amber transition-colors block"
              >
                {content.hotlineNumber}
              </a>

              <p className="text-xs text-ink-muted leading-relaxed">
                Hỗ trợ gọi trực tiếp hoặc kết nối qua Zalo / Telegram / WhatsApp.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="p-6 rounded-lg border border-edge-subtle bg-bg-surface space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-accent-amber font-semibold uppercase">
                  {content.emailLabel}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(content.emailAddress, 'email')}
                  className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-mono text-ink-muted hover:text-ink-hero hover:bg-bg-elevated transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber"
                  aria-label={`Copy email: ${content.emailAddress}`}
                >
                  {copiedKey === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-accent-amber" />
                      <span className="text-accent-amber font-semibold">{content.copiedNotice}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{content.copyNotice}</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={`mailto:${content.emailAddress}`}
                className="font-display font-bold text-lg sm:text-xl text-ink-hero tracking-tight hover:text-accent-amber transition-colors block break-all"
              >
                {content.emailAddress}
              </a>

              <p className="text-xs text-ink-muted leading-relaxed">
                Phản hồi email trao đổi công việc trong vòng 24 giờ.
              </p>
            </div>

            {/* Location Anchor */}
            <div className="p-5 rounded-lg border border-edge-subtle bg-bg-surface/60 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-accent-amber flex-shrink-0 mt-0.5" />
              <div className="text-xs space-y-0.5">
                <span className="font-mono text-ink-muted uppercase block">{content.locationLabel}</span>
                <span className="text-ink-hero font-medium">{content.locationAddress}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Edge Contact Dispatch Form */}
          <div className="md:col-span-8 lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-lg border border-edge-subtle bg-bg-surface space-y-6">
              <div>
                <span className="text-xs font-mono text-accent-amber uppercase font-semibold block mb-1">
                  DIRECT DISPATCH // EDGE API
                </span>
                <h3 className="font-heading font-bold text-xl text-ink-hero">
                  {content.title}
                </h3>
              </div>

              <ContactForm formContent={content.form} />
            </div>
          </div>

        </EditorialGrid>

      </div>
    </EditorialSection>
  );
};

