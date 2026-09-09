import React from 'react';
import { SiteContent } from '../content/types';
import { EditorialSection } from '../components/EditorialSection';
import { TimelineNode } from '../components/TimelineNode';

interface Chapter01Props {
  content: SiteContent['chapter01'];
}

export const Chapter01Orchestration: React.FC<Chapter01Props> = ({ content }) => {
  return (
    <EditorialSection id="orchestration">
      <div className="space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-accent-amber font-semibold tracking-wider uppercase">
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

        {/* Chronological Timeline Nodes (2019 - 2026) */}
        <div className="space-y-0">
          {content.milestones.map((milestone) => (
            <TimelineNode
              key={milestone.id}
              milestone={milestone}
              expandLabel={content.expandLogsLabel}
              collapseLabel={content.collapseLogsLabel}
            />
          ))}
        </div>

        {/* Narrative Transition Bridge */}
        <div className="pt-6 border-t border-edge-subtle text-xs font-mono text-ink-muted italic">
          <span>→ {content.transitionText}</span>
        </div>

      </div>
    </EditorialSection>
  );
};
