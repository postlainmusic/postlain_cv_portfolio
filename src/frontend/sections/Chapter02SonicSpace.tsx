import React from 'react';
import { ExternalLink, Music, Sparkles, Play, Waves } from 'lucide-react';
import { SiteContent } from '../content/types';
import { WaterFluid } from '../narrative/interaction/WaterFluid';

interface Chapter02Props {
  content: SiteContent['chapter02'];
}

export const Chapter02SonicSpace: React.FC<Chapter02Props> = ({ content }) => {
  return (
    <section id="creative-tech" className="py-20 sm:py-28 border-b border-white/10 relative overflow-hidden">
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

        {/* Two-Column Grid: Digital Platform & Interactive Fluid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Platform Overview & Audio Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-xl bg-zinc-900/70 border border-white/10 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-accent-amber uppercase font-semibold">
                  <Music className="w-3.5 h-3.5" />
                  <span>Dự Án Nền Tảng Số</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                  {content.platformName}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {content.platformDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <a
                  href={content.platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-accent-amber text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                >
                  <span>{content.listeningRoom.visitPlatformBtn}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Audio Preview Card */}
            <div className="p-6 rounded-xl bg-black/40 border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-accent-amber font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{content.listeningRoom.title}</span>
              </div>
              <div>
                <h4 className="font-bold text-white text-base">
                  {content.listeningRoom.trackTitle}
                </h4>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  {content.listeningRoom.trackMeta}
                </p>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {content.listeningRoom.audioNotice}
              </p>
            </div>
          </div>

          {/* Right: Interactive WebGL Fluid Shader Canvas (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="relative h-[380px] sm:h-[460px] rounded-xl overflow-hidden border border-white/10 bg-black/80 shadow-2xl group">
              <WaterFluid />
              <div className="absolute top-4 left-4 z-10 pointer-events-none bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-[11px] font-mono text-accent-amber flex items-center gap-2">
                <Waves className="w-3.5 h-3.5 animate-pulse" />
                <span>WebGL 2.0 Fluid Dynamics</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none bg-black/70 backdrop-blur-md p-3 rounded border border-white/10 text-xs font-mono text-zinc-300">
                {content.interactionHint}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
