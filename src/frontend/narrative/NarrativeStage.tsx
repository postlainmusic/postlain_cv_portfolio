/**
 * POSTLAIN NARRATIVE STAGE
 * Fullscreen 100dvh canvas viewport with parallel WCAG AA accessible semantic DOM tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Globe } from 'lucide-react';
import { ExperienceRuntime } from './runtime/ExperienceRuntime';
import { AUTOBIOGRAPHY_DATA } from './data/autobiographyData';
import { useAppStore } from '../stores/useAppStore';

export const NarrativeStage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const runtimeRef = useRef<ExperienceRuntime | null>(null);

  const locale = useAppStore((state) => state.locale);
  const toggleLocale = useAppStore((state) => state.toggleLocale);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      runtimeRef.current = new ExperienceRuntime(canvasRef.current, containerRef.current);
      runtimeRef.current.setLocale(locale);
    }
    return () => {
      runtimeRef.current?.destroy();
      runtimeRef.current = null;
    };
  }, []);

  useEffect(() => {
    runtimeRef.current?.setLocale(locale);
  }, [locale]);

  const handleToggleMute = () => {
    if (runtimeRef.current) {
      const muted = runtimeRef.current.toggleMute();
      setIsMuted(muted);
    }
  };

  const copy = AUTOBIOGRAPHY_DATA;

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-[#0a0c10] text-[#e8e5dc] select-none"
      role="region"
      aria-label="POSTLAIN Visual Autobiography Stage"
    >
      {/* Layer 0: Continuous Multi-Layer Canvas Stage */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block touch-none z-0"
        aria-hidden="true"
      />

      {/* Layer 1: Ambient Editorial Controls Header */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-5 pointer-events-auto">
        <button
          type="button"
          onClick={() => runtimeRef.current?.jumpToProgress(0)}
          className="group flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 rounded px-2 py-1 transition-opacity hover:opacity-80"
          aria-label="Return to beginning (Desert)"
        >
          <span className="font-serif font-bold text-lg sm:text-xl tracking-wider text-white">
            {copy.identity.name}
          </span>
          <span className="font-mono text-xs text-zinc-400 tracking-widest hidden sm:inline-block">
            [{copy.identity.brand}]
          </span>
        </button>

        <div className="flex items-center gap-3">
          {/* Audio Toggle */}
          <button
            type="button"
            onClick={handleToggleMute}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 hover:border-white/30 text-xs font-mono text-zinc-300 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label={isMuted ? 'Unmute procedural audio' : 'Mute procedural audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-500" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
            <span className="hidden sm:inline">{isMuted ? 'MUTED' : 'SOUND ON'}</span>
          </button>

          {/* Bilingual Switcher */}
          <button
            type="button"
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 hover:border-white/30 text-xs font-mono text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label={`Switch language to ${locale === 'vi' ? 'English' : 'Tiếng Việt'}`}
          >
            <Globe className="w-3.5 h-3.5 text-zinc-400" />
            <span>{locale === 'vi' ? 'EN' : 'VI'}</span>
          </button>
        </div>
      </header>

      {/* Layer 2: Screen Reader Accessible Semantic DOM Tree (sr-only visually, 100% accessible to assistive tech) */}
      <main className="sr-only" role="main">
        <h1>{copy.identity.name} — {copy.identity.brand}</h1>
        <p>{copy.identity.roleTitle[locale]}</p>
        <p>{copy.identity.philosophy[locale]}</p>

        <section aria-label="Professional Experience Milestones">
          <h2>Kinh Nghiệm & Lịch Sử Nghề Nghiệp (Career History)</h2>
          {copy.milestones.map((m) => (
            <article key={m.id}>
              <h3>{m.company} ({m.year}) — {m.role}</h3>
              <p>{m.period} | {m.location}</p>
              <p>{m.summary[locale]}</p>
              <ul>
                {m.responsibilities[locale].map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section aria-label="Featured Living Project">
          <h2>{copy.project.name}</h2>
          <p>{copy.project.description[locale]}</p>
          <a href={copy.project.url} target="_blank" rel="noopener noreferrer">
            Truy cập nền tảng Hidden Music ({copy.project.url})
          </a>
        </section>

        <section aria-label="Direct Contact">
          <h2>Liên Hệ Trực Tiếp (Direct Contact)</h2>
          <p>Hotline: <a href={`tel:${copy.identity.hotline.replace(/[^0-9]/g, '')}`}>{copy.identity.hotline}</a></p>
          <p>Email: <a href={`mailto:${copy.identity.email}`}>{copy.identity.email}</a></p>
          <p>Địa điểm: {copy.identity.location}</p>
        </section>
      </main>
    </div>
  );
};
