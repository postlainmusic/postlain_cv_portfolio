import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';
import { APPLE_CONTENT } from '../../content/appleContent';
import { AppleAudio } from '../../audio/AppleHapticAudio';

interface SOTYSession00GenesisProps {
  lang: 'vi' | 'en';
  onNext: () => void;
  isActive: boolean;
}

export const SOTYSession00Genesis: React.FC<SOTYSession00GenesisProps> = ({
  lang,
  onNext,
  isActive,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = APPLE_CONTENT.hero;

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.genesis-anim',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.05,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive, lang]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full flex flex-col justify-between px-6 sm:px-16 lg:px-24 pt-24 pb-8 transition-opacity duration-500 overflow-hidden ${
        isActive ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'
      }`}
    >
      {/* Top Architectural Indices */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between border-b border-white/10 pb-4">
        <div className="genesis-anim flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span className="text-[11px] font-mono tracking-[0.25em] text-zinc-300 uppercase">
            {data.statusBadge[lang]}
          </span>
        </div>

        <div className="genesis-anim hidden sm:flex items-center gap-4 text-[11px] font-mono tracking-[0.2em] text-zinc-400">
          <span>{data.location[lang]}</span>
          <span className="text-zinc-600">//</span>
          <span className="text-amber-400/90 font-bold">11°56'N 108°26'E</span>
          <span className="text-zinc-600">//</span>
          <span>GMT+7</span>
        </div>
      </div>

      {/* Monumental Editorial Core */}
      <div className="w-full max-w-7xl mx-auto my-auto py-4 space-y-6">
        {/* Editorial Role Tag */}
        <div className="genesis-anim flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.3em] text-amber-400 uppercase font-bold">
            [ ARCHITECTURAL PORTFOLIO 2026 ]
          </span>
          <span className="h-px w-12 bg-amber-400/40" />
          <span className="text-xs font-mono tracking-[0.2em] text-zinc-400 uppercase hidden sm:inline">
            {data.role[lang]}
          </span>
        </div>

        {/* Giant Typographic Engraving */}
        <div className="space-y-1">
          <h1 className="genesis-anim text-6xl sm:text-8xl lg:text-[7.5rem] font-display font-black tracking-tighter text-white uppercase leading-[0.9] select-none">
            NGÔ PHÚC
          </h1>
          <p className="genesis-anim text-2xl sm:text-4xl lg:text-5xl font-mono tracking-tight text-zinc-400 font-light">
            [ POSTLAIN ]
          </p>
        </div>

        {/* Authentic Statement */}
        <div className="genesis-anim max-w-3xl pt-2">
          <p className="text-base sm:text-xl lg:text-2xl font-body text-zinc-200 font-light leading-relaxed border-l border-amber-400/50 pl-4 sm:pl-6">
            "{data.statement[lang]}"
          </p>
        </div>

        {/* Micro-Taxonomy Blueprint */}
        <div className="genesis-anim flex flex-wrap items-center gap-y-2 gap-x-6 pt-4 text-xs font-mono text-zinc-400 tracking-wider">
          <span className="text-zinc-200 hover:text-amber-300 transition-colors">
            01 / AI WORKFLOWS & SOFTWARE
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-200 hover:text-amber-300 transition-colors">
            02 / STUDIO & RETAIL OPERATIONS
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-200 hover:text-amber-300 transition-colors">
            03 / SONIC ARTISTRY (HIDDEN MUSIC)
          </span>
        </div>
      </div>

      {/* Bottom Editorial Runway Baseline */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={() => {
            AppleAudio.playClick(1600, 0.02);
            onNext();
          }}
          onMouseEnter={() => AppleAudio.playClick(1400, 0.01)}
          className="genesis-anim flex items-center gap-4 px-8 py-3 rounded-full bg-white text-black hover:bg-amber-300 font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-xl shadow-white/10 self-start sm:self-auto group"
        >
          <span>{lang === 'vi' ? 'BẮT ĐẦU HÀNH TRÌNH' : 'EXPLORE PORTFOLIO'}</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </button>

        <div className="genesis-anim flex items-center gap-3 text-xs font-mono text-zinc-400 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>[ LĂN CHUỘT / VUỐT / PHÍM ↓ ĐỂ ĐIỀU HƯỚNG ]</span>
        </div>
      </div>
    </div>
  );
};
