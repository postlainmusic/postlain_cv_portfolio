import React, { useState } from 'react';
import { Layers, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';
import { usePortfolioStore } from '../stores/usePortfolioStore';
import { DICTIONARY, EDUCATION_DATA } from '../constants/dictionary';
import { soundEngine } from '../lib/audio';

export const MatrixAndEducation: React.FC = () => {
  const { locale } = usePortfolioStore();
  const t = DICTIONARY[locale];
  const [activeTab, setActiveTab] = useState<'matrix' | 'education'>('matrix');

  return (
    <div className="relative w-full max-w-6xl mx-auto h-full flex flex-col justify-center px-4 sm:px-8">
      
      {/* Container Box */}
      <div className="p-6 sm:p-10 rounded-[2.5rem] bg-[#07090e]/95 border border-white/10 relative overflow-hidden backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)] max-h-[85vh] flex flex-col justify-between">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#a3e635]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06] flex-shrink-0">
          <div>
            <span className="font-mono text-xs text-[#a3e635] tracking-widest uppercase block mb-1">
              03 // EXECUTIVE MATRIX & EDUCATION
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              {activeTab === 'matrix' ? t.capabilities.title : t.education.title}
            </h2>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/10">
            <button
              onClick={() => {
                soundEngine.playClick(600);
                setActiveTab('matrix');
              }}
              data-cursor="MATRIX"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === 'matrix'
                  ? 'bg-[#a3e635] text-black font-bold shadow-[0_0_15px_rgba(163,230,53,0.3)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{locale === 'vi' ? 'Thế Mạnh' : 'Capabilities'}</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick(700);
                setActiveTab('education');
              }}
              data-cursor="ACAD"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === 'education'
                  ? 'bg-[#a3e635] text-black font-bold shadow-[0_0_15px_rgba(163,230,53,0.3)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{locale === 'vi' ? 'Học Vấn' : 'Education'}</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="py-6 overflow-y-auto custom-scrollbar">
          {activeTab === 'matrix' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {t.capabilities.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  data-cursor="CORE"
                  className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:border-[#a3e635]/40 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs text-[#a3e635] block mb-3">0{idx + 1} // FOCUS</span>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white uppercase mb-3 group-hover:text-[#a3e635] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/[0.04] flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#a3e635]" />
                    <span>FIELD TESTED</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {EDUCATION_DATA.map((edu, idx) => {
                const school = locale === 'vi' ? edu.schoolVi : edu.schoolEn;
                const major = locale === 'vi' ? edu.majorVi : edu.majorEn;
                const status = locale === 'vi' ? edu.statusVi : edu.statusEn;

                return (
                  <div
                    key={idx}
                    data-cursor="ACAD"
                    className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs text-[#a3e635] uppercase">{edu.year}</span>
                        {status && (
                          <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/5">
                            {status}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-white uppercase group-hover:text-[#a3e635] transition-colors">
                        {school}
                      </h3>
                      <p className="font-serif italic text-xs sm:text-sm text-zinc-400 mt-2">
                        {major}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-white/[0.04] text-[11px] font-mono text-zinc-500">
                      MILESTONE 0{idx + 1}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Status Tip */}
        <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-zinc-500 flex-shrink-0">
          <span>{locale === 'vi' ? 'QUẢN TRỊ BẰNG LOGIC • THỔI HỒN BẰNG NGHỆ THUẬT' : 'LOGIC LED • ART ELEVATED'}</span>
          <span className="text-[#a3e635]">ĐÀ LẠT, VIỆT NAM</span>
        </div>

      </div>
    </div>
  );
};
