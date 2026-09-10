import React from 'react';
import { Briefcase, Building2, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { SiteContent, TimelineMilestone } from '../content/types';

interface Chapter01Props {
  content: SiteContent['chapter01'];
}

export const Chapter01Orchestration: React.FC<Chapter01Props> = ({ content }) => {
  return (
    <section id="milestones" className="py-20 sm:py-28 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold tracking-widest text-accent-amber uppercase">
            {content.index}
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            {content.title}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400">
            {content.subtitle}
          </p>
        </div>

        {/* Milestones Flow */}
        <div className="space-y-8">
          {content.milestones.map((milestone, idx) => (
            <article
              key={milestone.id}
              className="p-6 sm:p-8 rounded-xl bg-zinc-900/70 border border-white/10 hover:border-accent-amber/40 transition-all duration-200 space-y-6"
            >
              {/* Milestone Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-accent-amber font-bold">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>0{idx + 1} // {milestone.period}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {milestone.role}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white font-semibold">
                    <Building2 className="w-3 h-3 text-accent-amber" />
                    {milestone.company}
                  </span>
                  <span className="inline-flex items-center gap-1 text-zinc-400">
                    <MapPin className="w-3 h-3" />
                    {milestone.location}
                  </span>
                </div>
              </div>

              {/* Responsibilities list */}
              <div className="space-y-3">
                <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  Nhiệm Vụ & Trách Nhiệm Trọng Tâm:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {milestone.responsibilities.map((item, respIdx) => (
                    <div
                      key={respIdx}
                      className="flex items-start gap-2.5 text-sm text-zinc-200 leading-relaxed bg-black/30 p-3 rounded border border-white/5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent-amber flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-Roles / Specific Phases if available */}
              {milestone.subRoles && milestone.subRoles.length > 0 && (
                <div className="pt-4 border-t border-white/5 space-y-4">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Các Giai Đoạn Đảm Nhiệm:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {milestone.subRoles.map((sub, sIdx) => (
                      <div key={sIdx} className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono text-accent-amber">
                          <span className="font-bold">{sub.role}</span>
                          <span className="text-zinc-400">{sub.period}</span>
                        </div>
                        <ul className="space-y-1.5">
                          {sub.details.map((d, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300 leading-normal">
                              <ChevronRight className="w-3 h-3 text-accent-amber flex-shrink-0 mt-0.5" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
