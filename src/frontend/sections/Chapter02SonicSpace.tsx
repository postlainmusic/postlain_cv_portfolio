import React from 'react';
import { ExternalLink, Disc3 } from 'lucide-react';
import { SiteContent } from '../content/types';
import { EditorialSection } from '../components/EditorialSection';
import { EditorialGrid } from '../components/EditorialGrid';

interface Chapter02Props {
  content: SiteContent['chapter02'];
}

export const Chapter02SonicSpace: React.FC<Chapter02Props> = ({ content }) => {
  return (
    <EditorialSection id="sonic-space">
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

        <EditorialGrid>
          <div className="md:col-span-8 lg:col-span-7 space-y-10">
            <div className="space-y-5 max-w-2xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-ink-muted">
                Built after hours
              </span>
              <h3 className="font-display font-black text-3xl sm:text-5xl text-ink-hero tracking-tight leading-none">
                {content.ventureName}
              </h3>
              <p className="text-base sm:text-lg text-ink-body leading-relaxed">
                {content.ventureDescription}
              </p>
              <a
                href={content.ventureUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-heading font-bold text-ink-hero underline decoration-edge-subtle underline-offset-4 hover:text-accent-amber hover:decoration-accent-amber transition-colors"
              >
                <span>{content.listeningRoom.visitPlatformBtn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="border-t border-edge-subtle pt-8 space-y-8">
              {content.pillars.map((pillar, idx) => (
                <article key={idx} className="grid grid-cols-[2rem_1fr] sm:grid-cols-[3rem_1fr] gap-4 sm:gap-6">
                  <span className="font-mono text-xs text-accent-amber pt-1">0{idx + 1}</span>
                  <div className="space-y-2">
                    <h4 className="font-heading font-bold text-lg text-ink-hero">{pillar.title}</h4>
                    <p className="text-sm text-ink-muted leading-relaxed max-w-xl">{pillar.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="md:col-span-8 lg:col-span-5 lg:pt-24">
            <div className="border-y border-edge-subtle py-6 sm:py-8 space-y-5">
              <div className="flex items-center gap-3 text-xs font-mono text-accent-amber">
                <Disc3 className="w-4 h-4" />
                <span>{content.listeningRoom.title}</span>
              </div>
              <div>
                <h4 className="font-heading font-bold text-xl text-ink-hero leading-snug">
                  {content.listeningRoom.trackTitle}
                </h4>
                <p className="text-xs text-ink-muted mt-2">{content.listeningRoom.trackMeta}</p>
              </div>
              <p className="text-sm text-ink-body leading-relaxed">
                {content.listeningRoom.audioNotice}
              </p>
            </div>
          </aside>
        </EditorialGrid>

        <div className="max-w-2xl ml-auto border-l border-accent-amber pl-5">
          <p className="text-xl sm:text-2xl text-ink-hero leading-snug">{content.transitionText}</p>
        </div>
      </div>
    </EditorialSection>
  );
};
