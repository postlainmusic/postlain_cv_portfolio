import React from 'react';
import { PillarItem } from '../content/types';

interface CapabilityCardProps {
  pillar: PillarItem;
  index: number;
}

export const CapabilityCard: React.FC<CapabilityCardProps> = ({ pillar, index }) => {
  return (
    <div className="p-6 sm:p-8 rounded-lg border border-edge-subtle bg-bg-surface hover:border-edge-active transition-colors duration-200 flex flex-col justify-between space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-ink-muted">
          <span>PILLAR // 0{index + 1}</span>
          <span className="text-accent-amber font-semibold">● ACTIVE</span>
        </div>
        <h3 className="font-heading font-bold text-lg sm:text-xl text-ink-hero tracking-tight">
          {pillar.title}
        </h3>
        <p className="text-xs sm:text-sm text-ink-body font-normal leading-relaxed">
          {pillar.desc}
        </p>
      </div>

      <div className="pt-4 border-t border-edge-subtle/50">
        <div className="flex flex-wrap gap-1.5">
          {pillar.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-bg-elevated border border-edge-subtle text-ink-body"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
