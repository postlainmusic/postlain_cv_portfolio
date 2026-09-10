import React from 'react';
import { GraduationCap, Award, Heart, CheckCircle2 } from 'lucide-react';
import { SiteContent } from '../content/types';

interface Chapter03Props {
  content: SiteContent['chapter03'];
}

export const Chapter03Matrix: React.FC<Chapter03Props> = ({ content }) => {
  return (
    <section id="skills-education" className="py-20 sm:py-28 border-b border-white/10">
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

        {/* Skills & Strengths Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent-amber font-bold">
            <Award className="w-4 h-4" />
            <span>{content.skillsTitle}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.skillCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-zinc-900/70 border border-white/10 space-y-4 hover:border-accent-amber/30 transition-colors"
              >
                <h3 className="text-lg font-bold text-white flex items-center justify-between">
                  <span>{cat.title}</span>
                  <span className="text-xs font-mono text-accent-amber">0{idx + 1}</span>
                </h3>
                <ul className="space-y-2.5">
                  {cat.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-accent-amber flex-shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div className="space-y-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent-amber font-bold">
            <GraduationCap className="w-4 h-4" />
            <span>{content.educationTitle}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-zinc-900/50 border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-accent-amber/10 border border-accent-amber/30 text-accent-amber font-bold">
                    {edu.year}
                  </span>
                  <span className="text-zinc-400 uppercase tracking-wider">{edu.status}</span>
                </div>
                <h4 className="text-lg font-bold text-white">{edu.school}</h4>
                <p className="text-sm font-medium text-accent-amber">{edu.major}</p>
                {edu.note && <p className="text-xs text-zinc-400 leading-relaxed">{edu.note}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Hobbies / Personal Interests */}
        <div className="p-6 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent-amber font-bold">
            <Heart className="w-4 h-4 text-accent-amber" />
            <span>{content.hobbiesTitle}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {content.hobbies.map((hobby, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
