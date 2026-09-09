import React, { useState } from 'react';
import { Mail, MapPin, Copy, Check } from 'lucide-react';
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
      <div className="space-y-20 sm:space-y-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <span className="text-xs font-mono text-accent-amber font-semibold tracking-wider uppercase">
              {content.index}
            </span>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 space-y-7">
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-ink-hero tracking-tight leading-[0.98]">
              {content.title}
            </h2>
            <p className="text-lg sm:text-xl text-ink-body leading-relaxed max-w-2xl">
              {content.subtitle}
            </p>
            <p className="text-sm sm:text-base text-ink-muted italic leading-relaxed max-w-xl border-l border-accent-amber pl-5">
              {content.layerAObservation}
            </p>
          </div>
        </div>

        <div className="max-w-4xl ml-auto space-y-10">
          <div className="border-t border-edge-subtle pt-8">
            <p className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-4">
              The cost of caring
            </p>
            <p className="text-2xl sm:text-4xl text-ink-hero leading-tight max-w-3xl">
              Tôi thường mất nhiều thời gian hơn để hoàn thiện một thứ. Vì khi đã nhìn thấy một điểm chưa đúng, rất khó để bỏ qua nó.
            </p>
          </div>

          <EditorialGrid>
            <div className="md:col-span-8 lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-ink-muted">Field-tested</span>
                <p className="text-base sm:text-lg text-ink-body leading-relaxed">
                  {content.layerAObservation}
                </p>
              </div>

              <div className="border-t border-edge-subtle pt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-accent-amber flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider block">{content.locationLabel}</span>
                    <span className="text-sm text-ink-hero">{content.locationAddress}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent-amber flex-shrink-0" />
                  <a href={`mailto:${content.emailAddress}`} className="text-sm text-ink-hero hover:text-accent-amber transition-colors break-all">
                    {content.emailAddress}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(content.emailAddress, 'email')}
                    className="text-xs font-mono text-ink-muted hover:text-ink-hero focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber"
                    aria-label={`Copy email: ${content.emailAddress}`}
                  >
                    {copiedKey === 'email' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 lg:col-span-5">
              <div className="border-t border-edge-subtle pt-6">
                <span className="text-[11px] font-mono text-ink-muted uppercase tracking-widest">{content.hotlineLabel}</span>
                <a href={`tel:${content.hotlineNumber.replace(/[^0-9+]/g, '')}`} className="block mt-2 font-display font-black text-2xl text-ink-hero hover:text-accent-amber transition-colors">
                  {content.hotlineNumber}
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(content.hotlineNumber, 'phone')}
                  className="mt-3 inline-flex items-center gap-2 text-xs font-mono text-ink-muted hover:text-ink-hero focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber"
                >
                  {copiedKey === 'phone' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === 'phone' ? content.copiedNotice : content.copyNotice}
                </button>
              </div>
            </div>
          </EditorialGrid>

          <div className="border-t border-edge-subtle pt-8">
            <span className="text-[11px] font-mono text-ink-muted uppercase tracking-widest block mb-5">Start a conversation</span>
            <ContactForm formContent={content.form} />
          </div>
        </div>
      </div>
    </EditorialSection>
  );
};
