import React from 'react';
import { Download, Mail, ArrowDown, CheckCircle2, Sparkles } from 'lucide-react';
import { SiteContent } from '../content/types';

interface Chapter00Props {
  content: SiteContent['chapter00'];
}

export const Chapter00Overture: React.FC<Chapter00Props> = ({ content }) => {
  return (
    <section id="overture" className="relative pt-16 sm:pt-24 lg:pt-32 pb-20 sm:pb-28 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-4xl space-y-8">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-amber/10 border border-accent-amber/30 text-accent-amber text-xs font-mono tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{content.badge}</span>
          </div>

          {/* Name & Target Title */}
          <div className="space-y-4">
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-none">
              {content.name}
            </h1>
            <p className="font-mono text-lg sm:text-2xl font-bold tracking-wider text-accent-amber uppercase">
              {content.roleTitle}
            </p>
          </div>

          {/* Direct Statement from CV */}
          <div className="border-l-2 border-accent-amber pl-6 py-2">
            <p className="text-lg sm:text-2xl font-medium text-zinc-100 leading-relaxed max-w-3xl">
              “{content.personalIntro}”
            </p>
          </div>

          {/* Direct CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href={content.downloadCvUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="NGOPHUC_CV_2026.pdf"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-accent-amber text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all shadow-lg hover:shadow-accent-amber/20"
            >
              <Download className="w-4 h-4" />
              <span>{content.ctaDownloadCv}</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded border border-white/20 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:border-accent-amber hover:text-accent-amber transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{content.ctaContact}</span>
            </a>

            <a
              href="#milestones"
              className="inline-flex items-center gap-2 px-4 py-3.5 text-zinc-400 font-mono text-xs sm:text-sm font-medium uppercase tracking-wider hover:text-white transition-colors"
            >
              <span>{content.ctaExplore}</span>
              <ArrowDown className="w-4 h-4 text-accent-amber animate-bounce" />
            </a>
          </div>

          {/* Verified Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10">
            <div className="p-4 rounded bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-xl font-display font-black text-white">ALDO GO!</span>
              <p className="text-xs text-zinc-400">Quản lí cửa hàng bán lẻ</p>
            </div>
            <div className="p-4 rounded bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-xl font-display font-black text-white">SB STUDIO</span>
              <p className="text-xs text-zinc-400">Quản lý phòng thu & MCN</p>
            </div>
            <div className="p-4 rounded bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-xl font-display font-black text-white">PHỦI STEAK</span>
              <p className="text-xs text-zinc-400">Ca trưởng bếp & Bếp chính</p>
            </div>
            <div className="p-4 rounded bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-xl font-display font-black text-white">AI & LOGIC</span>
              <p className="text-xs text-zinc-400">Tự động hoá quy trình</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
