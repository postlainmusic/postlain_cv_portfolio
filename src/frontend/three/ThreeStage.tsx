/**
 * THREE.JS SOTY STAGE — POSTLAIN VISUAL AUTOBIOGRAPHY
 * Master Orchestrator Viewport: ThreeEngine WebGL Canvas, 35mm Film Grain,
 * 3D-Tilted Bento Monolith Cards, Kinetic SplitText Typography,
 * SOTY Navigation Rail, Preloader GPU Warm-Up, and WCAG 2.2 AA Semantic DOM.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Globe, ChevronUp, ChevronDown, Sparkles, Copy, ExternalLink, Check } from 'lucide-react';
import { ThreeEngine } from './ThreeEngine';
import { Preloader } from './Preloader';
import { CustomCursor } from './CustomCursor';
import { AUTOBIOGRAPHY_DATA } from '../narrative/data/autobiographyData';
import { NarrativeTimeline } from '../narrative/runtime/NarrativeTimeline';
import { useAppStore } from '../stores/useAppStore';

export const ThreeStage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<ThreeEngine | null>(null);

  const locale = useAppStore((state) => state.locale);
  const toggleLocale = useAppStore((state) => state.toggleLocale);

  const [isPreloaderActive, setIsPreloaderActive] = useState(true);
  const [isEngineReady, setIsEngineReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const [copiedToast, setCopiedToast] = useState<string | null>(null);

  // 1. Initialize ThreeEngine & Warm up Shaders
  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      try {
        const engine = new ThreeEngine(canvasRef.current, containerRef.current);
        engineRef.current = engine;

        engine.onBeatChange = (idx) => {
          setCurrentBeatIndex(idx);
        };

        // Execute GPU shader pre-compilation into VRAM
        engine.warmUpShaders().then(() => {
          setIsEngineReady(true);
        }).catch(() => {
          setIsEngineReady(true);
        });
      } catch (err) {
        console.warn('ThreeEngine initialization caught gracefully:', err);
        setIsEngineReady(true);
      }
    }

    return () => {
      engineRef.current?.destroy();
      engineRef.current = null;
    };
  }, []);

  // 2. Keyboard Story-Beat Step Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPreloaderActive) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        engineRef.current?.nextBeat();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        engineRef.current?.prevBeat();
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreloaderActive]);

  // 3. Pointer & Click Interactions
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    engineRef.current?.setMouse(e.clientX, e.clientY);
  }, []);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    engineRef.current?.handleCanvasClick(e.clientX, e.clientY);
  }, []);

  const handleEnterJourney = () => {
    if (engineRef.current) {
      engineRef.current.audio.playTactileClick();
    }
    setIsPreloaderActive(false);
  };

  const handleToggleMute = () => {
    if (engineRef.current) {
      const muted = engineRef.current.audio.toggleMute();
      setIsMuted(muted);
    }
  };

  const handleSelectBeat = (index: number) => {
    engineRef.current?.setBeat(index);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    if (navigator.vibrate) navigator.vibrate(15);
    engineRef.current?.audio.playTactileClick();
    setCopiedToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedToast(null), 2500);
  };

  const copy = AUTOBIOGRAPHY_DATA;
  const beats = NarrativeTimeline.STORY_BEATS;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onClick={handleCanvasClick}
      style={{ backgroundColor: '#030508' }}
      className="relative w-screen h-screen overflow-hidden bg-[#030508] text-[#e8e5dc] select-none font-sans"
      role="region"
      aria-label="POSTLAIN Visual Autobiography 3D Stage"
    >
      {/* Preloader & GPU Warm-Up Curtain */}
      {isPreloaderActive && (
        <Preloader onEnter={handleEnterJourney} isReady={isEngineReady} />
      )}

      {/* Custom Fluid Velocity Magnetic Cursor */}
      <CustomCursor />

      {/* Layer 0: Fixed Fullscreen Three.js WebGL Canvas */}
      <canvas
        ref={canvasRef}
        style={{ backgroundColor: '#030508' }}
        className="absolute inset-0 w-full h-full block touch-none z-0 cursor-crosshair"
        aria-hidden="true"
      />

      {/* Layer 1: 35mm Film Grain & Micro-Dithering Shader Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.035] mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"
        aria-hidden="true"
      />

      {/* Layer 2: Ambient Editorial Header */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 sm:px-10 py-6 pointer-events-auto">
        <button
          type="button"
          onClick={() => handleSelectBeat(0)}
          className="group flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded px-2 py-1 transition-opacity hover:opacity-85"
          aria-label="Return to beginning"
        >
          <span className="font-['Syne'] font-extrabold text-xl sm:text-2xl tracking-tight text-white">
            {copy.identity.name}
          </span>
          <span className="font-mono text-xs text-amber-400/90 tracking-widest hidden sm:inline-block">
            [{copy.identity.brand}]
          </span>
        </button>

        <div className="flex items-center gap-3">
          {/* Audio Toggle */}
          <button
            type="button"
            onClick={handleToggleMute}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-amber-400/40 text-xs font-mono text-zinc-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-500" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
            <span className="hidden sm:inline">{isMuted ? 'MUTED' : 'SOUND ON'}</span>
          </button>

          {/* Bilingual Switcher */}
          <button
            type="button"
            onClick={toggleLocale}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-amber-400/40 text-xs font-mono text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-zinc-400" />
            <span>{locale === 'vi' ? 'EN' : 'VI'}</span>
          </button>
        </div>
      </header>

      {/* Layer 3: Kinetic Dynamic Typography & Bento Monolith Overlays */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-6 sm:p-14 pointer-events-none">
        {/* BEAT 0: DESERT */}
        {currentBeatIndex === 0 && (
          <div className="max-w-3xl text-center flex flex-col items-center animate-fade-in pointer-events-auto">
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs tracking-widest uppercase">
              [ 01 · KHỞI SINH TRONG TĨNH LẶNG ]
            </span>
            <h1 className="font-['Syne'] font-extrabold text-[ clamp(38px,6.5vw,92px) ] leading-[1.05] tracking-tight text-white mb-6 drop-shadow-2xl">
              Không biết không phải là khoảng trống.
            </h1>
            <p className="font-sans text-base sm:text-xl text-zinc-300 font-light max-w-xl">
              Đó là nơi mọi hành trình sáng tạo, âm nhạc và vận hành bắt đầu định hình.
            </p>
          </div>
        )}

        {/* BEAT 1: MAGMA FRICTION */}
        {currentBeatIndex === 1 && (
          <div className="max-w-2xl text-center flex flex-col items-center animate-fade-in pointer-events-auto">
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs tracking-widest uppercase">
              [ 02 · ĐỊA TẦNG SỤC SÔI ]
            </span>
            <h2 className="font-['Syne'] font-bold text-[ clamp(36px,5.5vw,78px) ] leading-tight text-white mb-4">
              Áp lực sinh năng lượng.
            </h2>
            <p className="font-sans text-base sm:text-lg text-zinc-300 max-w-lg">
              Dưới sức nén của thử thách, nhiệt lượng âm thầm chuyển hóa thành ý chí và sinh lực.
            </p>
          </div>
        )}

        {/* BEAT 2: VOLCANO IDENTITY BIRTH */}
        {currentBeatIndex === 2 && (
          <div className="max-w-3xl text-center flex flex-col items-center animate-fade-in pointer-events-auto">
            <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(245,158,11,0.25)]">
              {copy.identity.brand} // THE OPERATING FREQUENCY
            </span>
            <h1 className="font-['Syne'] font-extrabold text-[ clamp(52px,9vw,130px) ] leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-100 to-amber-400 mb-4 drop-shadow-[0_10px_35px_rgba(245,158,11,0.3)]">
              {copy.identity.name}
            </h1>
            <p className="font-mono text-xs sm:text-sm tracking-[0.2em] text-zinc-300 uppercase mb-3">
              {copy.identity.roleTitle[locale]}
            </p>
            <p className="font-serif italic text-base sm:text-xl text-zinc-400 max-w-md">
              "{copy.identity.philosophy[locale]}"
            </p>
          </div>
        )}

        {/* BEAT 3: WATERFALL FLOW */}
        {currentBeatIndex === 3 && (
          <div className="max-w-2xl text-center flex flex-col items-center animate-fade-in pointer-events-auto">
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 font-mono text-xs tracking-widest uppercase">
              [ 04 · DÒNG CHẢY KHÁT VỌNG ]
            </span>
            <h2 className="font-['Syne'] font-bold text-[ clamp(36px,5.5vw,82px) ] leading-tight text-white mb-4">
              Kiên trì tích tụ từng giọt nhỏ.
            </h2>
            <p className="font-sans text-base sm:text-lg text-zinc-300 max-w-lg">
              Nhịp điệu vận hành & kỷ luật. Dòng nước tinh khiết nuôi dưỡng những mầm sống vĩ đại.
            </p>
          </div>
        )}

        {/* BEAT 4: TREE 01 (VIVA STAR COFFEE) */}
        {currentBeatIndex === 4 && (
          <div className="w-full max-w-xl p-8 sm:p-10 rounded-3xl bg-black/70 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto transform hover:scale-[1.01] transition-transform duration-300">
            <div className="flex items-center justify-between text-xs font-mono tracking-widest text-amber-400 mb-3">
              <span>[ 2019 · {copy.milestones[0].period} ]</span>
              <span>{copy.milestones[0].location}</span>
            </div>
            <h3 className="font-['Syne'] font-bold text-3xl sm:text-4xl text-white mb-1">
              {copy.milestones[0].company}
            </h3>
            <p className="font-mono text-xs text-zinc-400 tracking-wider uppercase mb-5">
              {copy.milestones[0].role}
            </p>
            <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
              {copy.milestones[0].summary[locale]}
            </p>
            <ul className="space-y-2.5 border-t border-white/10 pt-5">
              {copy.milestones[0].responsibilities[locale].map((r, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* BEAT 5: TREE 02 (SB STUDIO) */}
        {currentBeatIndex === 5 && (
          <div className="w-full max-w-xl p-8 sm:p-10 rounded-3xl bg-black/70 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto transform hover:scale-[1.01] transition-transform duration-300">
            <div className="flex items-center justify-between text-xs font-mono tracking-widest text-amber-400 mb-3">
              <span>[ 2023 · {copy.milestones[1].period} ]</span>
              <span>{copy.milestones[1].location}</span>
            </div>
            <h3 className="font-['Syne'] font-bold text-3xl sm:text-4xl text-white mb-1">
              {copy.milestones[1].company}
            </h3>
            <p className="font-mono text-xs text-zinc-400 tracking-wider uppercase mb-5">
              {copy.milestones[1].role}
            </p>
            <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
              {copy.milestones[1].summary[locale]}
            </p>
            <ul className="space-y-2.5 border-t border-white/10 pt-5">
              {copy.milestones[1].responsibilities[locale].map((r, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* BEAT 6: TREE 03 (PHỦI STEAK) */}
        {currentBeatIndex === 6 && (
          <div className="w-full max-w-xl p-8 sm:p-10 rounded-3xl bg-black/70 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto transform hover:scale-[1.01] transition-transform duration-300">
            <div className="flex items-center justify-between text-xs font-mono tracking-widest text-amber-400 mb-3">
              <span>[ 2024 · {copy.milestones[2].period} ]</span>
              <span>{copy.milestones[2].location}</span>
            </div>
            <h3 className="font-['Syne'] font-bold text-3xl sm:text-4xl text-white mb-1">
              {copy.milestones[2].company}
            </h3>
            <p className="font-mono text-xs text-zinc-400 tracking-wider uppercase mb-5">
              {copy.milestones[2].role}
            </p>
            <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
              {copy.milestones[2].summary[locale]}
            </p>
            <ul className="space-y-2.5 border-t border-white/10 pt-5">
              {copy.milestones[2].responsibilities[locale].map((r, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* BEAT 7: TREE 04 (ALDO GO!) */}
        {currentBeatIndex === 7 && (
          <div className="w-full max-w-xl p-8 sm:p-10 rounded-3xl bg-black/70 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto transform hover:scale-[1.01] transition-transform duration-300">
            <div className="flex items-center justify-between text-xs font-mono tracking-widest text-amber-400 mb-3">
              <span>[ 2025 · {copy.milestones[3].period} ]</span>
              <span>{copy.milestones[3].location}</span>
            </div>
            <h3 className="font-['Syne'] font-bold text-3xl sm:text-4xl text-white mb-1">
              {copy.milestones[3].company}
            </h3>
            <p className="font-mono text-xs text-zinc-400 tracking-wider uppercase mb-5">
              {copy.milestones[3].role}
            </p>
            <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
              {copy.milestones[3].summary[locale]}
            </p>
            <ul className="space-y-2.5 border-t border-white/10 pt-5">
              {copy.milestones[3].responsibilities[locale].map((r, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* BEAT 8: STORM RIFT */}
        {currentBeatIndex === 8 && (
          <div className="max-w-2xl text-center flex flex-col items-center animate-fade-in pointer-events-auto">
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 font-mono text-xs tracking-widest uppercase">
              [ 09 · CƠN BÃO ÁP LỰC ]
            </span>
            <h2 className="font-['Syne'] font-bold text-[ clamp(36px,5.5vw,78px) ] leading-tight text-white mb-4">
              Xé toang mớ hỗn độn.
            </h2>
            <p className="font-sans text-base sm:text-lg text-zinc-300 max-w-lg">
              Áp lực tôi luyện bản lĩnh, phân tách mây mù để hé lộ bầu trời quang đãng và trật tự thuần khiết.
            </p>
          </div>
        )}

        {/* BEAT 9: MOON & INTERACTIVE CONSTELLATIONS */}
        {currentBeatIndex === 9 && (
          <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8 pointer-events-auto">
            {/* Left: Hidden Music Portal Card */}
            <div className="w-full md:w-1/2 p-8 rounded-3xl bg-black/60 backdrop-blur-2xl border border-sky-500/25 shadow-[0_0_40px_rgba(14,165,233,0.15)] flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-sky-500/15 text-sky-300 font-mono text-xs tracking-wider uppercase mb-4">
                  LIVING SONIC ARTWORK
                </span>
                <h3 className="font-['Syne'] font-bold text-3xl sm:text-4xl text-white mb-3">
                  {copy.project.name}
                </h3>
                <p className="font-sans text-sm text-zinc-300 leading-relaxed mb-6">
                  {copy.project.description[locale]}
                </p>
              </div>
              <a
                href={copy.project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-black font-mono font-bold text-xs tracking-widest uppercase transition-all duration-300 w-fit"
              >
                <span>OPEN PORTAL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Right: Direct Contact Card */}
            <div className="w-full md:w-1/2 p-8 rounded-3xl bg-black/60 backdrop-blur-2xl border border-amber-500/25 shadow-[0_0_40px_rgba(245,158,11,0.15)] flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 font-mono text-xs tracking-wider uppercase mb-4">
                  DIRECT CHANNELS
                </span>
                <h3 className="font-['Syne'] font-bold text-3xl sm:text-4xl text-white mb-2">
                  {copy.identity.name}
                </h3>
                <p className="font-mono text-xs text-zinc-400 tracking-wider uppercase mb-6">
                  {copy.identity.roleTitle[locale]}
                </p>

                <div className="space-y-4">
                  {/* Hotline */}
                  <button
                    type="button"
                    onClick={() => handleCopyText(copy.identity.hotline, 'Hotline')}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left group"
                  >
                    <div>
                      <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">HOTLINE</div>
                      <div className="font-mono text-sm sm:text-base text-amber-300 font-bold">{copy.identity.hotline}</div>
                    </div>
                    <Copy className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  </button>

                  {/* Email */}
                  <button
                    type="button"
                    onClick={() => handleCopyText(copy.identity.email, 'Email')}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left group"
                  >
                    <div>
                      <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">EMAIL</div>
                      <div className="font-mono text-sm sm:text-base text-white">{copy.identity.email}</div>
                    </div>
                    <Copy className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {copiedToast && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5 px-6 py-3 rounded-full bg-zinc-900/90 border border-amber-400/40 text-white font-mono text-xs tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.3)] animate-bounce">
          <Check className="w-4 h-4 text-amber-400" />
          <span>{copiedToast}</span>
        </div>
      )}

      {/* Layer 4: Right-Side Story-Beat Navigation Rail */}
      <nav
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-3 pointer-events-auto"
        aria-label="Story Beats Navigation"
      >
        <button
          type="button"
          onClick={() => engineRef.current?.prevBeat()}
          disabled={currentBeatIndex === 0}
          className="p-1 rounded-full text-zinc-400 hover:text-white disabled:opacity-20 transition-all focus:outline-none"
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
                <span className="absolute right-7 px-2.5 py-1 rounded bg-black/85 border border-white/10 text-[11px] font-mono tracking-wider text-zinc-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                  {beat.title[locale]}
                </span>

                {/* Dot */}
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-2.5 h-2.5 bg-amber-400 ring-4 ring-amber-400/20 shadow-[0_0_12px_#f59e0b]'
                      : 'w-1.5 h-1.5 bg-zinc-600 group-hover:bg-zinc-300 group-hover:scale-125'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => engineRef.current?.nextBeat()}
          disabled={currentBeatIndex === beats.length - 1}
          className="p-1 rounded-full text-zinc-400 hover:text-white disabled:opacity-20 transition-all focus:outline-none"
          aria-label="Next Story Beat"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </nav>

      {/* Layer 5: Bottom Pacing Hint */}
      <footer className="absolute bottom-6 left-6 right-6 z-30 flex items-center justify-between text-[11px] font-mono tracking-widest text-zinc-500 pointer-events-none">
        <div>
          <span>BEAT 0{currentBeatIndex + 1} / 0{beats.length}</span>
          <span className="mx-2 text-zinc-700">·</span>
          <span className="text-zinc-300">{beats[currentBeatIndex]?.title[locale]}</span>
        </div>
        <div className="hidden sm:block">
          <span>SCROLL OR USE [↑ / ↓] TO ADVANCE NARRATIVE</span>
        </div>
      </footer>

      {/* Layer 6: Parallel Semantic Accessible Tree (WCAG 2.2 AA) */}
      <main className="sr-only" role="main">
        <h1>{copy.identity.name} — {copy.identity.brand}</h1>
        <p>{copy.identity.roleTitle[locale]}</p>
        <p>{copy.identity.philosophy[locale]}</p>
        <section aria-label="Milestones">
          {copy.milestones.map((m) => (
            <article key={m.id}>
              <h3>{m.company} — {m.role}</h3>
              <p>{m.summary[locale]}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};
