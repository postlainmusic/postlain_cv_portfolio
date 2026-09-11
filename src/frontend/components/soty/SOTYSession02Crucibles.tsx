import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { APPLE_CONTENT, CareerMilestone } from '../../content/appleContent';
import { AppleAudio } from '../../audio/AppleHapticAudio';

interface SOTYSession02CruciblesProps {
  lang: 'vi' | 'en';
  onNext: () => void;
  onPrev: () => void;
  isActive: boolean;
}

export const SOTYSession02Crucibles: React.FC<SOTYSession02CruciblesProps> = ({
  lang,
  onNext,
  onPrev,
  isActive,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const data = APPLE_CONTENT.milestonesHeader;
  const milestones = APPLE_CONTENT.milestones;
  const activeMilestone: CareerMilestone = milestones[activeIdx];

  // Session entrance animation
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.crucible-anim',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.05,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive, lang]);

  // Station switch cross-fade
  useEffect(() => {
    if (!isActive || !detailRef.current) return;
    gsap.fromTo(
      detailRef.current,
      { opacity: 0.2, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
    );
  }, [activeIdx, isActive]);

  const handleSelectMilestone = (idx: number) => {
    AppleAudio.playClick(1400 + idx * 100, 0.015);
    setActiveIdx(idx);
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full flex flex-col justify-between px-6 sm:px-16 lg:px-24 pt-24 pb-8 transition-opacity duration-500 overflow-hidden ${
        isActive ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'
      }`}
    >
      {/* Top Architectural Header */}
      <div className="w-full max-w-7xl mx-auto space-y-2 border-b border-white/10 pb-4">
        <div className="crucible-anim flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-amber-400 uppercase font-bold">
              {data.sectionBadge}
            </span>
          </div>
          <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-500 hidden sm:inline">
            [ VERIFIED CAREER RUNWAY ]
          </span>
        </div>

        <div className="crucible-anim flex flex-col md:flex-row md:items-end justify-between gap-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase leading-[1.05]">
            {data.title[lang]}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-md">
            {data.subtitle[lang]}
          </p>
        </div>
      </div>

      {/* 4 Architectural Line-Item Stations (Zero Card Boxes) */}
      <div className="crucible-anim w-full max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 my-2 border-b border-white/10 pb-3">
        {milestones.map((m, idx) => (
          <button
            key={m.id}
            type="button"
            onClick={() => handleSelectMilestone(idx)}
            className={`text-left transition-all duration-300 flex flex-col justify-between space-y-1 py-1 border-l-2 pl-3 ${
              activeIdx === idx
                ? 'border-amber-400 text-white'
                : 'border-white/10 text-zinc-500 hover:text-zinc-300 hover:border-white/30'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono tracking-wider">
              <span className={activeIdx === idx ? 'text-amber-400 font-bold' : ''}>[ 0{idx + 1} // 04 ]</span>
              <span className="text-[10px]">{m.period.split('—')[0]}</span>
            </div>
            <p className="text-xs font-display font-bold uppercase truncate tracking-tight">
              {m.company}
            </p>
          </button>
        ))}
      </div>

      {/* Active Milestone Spec Projection Area (Zero Cards) */}
      <div className="w-full max-w-7xl mx-auto my-auto py-2">
        <div ref={detailRef} className="space-y-4">
          {/* Milestone Headline & Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-3">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono tracking-[0.25em] text-amber-400 font-bold uppercase">
                  {activeMilestone.badge}
                </span>
                <span className="text-zinc-600">//</span>
                <span className="text-xs font-mono text-zinc-400">{activeMilestone.company}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white uppercase tracking-tight">
                {activeMilestone.role[lang]}
              </h3>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 tracking-wider">
              <span>{activeMilestone.period}</span>
              <span className="text-zinc-600">//</span>
              <span>{activeMilestone.location[lang]}</span>
            </div>
          </div>

          {/* Core Value Quote */}
          <div className="border-l border-amber-400/50 pl-4 py-0.5">
            <p className="text-xs sm:text-sm font-body italic text-zinc-200 leading-relaxed font-light">
              "{activeMilestone.coreValue[lang]}"
            </p>
          </div>

          {/* 4 Verified Responsibilities in 2 Clean Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2.5 pt-1">
            {activeMilestone.responsibilities[lang].map((resp, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs font-mono text-zinc-300">
                <span className="text-amber-400/80 font-bold shrink-0">0{idx + 1} //</span>
                <span className="leading-relaxed">{resp}</span>
              </div>
            ))}
          </div>

          {/* Technical Spec Tags */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-3 text-[10px] font-mono text-zinc-500 tracking-wider">
            {activeMilestone.specTags.map((tag) => (
              <span key={tag} className="hover:text-zinc-300 transition-colors">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between pt-4 border-t border-white/10">
        <div className="text-xs font-mono text-zinc-500 hidden sm:inline tracking-wider">
          [ 4 / 4 CỘT MỐC ĐÃ XÁC THỰC PROFILE_NGOPHUC.MD ]
        </div>

        <div className="crucible-anim flex items-center gap-3">
          <button
            type="button"
            onClick={onPrev}
            className="p-2.5 rounded-full border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition-colors"
            title="Quay lại"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-white text-black hover:bg-amber-300 font-mono text-xs font-bold tracking-[0.15em] transition-colors"
          >
            <span>{lang === 'vi' ? 'VŨ KHÍ NĂNG LỰC' : 'NEXT ARSENALS'}</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
