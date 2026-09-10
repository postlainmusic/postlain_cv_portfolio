import React from 'react';
import { SkillCategory } from '../content/types';

interface CapabilityCardProps {
  category: SkillCategory;
  index: number;
}

export const CapabilityCard: React.FC<CapabilityCardProps> = ({ category, index }) => {
  return (
    <div className="p-6 sm:p-8 rounded-lg border border-white/10 bg-zinc-900/60 hover:border-accent-amber/40 transition-colors duration-200 flex flex-col justify-between space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>0{index + 1}</span>
          <span className="text-accent-amber font-semibold">● ACTIVE</span>
        </div>
        <h3 className="font-heading font-bold text-lg sm:text-xl text-white tracking-tight">
          {category.title}
        </h3>
      </div>

      <div className="pt-4 border-t border-white/10">
        <div className="flex flex-wrap gap-1.5">
          {category.skills.map((skill: string, idx: number) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-800 border border-white/10 text-zinc-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
