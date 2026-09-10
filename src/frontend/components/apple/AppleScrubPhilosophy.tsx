import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Music2, CheckCircle2 } from 'lucide-react';
import { APPLE_CONTENT } from '../../content/appleContent';

gsap.registerPlugin(ScrollTrigger);

interface AppleScrubPhilosophyProps {
  lang: 'vi' | 'en';
}

export const AppleScrubPhilosophy: React.FC<AppleScrubPhilosophyProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textScrubRef = useRef<HTMLDivElement>(null);
  const data = APPLE_CONTENT.philosophy;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Apple-style Word-by-Word Scroll Scrubbing
      const words = containerRef.current?.querySelectorAll('.scrub-word');
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.18, color: '#52525b' },
          {
            opacity: 1.0,
            color: '#ffffff',
            stagger: 0.05,
            scrollTrigger: {
              trigger: textScrubRef.current,
              start: 'top 75%',
              end: 'bottom 45%',
              scrub: 0.5,
            },
          }
        );
      }

      // 2. Dual Engine cards reveal
      gsap.fromTo(
        '.dual-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.dual-engine-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  // Helper to split text into words for Apple scrub effect
  const renderScrubWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={`${word}-${i}`} className="scrub-word inline-block mr-[0.28em] transition-colors will-change-transform">
        {word}
      </span>
    ));
  };

  return (
    <section
      id="philosophy-section"
      ref={containerRef}
      aria-label="Triết lý vận hành Ngô Phúc"
      className="relative min-h-[100dvh] w-full px-6 sm:px-12 lg:px-20 py-32 bg-[#080808] text-white border-t border-white/10 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto space-y-24">
        {/* Section Header Badge */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-xs font-mono tracking-widest text-amber-400 uppercase font-bold">
            {data.sectionBadge}
          </span>
        </div>

        {/* Master Slogan Display */}
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white uppercase leading-tight">
            &ldquo;{data.slogan[lang]}&rdquo;
          </h2>
          <p className="text-base sm:text-xl font-mono text-zinc-400 max-w-3xl">
            {data.lead[lang]}
          </p>
        </div>

        {/* Apple Word-by-Word Scrubbing Paragraph */}
        <div ref={textScrubRef} className="max-w-5xl py-8">
          <p className="text-2xl sm:text-4xl lg:text-5xl font-body font-medium leading-relaxed tracking-tight text-zinc-500 select-none">
            {renderScrubWords(data.body[lang])}
          </p>
        </div>

        {/* The Dual-Engine Operational Architecture (2 Poles) */}
        <div className="dual-engine-grid grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
          {/* Left Pole: Operational & AI Engine */}
          <div className="dual-card group p-8 sm:p-12 rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-amber-400/40 backdrop-blur-2xl transition-all duration-500 relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-amber-500/10 transition-all"
            />
            <div className="relative space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Cpu className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <div className="text-[11px] font-mono tracking-widest text-amber-400 uppercase">
                  [ENGINE_01 // LOGIC & AUTOMATION]
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase">
                  {data.dualEngine.left.title[lang]}
                </h3>
              </div>

              <p className="text-sm sm:text-base font-body text-zinc-400 leading-relaxed">
                {data.dualEngine.left.desc[lang]}
              </p>

              <ul className="space-y-3 pt-2">
                {data.dualEngine.left.points[lang].map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm font-mono text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Pole: Creative & PR Engine */}
          <div className="dual-card group p-8 sm:p-12 rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-cyan-400/40 backdrop-blur-2xl transition-all duration-500 relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-cyan-500/10 transition-all"
            />
            <div className="relative space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                <Music2 className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <div className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase">
                  [ENGINE_02 // PR & ART DIRECTION]
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase">
                  {data.dualEngine.right.title[lang]}
                </h3>
              </div>

              <p className="text-sm sm:text-base font-body text-zinc-400 leading-relaxed">
                {data.dualEngine.right.desc[lang]}
              </p>

              <ul className="space-y-3 pt-2">
                {data.dualEngine.right.points[lang].map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm font-mono text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
