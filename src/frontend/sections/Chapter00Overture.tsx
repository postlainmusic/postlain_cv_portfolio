import React from 'react';
import { ArrowDown, Mail, MapPin } from 'lucide-react';
import { SiteContent } from '../content/types';
import { EditorialSection } from '../components/EditorialSection';
import { EditorialGrid } from '../components/EditorialGrid';

interface Chapter00Props {
  content: SiteContent['chapter00'];
}

export const Chapter00Overture: React.FC<Chapter00Props> = ({ content }) => {
  return (
    <EditorialSection id="overture" borderTop={false} className="pt-16 sm:pt-24 lg:pt-32 pb-20 sm:pb-28">
      <EditorialGrid>
        <div className="md:col-span-8 lg:col-span-7">
          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-ink-muted">
            <span className="text-accent-amber">{content.index}</span>
            <span aria-hidden="true">/</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {content.locationAnchor}
            </span>
          </div>

          <div className="mt-16 sm:mt-24 lg:mt-32 max-w-4xl">
            <h1 className="font-display font-black text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.82] tracking-[-0.055em] text-ink-hero">
              {content.name}
            </h1>
            <p className="mt-5 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-accent-amber">
              {content.title}
            </p>
          </div>

          <div className="mt-14 sm:mt-20 max-w-2xl border-l border-accent-amber pl-5 sm:pl-7">
            <p className="font-heading text-xl sm:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight text-ink-hero">
              {content.thesisTop}
            </p>
            <p className="mt-1 font-heading text-xl sm:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight text-ink-muted">
              {content.thesisBottom}
            </p>
          </div>

          <p className="mt-12 sm:mt-16 max-w-xl text-sm sm:text-base leading-7 text-ink-body">
            {content.layerAObservation}
          </p>

          <div className="mt-12 sm:mt-16 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="#orchestration"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.14em] text-ink-hero hover:text-accent-amber transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber focus-visible:outline-offset-4"
            >
              {content.ctaRecord}
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href="#transmission"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.14em] text-ink-muted hover:text-ink-hero transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber focus-visible:outline-offset-4"
            >
              {content.ctaContact}
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <aside className="hidden lg:flex lg:col-span-5 lg:items-end lg:pb-3">
          <div className="w-full border-t border-edge-subtle pt-4">
            <div className="flex justify-between text-[10px] font-mono uppercase tracking-[0.16em] text-ink-muted">
              <span>Da Lat</span>
              <span>01 / 08</span>
            </div>
            <p className="mt-8 max-w-xs ml-auto text-sm leading-6 text-ink-muted">
              {content.transitionText}
            </p>
          </div>
        </aside>
      </EditorialGrid>
    </EditorialSection>
  );
};
