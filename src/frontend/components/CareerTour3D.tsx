import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { CAREER_TOUR_DATA } from '../constants/dictionary';
import { usePortfolioStore } from '../stores/usePortfolioStore';
import { soundEngine } from '../lib/audio';

export const CareerTour3D: React.FC = () => {
  const { locale } = usePortfolioStore();
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = CAREER_TOUR_DATA;
  const activeItem = steps[currentStep];

  const handleNext = () => {
    soundEngine.playClick(750);
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    soundEngine.playClick(600);
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const role = locale === 'vi' ? activeItem.roleVi : activeItem.roleEn;
  const company = locale === 'vi' ? activeItem.companyVi : activeItem.companyEn;
  const tag = locale === 'vi' ? activeItem.tagVi : activeItem.tagEn;
  const highlights = locale === 'vi' ? activeItem.highlightsVi : activeItem.highlightsEn;

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      
      {/* Top Timeline Navigation Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#a3e635] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 // CHRONOLOGICAL CAREER TOUR (2019 → 2026)</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mt-1">
            {locale === 'vi' ? 'HÀNH TRÌNH THỰC CHIẾN' : 'CAREER ODYSSEY'}
          </h2>
        </div>

        {/* Step Progress Indicators */}
        <div className="flex items-center gap-2">
          {steps.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                soundEngine.playClick(500 + idx * 60);
                setCurrentStep(idx);
              }}
              data-cursor={`ACT 0${idx + 1}`}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                currentStep === idx
                  ? 'bg-[#a3e635] text-black font-bold shadow-[0_0_15px_rgba(163,230,53,0.4)] scale-105'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 border border-white/10'
              }`}
            >
              {item.stepNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Main Single-Stage Focal Showcase (No Cluttered Overlap) */}
      <div className="py-10 sm:py-14">
        <div 
          className="p-8 sm:p-12 rounded-[2.5rem] bg-[#07090e]/95 border border-white/10 relative overflow-hidden backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)] transition-all duration-500"
          style={{ perspective: '1000px' }}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#a3e635]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Header Row of the Active Stage */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#a3e635]/15 text-[#a3e635] border border-[#a3e635]/30 font-bold">
                CHẶNG {activeItem.stepNumber} / 05
              </span>
              <span className="font-mono text-xs text-zinc-400">
                {activeItem.period}
              </span>
            </div>

            <span className="px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-zinc-300 uppercase tracking-widest">
              {tag}
            </span>
          </div>

          {/* Content Body */}
          <div className="pt-8 space-y-6">
            <div>
              <h3 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
                {role}
              </h3>
              <div className="font-serif italic text-lg sm:text-2xl text-zinc-300 mt-2">
                {company}
              </div>
            </div>

            {/* Curated Key Highlights (Strictly 2-3 Bullet Points) */}
            <div className="space-y-3 pt-4">
              {highlights.map((point, pIdx) => (
                <div key={pIdx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                  <span className="w-2 h-2 rounded-full bg-[#a3e635] mt-2 flex-shrink-0 shadow-[0_0_8px_#a3e635]" />
                  <span className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stepper Navigation Footer */}
          <div className="mt-10 pt-6 border-t border-white/[0.06] flex items-center justify-between">
            <button
              onClick={handlePrev}
              data-cursor="PREV"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{locale === 'vi' ? 'Chặng Trước' : 'Previous'}</span>
            </button>

            <span className="font-mono text-xs text-zinc-500">
              {currentStep + 1} OF {steps.length}
            </span>

            <button
              onClick={handleNext}
              data-cursor="NEXT"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#a3e635] hover:bg-white text-black font-display font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)]"
            >
              <span>{locale === 'vi' ? 'Chặng Tiếp Theo' : 'Next Stage'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
