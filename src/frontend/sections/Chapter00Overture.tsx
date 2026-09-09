import React from 'react';
import { ArrowDown, Mail, MapPin } from 'lucide-react';
import { SiteContent } from '../content/types';
import { EditorialSection } from '../components/EditorialSection';
import { EditorialGrid } from '../components/EditorialGrid';
import { EditorialMediaSlot } from '../components/EditorialMediaSlot';

interface Chapter00Props {
  content: SiteContent['chapter00'];
}

export const Chapter00Overture: React.FC<Chapter00Props> = ({ content }) => {
  return (
    <EditorialSection id="overture" borderTop={false} className="pt-12 sm:pt-20 lg:pt-28 pb-16 sm:pb-24">
      <EditorialGrid>
        
        {/* Left Column: Index, Thesis & Recruiter Summary */}
        <div className="md:col-span-8 lg:col-span-7 space-y-6 sm:space-y-8">
          
          {/* Status Capsule / Index */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="text-accent-amber font-semibold">{content.index}</span>
            <span className="text-ink-muted">/</span>
            <span className="text-ink-muted flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-accent-amber" />
              {content.locationAnchor}
            </span>
          </div>

          {/* Master Display Wordmark & Heading (Single H1) */}
          <div className="space-y-2">
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-ink-hero tracking-tighter uppercase leading-[0.92]">
              {content.name}
            </h1>
            <p className="font-mono text-sm sm:text-base text-accent-amber font-semibold tracking-wider uppercase">
              {content.title}
            </p>
          </div>

          {/* Master Thesis (Philosophical Tension) */}
          <div className="border-l-2 border-accent-amber pl-4 sm:pl-6 py-1 space-y-1">
            <p className="font-heading font-bold text-xl sm:text-3xl text-ink-hero tracking-tight">
              {content.thesisTop}
            </p>
            <p className="font-heading font-bold text-xl sm:text-3xl text-accent-amber tracking-tight">
              {content.thesisBottom}
            </p>
          </div>

          {/* Layer A Observation */}
          <p className="font-body text-sm sm:text-base text-ink-body font-light leading-relaxed max-w-2xl">
            "{content.layerAObservation}"
          </p>

          {/* Layer B Recruiter Scannable Summary */}
          <div className="p-4 sm:p-5 rounded-md border border-edge-subtle bg-bg-surface space-y-2 max-w-2xl">
            <span className="text-[10px] font-mono uppercase text-accent-amber font-bold tracking-widest block">
              RECRUITER SUMMARY // 2026 STATUS
            </span>
            <p className="text-xs sm:text-sm text-ink-hero font-normal leading-relaxed">
              {content.recruiterSummary}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <a
              href="#orchestration"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-accent-amber text-bg-base font-heading font-bold text-xs uppercase tracking-wider hover:bg-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 ease-tactile"
            >
              <span>{content.ctaRecord}</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <a
              href="#transmission"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-edge-subtle bg-bg-surface text-ink-hero font-heading font-bold text-xs uppercase tracking-wider hover:border-edge-active hover:bg-bg-elevated hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 ease-tactile"
            >
              <span>{content.ctaContact}</span>
              <Mail className="w-3.5 h-3.5 text-accent-amber" />
            </a>
          </div>

        </div>

        {/* Right Column: Architectural Frequency Diagram / Media Slot */}
        <div className="md:col-span-8 lg:col-span-5 pt-6 lg:pt-0">
          <EditorialMediaSlot
            aspectRatio="4/3"
            title="THE OPERATING FREQUENCY"
            category="CHAPTER 00 ARCHIVAL"
            caption="Fig 01 // Convergence of physical workflow choreography and acoustic balance."
          />
        </div>

      </EditorialGrid>
    </EditorialSection>
  );
};
