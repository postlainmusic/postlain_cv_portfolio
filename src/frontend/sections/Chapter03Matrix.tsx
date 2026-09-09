import React from 'react';
import { GraduationCap, Award } from 'lucide-react';
import { SiteContent } from '../content/types';
import { EditorialSection } from '../components/EditorialSection';
import { CapabilityCard } from '../components/CapabilityCard';

interface Chapter03Props {
  content: SiteContent['chapter03'];
}

export const Chapter03Matrix: React.FC<Chapter03Props> = ({ content }) => {
  return (
    <EditorialSection id="matrix">
      <div className="space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-accent-amber font-semibold tracking-wider uppercase">
            <Award className="w-3.5 h-3.5" />
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

        {/* 3 Core Capability Pillars */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase text-ink-muted tracking-wider font-semibold">
            {content.capabilitiesTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.capabilities.map((pillar, idx) => (
              <CapabilityCard key={idx} pillar={pillar} index={idx} />
            ))}
          </div>
        </div>

        {/* Academic Foundation Ledger */}
        <div className="space-y-6 pt-6 border-t border-edge-subtle">
          <div className="flex items-center gap-2 text-xs font-mono text-ink-muted tracking-wider uppercase font-semibold">
            <GraduationCap className="w-4 h-4 text-accent-amber" />
            <span>{content.educationTitle}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-edge-subtle bg-bg-surface space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-accent-amber font-semibold">{edu.year}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase border border-edge-subtle text-ink-muted">
                    {edu.status}
                  </span>
                </div>
                <h4 className="font-heading font-bold text-base text-ink-hero">
                  {edu.school}
                </h4>
                <p className="text-xs text-ink-body font-medium">
                  {edu.major}
                </p>
                {edu.note && (
                  <p className="text-[11px] text-ink-muted leading-relaxed border-t border-edge-subtle/50 pt-2">
                    {edu.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Narrative Transition Bridge */}
        <div className="pt-6 border-t border-edge-subtle text-xs font-mono text-ink-muted italic">
          <span>→ {content.transitionText}</span>
        </div>

      </div>
    </EditorialSection>
  );
};
