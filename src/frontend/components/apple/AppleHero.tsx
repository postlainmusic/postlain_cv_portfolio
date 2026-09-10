import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown, Sparkles, Terminal, Flame, Layers } from 'lucide-react';
import { APPLE_CONTENT } from '../../content/appleContent';
import { AppleAudio } from '../../audio/AppleHapticAudio';

interface AppleHeroProps {
  lang: 'vi' | 'en';
  onScrollDown: () => void;
}

export const AppleHero: React.FC<AppleHeroProps> = ({ lang, onScrollDown }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const data = APPLE_CONTENT.hero;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Kinetic staggered entrance
      gsap.fromTo(
        '.hero-animate-elem',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.2,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      id="hero-section"
      ref={containerRef}
      aria-label="Phần giới thiệu Ngô Phúc"
      className="relative min-h-[100dvh] w-full flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-28 sm:pt-36 pb-12 bg-black text-white overflow-hidden"
    >
      {/* Background ambient radial glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none"
      />

      {/* Top Meta Badges */}
      <div className="w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Status Badge */}
        <div className="hero-animate-elem flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-xs font-mono tracking-widest text-zinc-300 backdrop-blur-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{data.statusBadge[lang]}</span>
        </div>

        {/* Location & Timezone */}
        <div className="hero-animate-elem hidden sm:flex items-center gap-2 text-xs font-mono tracking-wider text-zinc-400">
          <span>{data.location[lang]}</span>
        </div>
      </div>

      {/* Main Massive Kinetic Headline Core */}
      <div className="w-full max-w-7xl mx-auto my-auto py-12 space-y-8">
        {/* Role Pre-title */}
        <div className="hero-animate-elem flex items-center gap-3 text-xs sm:text-sm font-mono tracking-widest text-amber-400 uppercase font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>{data.role[lang]}</span>
        </div>

        {/* Giant Main Display Typography */}
        <div className="space-y-2">
          <h1
            ref={headlineRef}
            className="hero-animate-elem text-5xl sm:text-8xl lg:text-9xl font-display font-black tracking-tighter text-white uppercase leading-[0.95]"
          >
            NGÔ PHÚC
          </h1>
          <p className="hero-animate-elem text-2xl sm:text-4xl lg:text-5xl font-mono tracking-tight text-zinc-400 font-light">
            // POSTLAIN STUDIO
          </p>
        </div>

        {/* Authentic Statement Lead Paragraph */}
        <div className="hero-animate-elem max-w-3xl pt-4">
          <p className="text-lg sm:text-2xl font-body font-normal text-zinc-300 leading-relaxed">
            &ldquo;{data.statement[lang]}&rdquo;
          </p>
        </div>

        {/* 4 Interactive Capability Pills */}
        <div className="hero-animate-elem flex flex-wrap gap-2.5 pt-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900/60 border border-white/10 text-xs font-mono text-zinc-300">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>QUẢN TRỊ & GIỮ LỬA</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900/60 border border-white/10 text-xs font-mono text-zinc-300">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI WORKFLOW AUTOMATION</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900/60 border border-white/10 text-xs font-mono text-zinc-300">
            <Layers className="w-3.5 h-3.5 text-violet-400" />
            <span>PR & WEB ARCHITECTURE</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator Bar */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between pt-6 border-t border-white/10">
        <div className="text-xs font-mono tracking-widest text-zinc-400">
          <span>EDITION 2026</span>
        </div>

        <button
          type="button"
          onClick={() => {
            AppleAudio.playClick(1400);
            onScrollDown();
          }}
          onMouseEnter={() => AppleAudio.playClick(1600, 0.01)}
          className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400 hover:text-amber-300 transition-colors group"
        >
          <span>{data.scrollPrompt[lang]}</span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:text-amber-300" />
        </button>
      </div>
    </section>
  );
};
