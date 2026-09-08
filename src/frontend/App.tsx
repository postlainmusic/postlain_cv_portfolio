import React, { useEffect, useState } from 'react';
import { 
  ArrowUpRight, Sparkles, MapPin, Mail, Phone, ExternalLink,
  ChevronDown, Layers, Award, Zap, Volume2, VolumeX, Globe, Copy, Check
} from 'lucide-react';
import { usePortfolioStore } from './stores/usePortfolioStore';
import { soundEngine } from './lib/audio';
import { ScrollyScene3D } from './components/ScrollyScene3D';
import { CareerTour3D } from './components/CareerTour3D';
import { HiddenMusicShowcase } from './components/HiddenMusicShowcase';
import { DirectDispatch } from './components/DirectDispatch';
import { CinematicPreloader } from './components/CinematicPreloader';
import { CustomCursor } from './components/CustomCursor';
import { ViewfinderFrame } from './components/ViewfinderFrame';
import { 
  DICTIONARY, 
  PROFILE_INFO, 
  EDUCATION_DATA 
} from './constants/dictionary';

export const App: React.FC = () => {
  const { locale, toggleLocale, soundEnabled, toggleSound } = usePortfolioStore();
  const t = DICTIONARY[locale];

  const [preloaderComplete, setPreloaderComplete] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    soundEngine.playClick(659.25);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030305] text-[#e2e8f0] font-sans selection:bg-[#a3e635] selection:text-black overflow-x-hidden">
      
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
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-10 py-4 sm:py-5 flex items-center justify-between backdrop-blur-xl bg-[#030305]/75 border-b border-white/[0.06]">
        {/* Monogram Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, 'hero')}
          data-cursor="TOP"
          className="flex items-center gap-3 group cursor-pointer"
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
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {[
            { id: 'career-tour', label: t.nav.career },
            { id: 'featured-venture', label: t.nav.project },
            { id: 'capabilities', label: t.nav.manifesto },
            { id: 'education', label: t.nav.education },
            { id: 'contact', label: t.nav.contact },
          ].map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              onMouseEnter={() => soundEngine.playHover()}
              data-cursor="GO"
              className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Control Switches: Bilingual [VI | EN] + Hotline Quick Dial */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${PROFILE_INFO.phone.replace(/[^0-9]/g, '')}`}
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

      {/* Main Scrollytelling Content Container */}
      <main className="relative z-30 pt-20 sm:pt-24">

        {/* ========================================================
            ACT 00 // THE OVERTURE (HERO VIEWPORT)
        ======================================================== */}
        <section id="hero" className="relative min-h-[92vh] flex flex-col justify-center px-4 sm:px-10 lg:px-16 py-12 sm:py-20 overflow-hidden">
          
          {/* Top Status Capsule */}
          <div className="w-full flex flex-wrap items-center justify-between gap-4 mb-8">
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

          {/* Core Kinetic Monolith Typography */}
          <div className="space-y-6 max-w-5xl">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-[#a3e635] tracking-[0.3em] uppercase">
                {PROFILE_INFO.alias} // {t.hero.role}
              </span>
              <span className="h-px w-16 bg-[#a3e635]/30"></span>
            </div>

            {/* SEO Semantic H1 Header */}
            <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] tracking-tight uppercase leading-[0.85] text-white select-none">
              {t.hero.name}
            </h1>

            {/* Editorial High-Fashion Statement */}
            <div className="text-2xl sm:text-4xl md:text-5xl font-light text-zinc-300 leading-tight pt-2">
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

            <p className="max-w-2xl text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
              {t.hero.bio}
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#career-tour"
                onClick={(e) => handleNavClick(e, 'career-tour')}
                data-cursor="TOUR"
                className="px-8 py-4 rounded-full bg-white text-black font-display font-black text-xs uppercase tracking-widest hover:bg-[#a3e635] transition-all duration-300 flex items-center gap-2 group shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                data-cursor="CONTACT"
                className="px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-mono text-xs uppercase tracking-widest transition-all"
              >
                {t.hero.contactBtn}
              </a>
            </div>
          </div>
        </section>


        {/* ========================================================
            ACT 01 // CHRONOLOGICAL CAREER TOUR (2019 → 2026)
        ======================================================== */}
        <section id="career-tour" className="px-4 sm:px-10 lg:px-16 py-20 sm:py-28 border-t border-white/[0.06] relative">
          <CareerTour3D />
        </section>


        {/* ========================================================
            ACT 02 // FEATURED VENTURE: HIDDEN MUSIC PLATFORM
        ======================================================== */}
        <section id="featured-venture" className="px-4 sm:px-10 lg:px-16 py-20 sm:py-28 border-t border-white/[0.06] relative">
          <HiddenMusicShowcase />
        </section>


        {/* ========================================================
            ACT 03 // CORE CAPABILITIES & MANAGEMENT MATRIX
        ======================================================== */}
        <section id="capabilities" className="px-4 sm:px-10 lg:px-16 py-24 sm:py-32 border-t border-white/[0.06] relative">
          <div className="max-w-5xl mx-auto">
            
            <div className="mb-14">
              <span className="font-mono text-xs text-[#a3e635] tracking-widest uppercase block mb-2">
                {t.capabilities.badge}
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
                {t.capabilities.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.capabilities.pillars.map((pillar, idx) => (
                <div 
                  key={idx}
                  data-cursor="CORE"
                  className="p-8 rounded-[2rem] bg-[#07090e]/95 border border-white/10 hover:border-[#a3e635]/40 transition-all duration-300 group"
                >
                  <span className="font-mono text-xs text-[#a3e635] block mb-4">0{idx + 1} // FOCUS</span>
                  <h3 className="font-display font-bold text-xl text-white uppercase mb-3 group-hover:text-[#a3e635] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ========================================================
            ACT 04 // ACADEMIC FOUNDATION (EDITORIAL TIMELINE)
        ======================================================== */}
        <section id="education" className="px-4 sm:px-10 lg:px-16 py-24 sm:py-32 border-t border-white/[0.06] relative">
          <div className="max-w-5xl mx-auto">
            
            <div className="mb-14">
              <span className="font-mono text-xs text-[#a3e635] tracking-widest uppercase block mb-2">
                {t.education.badge}
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
                {t.education.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {EDUCATION_DATA.map((edu, idx) => {
                const school = locale === 'vi' ? edu.schoolVi : edu.schoolEn;
                const major = locale === 'vi' ? edu.majorVi : edu.majorEn;
                const status = locale === 'vi' ? edu.statusVi : edu.statusEn;

                return (
                  <div 
                    key={idx}
                    data-cursor="ACAD"
                    className="p-8 rounded-[2rem] bg-[#07090e]/95 border border-white/10 hover:border-white/20 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-[#a3e635] uppercase">{edu.year}</span>
                      {status && (
                        <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/5">
                          {status}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-xl text-white uppercase group-hover:text-[#a3e635] transition-colors">{school}</h3>
                    <p className="font-serif italic text-sm text-zinc-400 mt-2">{major}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* ========================================================
            ACT 05 // DIRECT INITIATION & EMAIL DISPATCH
        ======================================================== */}
        <section id="contact" className="px-4 sm:px-10 lg:px-16 py-24 sm:py-36 relative overflow-hidden border-t border-white/[0.06]">
          <DirectDispatch />
        </section>

      </main>

      {/* ========================================================
          FOOTER (MINIMALIST & CLEAN)
      ======================================================== */}
      <footer className="px-4 sm:px-10 lg:px-16 py-10 border-t border-white/[0.04] bg-[#030305] text-xs font-mono text-zinc-500 relative z-30">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © 2026 NGÔ PHÚC (POSTLAIN). ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6 text-zinc-400">
            <a href="mailto:studionopu@gmail.com" className="hover:text-[#a3e635] transition-colors">studionopu@gmail.com</a>
            <a href="tel:0938649420" className="hover:text-[#a3e635] transition-colors">0938-649-420</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
