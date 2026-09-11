import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { APPLE_CONTENT } from '../../content/appleContent';
import { AppleAudio } from '../../audio/AppleHapticAudio';

interface SOTYSession03ArsenalsProps {
  lang: 'vi' | 'en';
  onNext: () => void;
  onPrev: () => void;
  isActive: boolean;
}

export const SOTYSession03Arsenals: React.FC<SOTYSession03ArsenalsProps> = ({
  lang,
  onNext,
  onPrev,
  isActive,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = APPLE_CONTENT.bentoHeader;
  const items = APPLE_CONTENT.bento;

  // Interactive Widget 1: Morale Resonator
  const [moraleResonance, setMoraleResonance] = useState(88);
  const handleBoostMorale = () => {
    AppleAudio.playClick(1500, 0.03);
    setMoraleResonance((prev) => (prev >= 100 ? 75 : prev + 5));
  };

  // Interactive Widget 2: AI Dispatch Pipeline Simulation
  const [aiStep, setAiStep] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setAiStep((prev) => (prev + 1) % 3);
    }, 2400);
    return () => clearInterval(interval);
  }, [isActive]);

  // Interactive Widget 4: Playable Synth Chord Notes
  const synthNotes = [
    { label: 'F3', freq: 174.61 },
    { label: 'A3', freq: 220.0 },
    { label: 'C4', freq: 261.63 },
    { label: 'E4', freq: 329.63 },
    { label: 'G4', freq: 392.0 },
  ];

  const handlePlayNote = (freq: number) => {
    AppleAudio.playSynthNote(freq, 0.5);
  };

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.arsenal-anim',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.07,
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
      {/* Top Architectural Header */}
      <div className="w-full max-w-7xl mx-auto space-y-2 border-b border-white/10 pb-4">
        <div className="arsenal-anim flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-amber-400 uppercase font-bold">
              {data.sectionBadge}
            </span>
          </div>
          <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-500 hidden sm:inline">
            [ 4 ARCHITECTURAL PILLARS ]
          </span>
        </div>

        <div className="arsenal-anim flex flex-col md:flex-row md:items-end justify-between gap-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase leading-[1.05]">
            {data.title[lang]}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-md">
            {data.subtitle[lang]}
          </p>
        </div>
      </div>

      {/* 4 Architectural Command Pillars (Zero Cards) */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 my-auto py-2">
        {/* Pillar I: Leadership & Morale */}
        <div className="arsenal-anim space-y-3 pr-0 lg:pr-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-4 lg:pb-0 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-amber-400 font-bold">
              <span>[ PILLAR // 01 ]</span>
              <span className="text-zinc-500">CULTURE</span>
            </div>
            <h3 className="text-base sm:text-lg font-display font-bold text-white uppercase tracking-tight">
              {items[0].title[lang]}
            </h3>
            <p className="text-xs font-body text-zinc-300 leading-relaxed font-light line-clamp-3">
              {items[0].description[lang]}
            </p>
          </div>

          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span>MORALE ENERGY</span>
              <span className="text-amber-400 font-bold">{moraleResonance}%</span>
            </div>
            <div className="w-full h-0.5 bg-zinc-800">
              <div
                className="h-full bg-amber-400 transition-all duration-300"
                style={{ width: `${moraleResonance}%` }}
              />
            </div>
            <button
              type="button"
              onClick={handleBoostMorale}
              className="text-[10px] font-mono text-zinc-400 hover:text-amber-300 transition-colors uppercase tracking-wider text-left pt-0.5"
            >
              + {lang === 'vi' ? 'TRUYỀN LỬA ĐỘI NGŨ' : 'ENERGIZE'}
            </button>
          </div>
        </div>

        {/* Pillar II: AI & Custom Software */}
        <div className="arsenal-anim space-y-3 pr-0 lg:pr-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-4 lg:pb-0 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-amber-400 font-bold">
              <span>[ PILLAR // 02 ]</span>
              <span className="text-zinc-500">SYSTEMS</span>
            </div>
            <h3 className="text-base sm:text-lg font-display font-bold text-white uppercase tracking-tight">
              {items[1].title[lang]}
            </h3>
            <p className="text-xs font-body text-zinc-300 leading-relaxed font-light line-clamp-3">
              {items[1].description[lang]}
            </p>
          </div>

          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span>AI DISPATCH</span>
              <span className="text-amber-400">● LIVE</span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-[9px] font-mono text-center">
              <div className={`py-1 border transition-colors ${aiStep === 0 ? 'border-amber-400 text-amber-300' : 'border-white/10 text-zinc-600'}`}>
                INPUT
              </div>
              <div className={`py-1 border transition-colors ${aiStep === 1 ? 'border-amber-400 text-amber-300' : 'border-white/10 text-zinc-600'}`}>
                OPTIMIZE
              </div>
              <div className={`py-1 border transition-colors ${aiStep === 2 ? 'border-amber-400 text-amber-300' : 'border-white/10 text-zinc-600'}`}>
                DISPATCH
              </div>
            </div>
          </div>
        </div>

        {/* Pillar III: Web Architecture */}
        <div className="arsenal-anim space-y-3 pr-0 lg:pr-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-4 lg:pb-0 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-amber-400 font-bold">
              <span>[ PILLAR // 03 ]</span>
              <span className="text-zinc-500">PLATFORM</span>
            </div>
            <h3 className="text-base sm:text-lg font-display font-bold text-white uppercase tracking-tight">
              {items[2].title[lang]}
            </h3>
            <p className="text-xs font-body text-zinc-300 leading-relaxed font-light line-clamp-3">
              {items[2].description[lang]}
            </p>
          </div>

          <div className="space-y-1 pt-2">
            <span className="text-[10px] font-mono text-zinc-500 tracking-wider">FOUNDATION:</span>
            <p className="text-[11px] font-mono text-zinc-300 uppercase tracking-tight">
              FPT POLYTECHNIC WEB DESIGN
            </p>
          </div>
        </div>

        {/* Pillar IV: Sonic Artistry */}
        <div className="arsenal-anim space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-amber-400 font-bold">
              <span>[ PILLAR // 04 ]</span>
              <span className="text-zinc-500">SONIC</span>
            </div>
            <h3 className="text-base sm:text-lg font-display font-bold text-white uppercase tracking-tight">
              {items[3].title[lang]}
            </h3>
            <p className="text-xs font-body text-zinc-300 leading-relaxed font-light line-clamp-3">
              {items[3].description[lang]}
            </p>
          </div>

          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span>SYNTHESIZER FREQUENCIES</span>
            </div>
            <div className="flex items-center gap-1">
              {synthNotes.map((n) => (
                <button
                  key={n.label}
                  type="button"
                  onClick={() => handlePlayNote(n.freq)}
                  className="flex-1 py-1 border border-white/10 hover:border-amber-400 hover:text-amber-300 text-[10px] font-mono text-zinc-400 transition-colors"
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between pt-4 border-t border-white/10">
        <div className="text-xs font-mono text-zinc-500 hidden sm:inline tracking-wider">
          [ 4 / 4 TRỤ CỘT KIẾN TRÚC VẬN HÀNH THỰC THI ]
        </div>

        <div className="arsenal-anim flex items-center gap-3">
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
            <span>{lang === 'vi' ? 'KẾT NỐI TRỰC TIẾP' : 'CONTACT TERMINAL'}</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
