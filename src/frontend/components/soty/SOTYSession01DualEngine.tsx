import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Sliders, ArrowDown, ArrowUp } from 'lucide-react';
import { APPLE_CONTENT } from '../../content/appleContent';
import { AppleAudio } from '../../audio/AppleHapticAudio';

interface SOTYSession01DualEngineProps {
  lang: 'vi' | 'en';
  onNext: () => void;
  onPrev: () => void;
  isActive: boolean;
  onTensionChange: (val: number) => void;
}

export const SOTYSession01DualEngine: React.FC<SOTYSession01DualEngineProps> = ({
  lang,
  onNext,
  onPrev,
  isActive,
  onTensionChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderVal, setSliderVal] = useState(50);
  const data = APPLE_CONTENT.philosophy;

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dual-anim',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.05,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive, lang]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setSliderVal(val);
    onTensionChange(val / 100);
    AppleAudio.playClick(1000 + val * 10, 0.01);
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
        <div className="dual-anim flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-amber-400 uppercase font-bold">
              {data.sectionBadge}
            </span>
          </div>
          <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-500 hidden sm:inline">
            [ ARCHITECTURAL MANIFESTO ]
          </span>
        </div>

        <div className="dual-anim flex flex-col md:flex-row md:items-end justify-between gap-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase leading-[1.05]">
            "{data.slogan[lang]}"
          </h2>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-md">
            {data.lead[lang]}
          </p>
        </div>
      </div>

      {/* Haute-Couture Split Editorial Manifesto Columns (Zero Cards) */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 my-auto py-4">
        {/* Left Column: Operational & AI Engine */}
        <div
          onMouseEnter={() => AppleAudio.playClick(1200, 0.01)}
          className={`dual-anim space-y-4 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 transition-opacity duration-300 ${
            sliderVal > 70 ? 'opacity-50' : 'opacity-100'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono tracking-[0.2em] text-amber-400 uppercase font-bold">
                [ ENGINE // 01 · LOGIC & AI ]
              </span>
              <span className="text-[10px] font-mono text-zinc-400">DISCIPLINE</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-tight">
              {data.dualEngine.left.title[lang]}
            </h3>
            <p className="text-xs sm:text-sm font-body text-zinc-300 leading-relaxed font-light">
              {data.dualEngine.left.desc[lang]}
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            {data.dualEngine.left.points[lang].map((pt, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs font-mono text-zinc-300">
                <span className="text-amber-400/80 font-bold shrink-0">0{idx + 1} //</span>
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Creative & PR Engine */}
        <div
          onMouseEnter={() => AppleAudio.playClick(1200, 0.01)}
          className={`dual-anim space-y-4 pl-0 md:pl-4 transition-opacity duration-300 ${
            sliderVal < 30 ? 'opacity-50' : 'opacity-100'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono tracking-[0.2em] text-amber-400 uppercase font-bold">
                [ ENGINE // 02 · ART & PR ]
              </span>
              <span className="text-[10px] font-mono text-zinc-400">RESONANCE</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-tight">
              {data.dualEngine.right.title[lang]}
            </h3>
            <p className="text-xs sm:text-sm font-body text-zinc-300 leading-relaxed font-light">
              {data.dualEngine.right.desc[lang]}
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            {data.dualEngine.right.points[lang].map((pt, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs font-mono text-zinc-300">
                <span className="text-amber-400/80 font-bold shrink-0">0{idx + 1} //</span>
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Tension Fulcrum & Navigation Runway */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        {/* Tension Slider */}
        <div className="dual-anim flex items-center gap-4 w-full sm:w-auto">
          <Sliders className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider shrink-0">
            LOGIC <span className="text-white font-bold">{100 - sliderVal}%</span>
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderVal}
            onChange={handleSliderChange}
            className="w-full sm:w-44 h-1 bg-zinc-800 rounded-none appearance-none cursor-pointer accent-amber-400"
            aria-label="Cân bằng tỷ trọng Vận hành và Nghệ thuật"
          />
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider shrink-0">
            ART <span className="text-white font-bold">{sliderVal}%</span>
          </span>
        </div>

        {/* Action Arrows */}
        <div className="dual-anim flex items-center gap-3 self-end sm:self-auto">
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
            <span>{lang === 'vi' ? 'TIẾP TỤC HÀNH TRÌNH' : 'NEXT CHAPTER'}</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
