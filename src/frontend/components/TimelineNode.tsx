import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { TimelineMilestone } from '../content/types';
import { cn } from '../lib/utils';

interface TimelineNodeProps {
  milestone: TimelineMilestone;
  expandLabel: string;
  collapseLabel: string;
}

export const TimelineNode: React.FC<TimelineNodeProps> = ({
  milestone,
  expandLabel,
  collapseLabel,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="border-t border-edge-subtle pt-8 pb-10 first:border-t-0 first:pt-0">
      <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-4 lg:gap-8 items-baseline">
        
        {/* Left Column: Period, Year & Location Metadata */}
        <div className="md:col-span-3 lg:col-span-4 space-y-1.5">
          <span className="text-xs font-mono text-accent-amber font-semibold tracking-wider block">
            {milestone.period}
          </span>
          <h3 className="font-heading font-bold text-lg sm:text-xl text-ink-hero tracking-tight">
            {milestone.role}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-ink-muted">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{milestone.location}</span>
          </div>
        </div>

        {/* Right Column: Company, Layer A Observation & Responsibilities */}
        <div className="md:col-span-5 lg:col-span-8 space-y-3.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="font-display font-bold text-base sm:text-lg text-ink-hero uppercase tracking-wide">
              {milestone.company}
            </h4>
            <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-md border border-edge-subtle text-ink-muted">
              {milestone.type}
            </span>
          </div>

          {/* Layer A: Human Observation */}
          <p className="font-body text-sm text-ink-hero/80 italic leading-relaxed border-l-2 border-edge-subtle pl-3.5 my-2">
            "{milestone.observation}"
          </p>

          {/* Layer B: Operational Scope */}
          <p className="text-sm text-ink-body font-normal leading-relaxed">
            {milestone.operationalScope}
          </p>

          {/* Expandable Detailed Operational Logs */}
          {milestone.responsibilities && milestone.responsibilities.length > 0 && (
            <div className="pt-2">
              <button
                type="button"
                id={`milestone-${milestone.id}-btn`}
                onClick={() => setIsExpanded((prev) => !prev)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-amber hover:text-white transition-colors duration-150 py-1 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber"
                aria-expanded={isExpanded}
                aria-controls={`milestone-${milestone.id}-logs`}
              >
                <span>{isExpanded ? collapseLabel : expandLabel}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {isExpanded && (
                <ul
                  id={`milestone-${milestone.id}-logs`}
                  role="region"
                  aria-labelledby={`milestone-${milestone.id}-btn`}
                  className="mt-3 space-y-2 border-l border-edge-subtle/60 pl-4 text-xs sm:text-sm text-ink-body font-light animate-fadeIn"
                >
                  {milestone.responsibilities.map((resp, idx) => (
                    <li key={idx} className="leading-relaxed flex items-start gap-2">
                      <span className="text-accent-amber font-mono text-xs leading-5 select-none" aria-hidden="true">—</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
