import React from 'react';
import { ExternalLink, Disc, Radio, ArrowUpRight, Sparkles } from 'lucide-react';
import { usePortfolioStore } from '../stores/usePortfolioStore';
import { soundEngine } from '../lib/audio';

export const HiddenMusicShowcase: React.FC = () => {
  const { locale } = usePortfolioStore();

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="p-8 sm:p-14 rounded-[2.5rem] bg-[#07090e]/95 border border-white/10 relative overflow-hidden backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
        
        {/* Background Atmosphere */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#a3e635]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#a3e635] animate-pulse" />
            <span className="font-mono text-xs text-[#a3e635] uppercase tracking-widest font-bold">
              02 // ACTIVE FEATURED VENTURE
            </span>
          </div>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/[0.04] text-zinc-400 border border-white/10">
            PRODUCED BY NGÔ PHÚC
          </span>
        </div>

        {/* Content Body */}
        <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
                HIDDEN MUSIC
              </h3>
              <p className="font-serif italic text-lg sm:text-2xl text-zinc-300 mt-2">
                {locale === 'vi' 
                  ? 'Nền tảng âm nhạc số & mạng lưới sáng tạo nghệ thuật' 
                  : 'Digital Sound Platform & Creative Media Network'}
              </p>
            </div>

            <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
              {locale === 'vi'
                ? 'Hệ sinh thái phân phối, sản xuất âm thanh và định hướng truyền thông cho nghệ sĩ, phát triển và vận hành trực tiếp bởi Ngô Phúc (POSTLAIN).'
                : 'A digital audio ecosystem for production, talent direction, and MCN distribution, architected and operated by Ngo Phuc.'}
            </p>

            <div className="pt-2">
              <a
                href="https://hiddenmusic.postlain.com"
                target="_blank"
                rel="noreferrer"
                onClick={() => soundEngine.playClick(880)}
                data-cursor="OPEN"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#a3e635] text-black font-display font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_25px_rgba(163,230,53,0.3)] group"
              >
                <span>{locale === 'vi' ? 'TRUY CẬP HIDDEN MUSIC' : 'VISIT HIDDEN MUSIC'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Highlights Column */}
          <div className="lg:col-span-5 space-y-3">
            {[
              locale === 'vi' ? 'Sản xuất âm nhạc & Audio Engineering' : 'Music Production & Audio Engineering',
              locale === 'vi' ? 'Quản lý bản quyền, nghệ sĩ & mạng lưới MCN' : 'Talent Management & Digital MCN Networks',
              locale === 'vi' ? 'Tối ưu hóa phát hành & trải nghiệm số' : 'Automated Digital Release Pipelines',
            ].map((feat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#a3e635] mt-2 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">{feat}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
