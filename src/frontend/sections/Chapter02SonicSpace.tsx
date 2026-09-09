import React from 'react';
import { ExternalLink, Disc3, Radio } from 'lucide-react';
import { SiteContent } from '../content/types';
import { EditorialSection } from '../components/EditorialSection';
import { EditorialGrid } from '../components/EditorialGrid';
import { CapabilityCard } from '../components/CapabilityCard';
import { EditorialMediaSlot } from '../components/EditorialMediaSlot';

interface Chapter02Props {
  content: SiteContent['chapter02'];
}

export const Chapter02SonicSpace: React.FC<Chapter02Props> = ({ content }) => {
  return (
    <EditorialSection id="sonic-space">
      <div className="space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-accent-amber font-semibold tracking-wider uppercase">
            <Radio className="w-3.5 h-3.5" />
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

        {/* Venture Showcase Grid */}
        <EditorialGrid>
          
          {/* Left Column: Venture Overview & Pillars */}
          <div className="md:col-span-8 lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-lg border border-edge-subtle bg-bg-surface space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-mono text-accent-cyan uppercase font-semibold">
                  ACTIVE VENTURE // DIGITAL PLATFORM
                </span>
                <span className="text-[11px] font-mono text-ink-muted">
                  FOUNDED & OPERATED BY POSTLAIN
                </span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-ink-hero tracking-tight">
                {content.ventureName}
              </h3>

              <p className="text-sm text-ink-body font-normal leading-relaxed">
                {content.ventureDescription}
              </p>

              <div className="pt-2">
                <a
                  href={content.ventureUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-accent-amber text-bg-base font-heading font-bold text-xs uppercase tracking-wider hover:bg-white transition-all duration-150"
                >
                  <span>{content.listeningRoom.visitPlatformBtn}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Creative Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {content.pillars.map((pillar, idx) => (
                <div key={idx} className="p-4 rounded-md border border-edge-subtle bg-bg-surface space-y-2">
                  <span className="text-[10px] font-mono text-accent-amber font-bold uppercase">
                    0{idx + 1} // FOCUS
                  </span>
                  <h4 className="font-heading font-bold text-sm text-ink-hero">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Media Slot / The Listening Room */}
          <div className="md:col-span-8 lg:col-span-5 space-y-6">
            <EditorialMediaSlot
              aspectRatio="4/3"
              title="ACOUSTIC ENGINEERING"
              category="DA LAT SOUND LAB"
              caption="Fig 02 // Waveform arrangement, studio monitoring, and release pipelines."
            />

            {/* Listening Room Metadata Card */}
            <div className="p-5 rounded-md border border-edge-subtle bg-bg-surface space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-accent-amber font-semibold">
                <Disc3 className="w-4 h-4 text-accent-amber" />
                <span>{content.listeningRoom.title}</span>
              </div>
              <p className="text-xs text-ink-body leading-relaxed">
                {content.listeningRoom.audioNotice}
              </p>
            </div>
          </div>

        </EditorialGrid>

        {/* Narrative Transition Bridge */}
        <div className="pt-6 border-t border-edge-subtle text-xs font-mono text-ink-muted italic">
          <span>→ {content.transitionText}</span>
        </div>

      </div>
    </EditorialSection>
  );
};
