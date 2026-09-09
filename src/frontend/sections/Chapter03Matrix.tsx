import React from 'react';
import { GraduationCap } from 'lucide-react';
import { SiteContent } from '../content/types';
import { EditorialSection } from '../components/EditorialSection';
import { EditorialGrid } from '../components/EditorialGrid';

interface Chapter03Props {
  content: SiteContent['chapter03'];
}

export const Chapter03Matrix: React.FC<Chapter03Props> = ({ content }) => {
  return (
    <EditorialSection id="matrix">
      <div className="space-y-16 sm:space-y-24">
        <div className="max-w-3xl space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-accent-amber">
            {content.index}
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-semibold leading-[0.95] tracking-tight text-ink-hero">
            {content.title}
          </h2>
          <p className="max-w-2xl text-sm sm:text-base leading-7 text-ink-muted">
            {content.subtitle}
          </p>
        </div>

        <EditorialGrid>
          <div className="md:col-span-5 lg:col-span-4">
            <p className="text-lg sm:text-xl leading-8 text-ink-hero">
              {content.layerAObservation}
            </p>
          </div>

          <div className="md:col-span-7 lg:col-span-8 space-y-10">
            <div className="border-t border-edge-subtle">
              {content.capabilities.map((pillar, idx) => (
                <article key={idx} className="grid grid-cols-[2rem_1fr] sm:grid-cols-[3rem_1fr] gap-4 sm:gap-6 py-7 border-b border-edge-subtle">
                  <span className="font-mono text-xs text-ink-muted pt-1">0{idx + 1}</span>
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-semibold text-ink-hero">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-body">
                      {pillar.desc}
                    </p>
                    <p className="mt-4 text-[10px] font-mono uppercase tracking-[0.13em] text-ink-muted">
                      {pillar.skills.join('  /  ')}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <p className="max-w-2xl text-sm sm:text-base leading-7 text-ink-muted italic">
              “{content.transitionText}”
            </p>
          </div>
        </EditorialGrid>

        <div className="border-t border-edge-subtle pt-8">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-ink-muted">
            <GraduationCap className="w-4 h-4 text-accent-amber" />
            <span>{content.educationTitle}</span>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
            {content.education.map((edu, idx) => (
              <article key={idx} className="border-t border-edge-subtle pt-4">
                <div className="flex justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.12em] text-ink-muted">
                  <span>{edu.year}</span>
                  <span>{edu.status}</span>
                </div>
                <h3 className="mt-4 font-heading font-semibold text-base text-ink-hero">{edu.school}</h3>
                <p className="mt-1 text-xs text-ink-body">{edu.major}</p>
                {edu.note && <p className="mt-3 text-[11px] leading-5 text-ink-muted">{edu.note}</p>}
              </article>
            ))}
          </div>
        </div>
      </div>
    </EditorialSection>
  );
};
