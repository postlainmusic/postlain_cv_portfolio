import React, { useEffect, useState, useRef, useCallback } from 'react';
import { 
  ArrowUpRight, Sparkles, MapPin, Mail, Phone, ExternalLink,
  ChevronDown, ChevronUp, Layers, Award, Zap, Volume2, VolumeX, Globe, Copy, Check
} from 'lucide-react';
import { usePortfolioStore } from './stores/usePortfolioStore';
import { soundEngine } from './lib/audio';
import { ScrollyScene3D } from './components/ScrollyScene3D';
import { CareerTour3D } from './components/CareerTour3D';
import { HiddenMusicShowcase } from './components/HiddenMusicShowcase';
import { MatrixAndEducation } from './components/MatrixAndEducation';
import { DirectDispatch } from './components/DirectDispatch';
import { CinematicPreloader } from './components/CinematicPreloader';
import { CustomCursor } from './components/CustomCursor';
import { ViewfinderFrame } from './components/ViewfinderFrame';
import { 
  DICTIONARY, 
  PROFILE_INFO 
} from './constants/dictionary';

export const App: React.FC = () => {
  const { 
    locale, 
    toggleLocale, 
    activeAct, 
    totalActs, 
    setActiveAct, 
    nextAct, 
    prevAct 
  } = usePortfolioStore();

  const t = DICTIONARY[locale];
  const [preloaderComplete, setPreloaderComplete] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  const isTransitioningRef = useRef<boolean>(false);
  const touchStartY = useRef<number | null>(null);

  // Live Da Lat GMT+7 clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Safe debounce actuator for wheel / touch
  const triggerActChange = useCallback((direction: 'next' | 'prev') => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    if (direction === 'next') {
      nextAct();
    } else {
      prevAct();
    }

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 600);
  }, [nextAct, prevAct]);

  // Wheel listener for natural full-screen Act navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 25) return;
      if (e.deltaY > 0) {
        triggerActChange('next');
      } else {
        triggerActChange('prev');
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [triggerActChange]);

  // Keyboard navigation (Arrow keys, Space, PageUp/PageDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return; // Do not intercept typing in forms
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        triggerActChange('next');
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        triggerActChange('prev');
      } else if (e.key >= '1' && e.key <= '5') {
        const actIndex = parseInt(e.key, 10) - 1;
        setActiveAct(actIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerActChange, setActiveAct]);

  // Touch gesture handlers for mobile swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    if (Math.abs(deltaY) > 40) {
      if (deltaY > 0) {
        triggerActChange('next');
      } else {
        triggerActChange('prev');
      }
    }
    touchStartY.current = null;
  };

  const actNavItems = [
    { id: 0, label: locale === 'vi' ? '00 GIỚI THIỆU' : '00 OVERTURE' },
    { id: 1, label: locale === 'vi' ? '01 SỰ NGHIỆP' : '01 CAREER' },
    { id: 2, label: locale === 'vi' ? '02 DỰ ÁN' : '02 VENTURE' },
    { id: 3, label: locale === 'vi' ? '03 THẾ MẠNH' : '03 MATRIX' },
    { id: 4, label: locale === 'vi' ? '04 LIÊN HỆ' : '04 CONTACT' },
  ];

  return (
    <div 
      className="fixed inset-0 w-screen h-screen bg-[#030305] text-[#e2e8f0] font-sans selection:bg-[#a3e635] selection:text-black overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* 0. Cinematic Preloader (Snappy & Dismissible) */}
      {!preloaderComplete && (
        <CinematicPreloader onComplete={() => setPreloaderComplete(true)} />
      )}

      {/* 0.1. Interactive Custom Crosshair Cursor */}
      <CustomCursor />

      {/* 0.2. Viewfinder Frame Brackets */}
      <ViewfinderFrame />

      {/* 1. Ambient Background 3D Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <ScrollyScene3D />
      </div>

      {/* 2. Film Grain Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 z-20 opacity-[0.03] mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* 3. Awwwards Minimalist Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-10 py-3.5 sm:py-4 flex items-center justify-between backdrop-blur-xl bg-[#030305]/75 border-b border-white/[0.06]">
        {/* Monogram Logo */}
        <button 
          onClick={() => setActiveAct(0)}
          data-cursor="TOP"
          className="flex items-center gap-3 group cursor-pointer text-left"
        >
          <div className="relative w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-[#a3e635]">
            <span className="font-display font-black text-xs text-[#a3e635] group-hover:scale-110 transition-transform">NP</span>
            <div className="absolute inset-0 bg-[#a3e635]/15 scale-0 group-hover:scale-100 rounded-full transition-transform duration-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black tracking-wider text-sm sm:text-base text-white">NGÔ PHÚC</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-[#a3e635] border border-[#a3e635]/20 font-bold">
                POSTLAIN
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-widest leading-tight">
              {locale === 'vi' ? 'Đà Lạt • Manager' : 'Da Lat • Manager'}
            </span>
          </div>
        </button>

        {/* Desktop Act Navigation Ribbon */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          {actNavItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveAct(item.id)}
              onMouseEnter={() => soundEngine.playHover()}
              data-cursor={`ACT 0${item.id + 1}`}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                activeAct === item.id
                  ? 'bg-[#a3e635] text-black font-bold shadow-[0_0_15px_rgba(163,230,53,0.3)] scale-105'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Control Switches: Bilingual [VI | EN] + Hotline Quick Dial */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${PROFILE_INFO.phone.replace(/[^0-9]/g, '')}`}
            data-cursor="CALL"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all"
          >
            <Phone className="w-3 h-3 text-[#a3e635]" />
            <span>{PROFILE_INFO.phone}</span>
          </a>

          {/* Language Switcher */}
          <button
            onClick={toggleLocale}
            data-cursor="LANG"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono uppercase tracking-widest text-zinc-300 hover:text-white transition-all"
            title="Switch Language / Chuyển Ngôn Ngữ"
          >
            <Globe className="w-3.5 h-3.5 text-[#a3e635]" />
            <span className={locale === 'vi' ? 'text-[#a3e635] font-bold' : 'text-zinc-500'}>VI</span>
            <span className="text-zinc-600">/</span>
            <span className={locale === 'en' ? 'text-[#a3e635] font-bold' : 'text-zinc-500'}>EN</span>
          </button>
        </div>
      </header>

      {/* ========================================================
          FULLSCREEN 100VH STAGE ACT CONTROLLER
      ======================================================== */}
      <main className="relative w-full h-full z-30 pt-16 pb-14">

        {/* ACT 00 // THE OVERTURE */}
        <div 
          className="absolute inset-0 pt-16 pb-14 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center px-4 sm:px-10 lg:px-16"
          style={{
            transform: `translate3d(0, ${(0 - activeAct) * 100}%, 0)`,
            opacity: activeAct === 0 ? 1 : 0,
            pointerEvents: activeAct === 0 ? 'auto' : 'none',
          }}
        >
          <div className="w-full max-w-5xl mx-auto space-y-6">
            
            {/* Top Status Capsule */}
            <div className="w-full flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3e635] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a3e635]"></span>
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-300">
                  {t.hero.status}
                </span>
              </div>

              {/* Da Lat Live GMT+7 Clock */}
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-500">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>ĐÀ LẠT, VIỆT NAM:</span>
                <span className="text-zinc-300 font-bold">{currentTime || '12:00:00'}</span>
              </div>
            </div>

            {/* Kinetic Typography */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-[#a3e635] tracking-[0.3em] uppercase">
                  {PROFILE_INFO.alias} // {t.hero.role}
                </span>
                <span className="h-px w-16 bg-[#a3e635]/30"></span>
              </div>

              <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-tight uppercase leading-[0.85] text-white select-none">
                {t.hero.name}
              </h1>

              {/* Editorial High-Fashion Statement */}
              <div className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-zinc-300 leading-tight pt-1">
                <span className="font-serif italic font-normal text-white">{t.hero.hook1}</span>{' '}
                <span className="font-display font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                  {t.hero.hook1Bold}
                </span>{' '}
                <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-white">{t.hero.hook2}</span>{' '}
                <span className="font-display font-black uppercase text-[#a3e635]">
                  {t.hero.hook2Bold}
                </span>
              </div>

              <p className="max-w-2xl text-xs sm:text-base text-zinc-400 font-light leading-relaxed">
                {t.hero.bio}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveAct(1)}
                data-cursor="TOUR"
                className="px-8 py-4 rounded-full bg-white text-black font-display font-black text-xs uppercase tracking-widest hover:bg-[#a3e635] transition-all duration-300 flex items-center gap-2 group shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setActiveAct(4)}
                data-cursor="CONTACT"
                className="px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-mono text-xs uppercase tracking-widest transition-all"
              >
                {t.hero.contactBtn}
              </button>
            </div>

          </div>
        </div>

        {/* ACT 01 // CHRONOLOGICAL CAREER TOUR */}
        <div 
          className="absolute inset-0 pt-16 pb-14 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center"
          style={{
            transform: `translate3d(0, ${(1 - activeAct) * 100}%, 0)`,
            opacity: activeAct === 1 ? 1 : 0,
            pointerEvents: activeAct === 1 ? 'auto' : 'none',
          }}
        >
          <CareerTour3D />
        </div>

        {/* ACT 02 // FEATURED VENTURE: HIDDEN MUSIC */}
        <div 
          className="absolute inset-0 pt-16 pb-14 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center"
          style={{
            transform: `translate3d(0, ${(2 - activeAct) * 100}%, 0)`,
            opacity: activeAct === 2 ? 1 : 0,
            pointerEvents: activeAct === 2 ? 'auto' : 'none',
          }}
        >
          <HiddenMusicShowcase />
        </div>

        {/* ACT 03 // EXECUTIVE MATRIX & ACADEMIC FOUNDATION */}
        <div 
          className="absolute inset-0 pt-16 pb-14 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center"
          style={{
            transform: `translate3d(0, ${(3 - activeAct) * 100}%, 0)`,
            opacity: activeAct === 3 ? 1 : 0,
            pointerEvents: activeAct === 3 ? 'auto' : 'none',
          }}
        >
          <MatrixAndEducation />
        </div>

        {/* ACT 04 // DIRECT INITIATION & EMAIL DISPATCH */}
        <div 
          className="absolute inset-0 pt-16 pb-14 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center"
          style={{
            transform: `translate3d(0, ${(4 - activeAct) * 100}%, 0)`,
            opacity: activeAct === 4 ? 1 : 0,
            pointerEvents: activeAct === 4 ? 'auto' : 'none',
          }}
        >
          <DirectDispatch />
        </div>

      </main>

      {/* ========================================================
          BOTTOM FIXED NAVIGATION RAIL & PROGRESS BAR
      ======================================================== */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 px-4 sm:px-10 py-3 backdrop-blur-xl bg-[#030305]/80 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-500">
        
        {/* Left: Copyright */}
        <div className="hidden sm:block">
          © 2026 NGÔ PHÚC (POSTLAIN).
        </div>

        {/* Center: Interactive Act Pagination Dots */}
        <div className="flex items-center gap-3 mx-auto sm:mx-0">
          <span className="text-[11px] font-mono text-[#a3e635] font-bold">
            ACT 0{activeAct + 1} / 05
          </span>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalActs }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveAct(idx)}
                data-cursor={`ACT 0${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeAct === idx
                    ? 'w-8 bg-[#a3e635] shadow-[0_0_10px_#a3e635]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                title={`Go to Act 0${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Quick Up / Down Navigation Controls */}
        <div className="flex items-center gap-2">
          <span className="hidden lg:inline text-[10px] text-zinc-600 uppercase tracking-widest mr-1">
            {locale === 'vi' ? 'CUỘN HOẶC DÙNG PHÍM [↑ / ↓]' : 'SCROLL OR USE [↑ / ↓]'}
          </span>

          <button
            onClick={() => triggerActChange('prev')}
            disabled={activeAct === 0}
            data-cursor="PREV"
            className="p-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white disabled:opacity-20 transition-all"
            title="Previous Act (Arrow Up)"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => triggerActChange('next')}
            disabled={activeAct === totalActs - 1}
            data-cursor="NEXT"
            className="p-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white disabled:opacity-20 transition-all"
            title="Next Act (Arrow Down)"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

      </footer>

    </div>
  );
};
