import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Check, Briefcase } from 'lucide-react';
import { APPLE_CONTENT } from '../../content/appleContent';
import { AppleAudio } from '../../audio/AppleHapticAudio';

gsap.registerPlugin(ScrollTrigger);

interface AppleMilestonesRunwayProps {
  lang: 'vi' | 'en';
}

export const AppleMilestonesRunway: React.FC<AppleMilestonesRunwayProps> = ({ lang }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const runwayRef = useRef<HTMLDivElement>(null);
  const headerData = APPLE_CONTENT.milestonesHeader;
  const milestones = APPLE_CONTENT.milestones;

  useEffect(() => {
    // Only run horizontal pin scrub on desktop/tablet (width >= 1024px)
    const isDesktop = window.innerWidth >= 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isDesktop || prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const runway = runwayRef.current;
      if (!runway || !triggerRef.current) return;

      const totalScrollWidth = runway.scrollWidth - window.innerWidth + 160;

      gsap.to(runway, {
        x: -totalScrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalScrollWidth * 1.2}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <div ref={sectionRef} className="relative bg-black text-white">
      {/* Pinned Section Wrapper */}
      <div
        id="milestones-section"
        ref={triggerRef}
        aria-label="Cột mốc kinh nghiệm thực chiến"
        className="min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-24 lg:py-0 overflow-hidden"
      >
        {/* Section Header */}
        <div className="w-full max-w-7xl mx-auto space-y-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase font-bold">
              {headerData.sectionBadge}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white uppercase">
              {headerData.title[lang]}
            </h2>
            <p className="text-sm sm:text-base font-mono text-zinc-400 max-w-md">
              {headerData.subtitle[lang]}
            </p>
          </div>
        </div>

        {/* Horizontal Runway Track (On mobile: stacked grid) */}
        <div
          ref={runwayRef}
          className="flex flex-col lg:flex-row gap-8 will-change-transform lg:w-max lg:pr-24"
        >
          {milestones.map((item, index) => (
            <div
              key={item.id}
              onMouseEnter={() => AppleAudio.playClick(1400, 0.015)}
              className="w-full lg:w-[480px] xl:w-[520px] shrink-0 p-8 sm:p-10 rounded-3xl bg-zinc-950/90 border border-white/10 hover:border-amber-400/40 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between space-y-6 group relative overflow-hidden shadow-2xl"
            >
              {/* Top Meta: Badge & Index */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono tracking-widest text-amber-300 font-semibold">
                  {item.badge}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  [{index + 1} / {milestones.length}]
                </span>
              </div>

              {/* Title, Role & Company */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                  <span className="tracking-wider">{item.company}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight group-hover:text-amber-300 transition-colors">
                  {item.role[lang]}
                </h3>
              </div>

              {/* Timeline Period & Location */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 py-1 border-y border-white/5">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{item.period}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{item.location[lang]}</span>
                </div>
              </div>

              {/* Core Value Quote */}
              <p className="text-xs sm:text-sm font-mono text-amber-400/90 italic">
                &ldquo;{item.coreValue[lang]}&rdquo;
              </p>

              {/* Responsibilities List */}
              <ul className="space-y-2.5 pt-2">
                {item.responsibilities[lang].map((resp, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-body text-zinc-300 leading-relaxed">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom Spec Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {item.specTags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-zinc-900 border border-white/5 text-[10px] font-mono text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
