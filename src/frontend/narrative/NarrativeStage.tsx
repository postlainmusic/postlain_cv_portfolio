/**
 * POSTLAIN NARRATIVE STAGE
 * Fullscreen 100dvh canvas viewport with interactive constellation clicks,
 * keyboard/gesture story beat step navigation, story beat indicator rail,
 * and parallel WCAG AA accessible semantic DOM tree.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Globe, ChevronUp, ChevronDown } from 'lucide-react';
import { ExperienceRuntime } from './runtime/ExperienceRuntime';
import { NarrativeTimeline } from './runtime/NarrativeTimeline';
import { AUTOBIOGRAPHY_DATA } from './data/autobiographyData';
import { useAppStore } from '../stores/useAppStore';

export const NarrativeStage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const runtimeRef = useRef<ExperienceRuntime | null>(null);

  const locale = useAppStore((state) => state.locale);
  const toggleLocale = useAppStore((state) => state.toggleLocale);
  const [isMuted, setIsMuted] = useState(false);
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);

  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      runtimeRef.current = new ExperienceRuntime(canvasRef.current, containerRef.current);
      runtimeRef.current.setLocale(locale);

      // Interval to sync current active beat for the indicator rail
      const syncInterval = window.setInterval(() => {
        if (runtimeRef.current) {
          const idx = runtimeRef.current.getCurrentBeatIndex();
          setCurrentBeatIndex(idx);
        }
      }, 100);

      return () => {
        window.clearInterval(syncInterval);
        runtimeRef.current?.destroy();
        runtimeRef.current = null;
      };
    }
  }, []);

  useEffect(() => {
    runtimeRef.current?.setLocale(locale);
  }, [locale]);

  // Keyboard Step-by-Step Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        runtimeRef.current?.nextBeat();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        runtimeRef.current?.prevBeat();
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Pointer Interaction Handlers
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    runtimeRef.current?.handlePointerMove(e.clientX, e.clientY);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    runtimeRef.current?.handleClick(e.clientX, e.clientY);
  }, []);

  const handleToggleMute = () => {
    if (runtimeRef.current) {
      const muted = runtimeRef.current.toggleMute();
      setIsMuted(muted);
    }
  };

  const handleSelectBeat = (index: number) => {
    runtimeRef.current?.setBeat(index);
    setCurrentBeatIndex(index);
  };

  const copy = AUTOBIOGRAPHY_DATA;
  const beats = NarrativeTimeline.STORY_BEATS;

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-[#040609] text-[#e8e5dc] select-none"
      role="region"
      aria-label="POSTLAIN Visual Autobiography Stage"
    >
      {/* Layer 0: Continuous Multi-Layer Canvas Stage */}
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onClick={handleClick}
        className="absolute inset-0 w-full h-full block touch-none z-0 cursor-crosshair"
        aria-hidden="true"
      />

      {/* Layer 1: Ambient Editorial Controls Header */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-5 pointer-events-auto">
        <button
          type="button"
          onClick={() => handleSelectBeat(0)}
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

      {/* Layer 2: Right-Side Story-Beat Navigation Rail (Step Indicator) */}
      <nav
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-3 pointer-events-auto"
        aria-label="Story Beats Navigation"
      >
        <button
          type="button"
          onClick={() => runtimeRef.current?.prevBeat()}
          disabled={currentBeatIndex === 0}
          className="p-1 rounded-full text-zinc-400 hover:text-white disabled:opacity-20 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
          aria-label="Previous Story Beat"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center gap-2.5 py-2">
          {beats.map((beat, idx) => {
            const isActive = currentBeatIndex === idx;
            return (
              <button
                key={beat.id}
                type="button"
                onClick={() => handleSelectBeat(idx)}
                className="group relative flex items-center justify-end p-1 focus:outline-none"
                aria-label={`Jump to Beat ${idx + 1}: ${beat.title[locale]}`}
                aria-current={isActive ? 'step' : undefined}
              >
                {/* Tooltip on hover */}
                <span className="absolute right-7 px-2.5 py-1 rounded bg-black/80 border border-white/10 text-[11px] font-mono tracking-wider text-zinc-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                  {beat.title[locale]}
                </span>

                {/* Dot */}
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-2.5 h-2.5 bg-amber-400 ring-4 ring-amber-400/20 shadow-[0_0_10px_#f59e0b]'
                      : 'w-1.5 h-1.5 bg-zinc-600 group-hover:bg-zinc-300 group-hover:scale-125'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => runtimeRef.current?.nextBeat()}
          disabled={currentBeatIndex === beats.length - 1}
          className="p-1 rounded-full text-zinc-400 hover:text-white disabled:opacity-20 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
          aria-label="Next Story Beat"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </nav>

      {/* Layer 3: Bottom Pacing Hint */}
      <footer className="absolute bottom-5 left-6 right-6 z-30 flex items-center justify-between text-[11px] font-mono tracking-widest text-zinc-500 pointer-events-none">
        <div>
          <span>BEAT 0{currentBeatIndex + 1} / 0{beats.length}</span>
          <span className="mx-2 text-zinc-700">·</span>
          <span className="text-zinc-400">{beats[currentBeatIndex]?.title[locale]}</span>
        </div>
        <div className="hidden sm:block">
          <span>SCROLL OR USE [↑ / ↓] TO ADVANCE NARRATIVE</span>
        </div>
      </footer>

      {/* Layer 4: Screen Reader Accessible Semantic DOM Tree (sr-only visually, 100% accessible to assistive tech) */}
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

