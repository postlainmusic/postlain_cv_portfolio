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

        <div className="max-w-5xl ml-auto">
          <div className="mb-8 sm:mb-12 flex items-baseline justify-between gap-6 border-b border-edge-subtle pb-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-ink-muted">
              Field record
            </span>
            <span className="text-[11px] font-mono text-ink-muted">
              2019 / 2026
            </span>
          </div>
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          <div className="lg:col-span-4 text-xs font-mono text-ink-muted uppercase tracking-widest">
            What the floor teaches
          </div>
          <p className="lg:col-span-7 lg:col-start-6 text-xl sm:text-2xl text-ink-hero leading-snug">
            {content.transitionText}
          </p>
        </div>
      </div>
    </EditorialSection>
  );
};
