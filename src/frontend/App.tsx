import React, { useEffect, useState } from 'react';
import { 
  ArrowUpRight, Sparkles, Disc, Terminal, ShieldCheck, 
  Cpu, Music2, Flame, MapPin, Mail, Phone, ExternalLink,
  ChevronDown, Layers, Award, Zap, Volume2, VolumeX, Globe, Copy, Check
} from 'lucide-react';
import { usePortfolioStore } from './stores/usePortfolioStore';
import { soundEngine } from './lib/audio';
import { ScrollyScene3D } from './components/ScrollyScene3D';
import { SonicDeck } from './components/SonicDeck';
import { EdgeDispatch } from './components/EdgeDispatch';
import { 
  DICTIONARY, 
  EXPERIENCES_DATA, 
  SKILL_GROUPS_DATA, 
  EDUCATION_DATA 
} from './constants/dictionary';

export const App: React.FC = () => {
  const { locale, toggleLocale, soundEnabled, toggleSound } = usePortfolioStore();
  const t = DICTIONARY[locale];

  const [activeExp, setActiveExp] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Track cursor spotlight for desktop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  const handleCopy = (text: string, key: string) => {
    soundEngine.playClick(880);
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

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
      
      {/* 1. Ambient Background 3D Canvas with Mobile FPS optimization */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-85">
        <ScrollyScene3D />
      </div>

      {/* 2. Interactive Cursor Spotlight (Desktop only) */}
      <div 
        className="pointer-events-none fixed z-10 transition-transform duration-75 ease-out rounded-full blur-[140px] opacity-25 bg-gradient-to-r from-[#00f2fe] via-[#a855f7] to-[#a3e635] hidden sm:block"
        style={{
          width: '500px',
          height: '500px',
          left: `${mousePos.x - 250}px`,
          top: `${mousePos.y - 250}px`,
        }}
      />

      {/* 3. Subtle Film Grain Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 z-20 opacity-[0.035] mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* 4. Awwwards Minimalist Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-10 py-4 sm:py-5 flex items-center justify-between backdrop-blur-xl bg-[#030305]/70 border-b border-white/[0.06]">
        {/* Monogram Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, 'hero')}
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
              {locale === 'vi' ? 'Đà Lạt • Vận Hành & AI' : 'Da Lat • Ops & AI'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {[
            { id: 'manifesto', label: t.nav.overview },
            { id: 'experience', label: t.nav.experience },
            { id: 'skills', label: t.nav.skills },
            { id: 'education', label: t.nav.education },
            { id: 'contact', label: t.nav.contact },
          ].map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              onMouseEnter={() => soundEngine.playHover()}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Control Switches: Bilingual [VI | EN] + Audio Engine */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono uppercase tracking-widest text-zinc-300 hover:text-white transition-all"
            title="Switch Language / Chuyển Ngôn Ngữ"
          >
            <Globe className="w-3.5 h-3.5 text-[#a3e635]" />
            <span className={locale === 'vi' ? 'text-[#a3e635] font-bold' : 'text-zinc-500'}>VI</span>
            <span className="text-zinc-600">/</span>
            <span className={locale === 'en' ? 'text-[#a3e635] font-bold' : 'text-zinc-500'}>EN</span>
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
              soundEnabled 
                ? 'bg-[#a3e635]/15 border-[#a3e635]/40 text-[#a3e635] shadow-[0_0_15px_rgba(163,230,53,0.2)]' 
                : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-zinc-200'
            }`}
            title={soundEnabled ? t.nav.soundOff : t.nav.soundOn}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden sm:inline">{t.nav.soundOn}</span>
                {/* Micro Equalizer Animation */}
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-[#a3e635] animate-[bounce_0.8s_infinite] h-full" />
                  <span className="w-0.5 bg-[#a3e635] animate-[bounce_0.5s_infinite] h-2/3" />
                  <span className="w-0.5 bg-[#a3e635] animate-[bounce_0.7s_infinite] h-4/5" />
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.nav.soundOff}</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Scrollytelling Content Container */}
      <main className="relative z-30 pt-24 sm:pt-28">

        {/* ========================================================
            HERO SECTION: MONUMENTAL TYPOGRAPHY & SCENE 3D
        ======================================================== */}
        <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between px-4 sm:px-10 lg:px-16 pt-8 pb-12 overflow-hidden">
          
          {/* Top Status Capsule */}
          <div className="flex flex-wrap items-center justify-between gap-4">
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
              <span>ĐÀ LẠT, VIỆT NAM (GMT+7):</span>
              <span className="text-zinc-300 font-bold">{currentTime || '12:00:00'}</span>
            </div>
          </div>

          {/* Core Kinetic Monolith Typography */}
          <div className="my-auto py-12">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-mono text-[#a3e635] tracking-[0.3em] uppercase">
                  {t.hero.alias}
                </span>
                <span className="h-px w-12 bg-[#a3e635]/40"></span>
                <span className="text-xs sm:text-sm font-mono text-zinc-400 tracking-widest uppercase">
                  {t.hero.subtitle}
                </span>
              </div>

              {/* Primary Name: NGÔ PHÚC in Montserrat ExtraBold - Zero Font Breaking! */}
              <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] tracking-tight uppercase leading-[0.88] text-white">
                {t.hero.name}
              </h1>
            </div>

            <p className="mt-8 max-w-2xl text-base sm:text-xl text-zinc-400 font-light leading-relaxed">
              {t.hero.bio}
            </p>

            {/* Call to action & Direct contact triggers */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#experience"
                onClick={(e) => handleNavClick(e, 'experience')}
                className="px-7 py-3.5 rounded-full bg-white text-black font-display font-black text-xs uppercase tracking-widest hover:bg-[#a3e635] transition-all duration-300 flex items-center gap-2 group shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                <span>{locale === 'vi' ? 'Khám Phá Hành Trình' : 'Explore Odyssey'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="px-7 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-mono text-xs uppercase tracking-widest transition-all"
              >
                {locale === 'vi' ? 'Liên Hệ Trực Tiếp' : 'Get In Touch'}
              </a>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-8 border-t border-white/[0.06]">
            {[
              { label: t.hero.stats.domain, val: t.hero.stats.domainVal },
              { label: t.hero.stats.art, val: t.hero.stats.artVal },
              { label: t.hero.stats.tech, val: t.hero.stats.techVal },
              { label: t.hero.stats.location, val: t.hero.stats.locationVal },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">{stat.label}</span>
                <span className="font-display font-bold text-xs sm:text-sm text-zinc-200 block truncate">{stat.val}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            POSTLAIN SONIC LAB // INTERACTIVE AUDIO & BEAT ENGINE
        ======================================================== */}
        <section className="px-4 sm:px-10 lg:px-16 py-8 sm:py-12 border-t border-white/[0.06] relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#a3e635]" />
                <span className="font-mono text-xs text-[#a3e635] uppercase tracking-widest font-bold">
                  {locale === 'vi' ? 'KHÔNG GIAN ÂM THANH & SẢN XUẤT' : 'INTERACTIVE SONIC LAB'}
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
                {locale === 'vi' ? 'Bật Beat & Chạm Pad để chơi nhạc trực tiếp' : 'Drop the beat & jam on live pads'}
              </span>
            </div>
            <SonicDeck />
          </div>
        </section>


        {/* ========================================================
            CHAPTER 01 // MANIFESTO: OPERATING THESIS
        ======================================================== */}
        <section id="manifesto" className="px-4 sm:px-10 lg:px-16 py-28 sm:py-36 border-t border-white/[0.06] relative">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-[#a3e635] tracking-widest uppercase">
                {t.manifesto.badge}
              </span>
              <span className="h-px flex-1 bg-white/[0.06] max-w-xs"></span>
            </div>

            {/* Split Editorial Typography */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-7">
                <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight leading-[0.95]">
                  <span>{t.manifesto.title1}</span><br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] via-emerald-400 to-cyan-400">
                    {t.manifesto.title2}
                  </span>
                </h2>
              </div>

              <div className="lg:col-span-5">
                <blockquote className="text-zinc-300 text-base sm:text-lg font-light leading-relaxed border-l-2 border-[#a3e635] pl-6 italic">
                  "{t.manifesto.quote}"
                </blockquote>
              </div>
            </div>

            {/* 3 Core Operating Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 sm:mt-24">
              {t.manifesto.pillars.map((pillar, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-[#a3e635]/30 hover:bg-white/[0.04] transition-all duration-300 group"
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
            CHAPTER 02 // EXPERIENCE ODYSSEY: SCROLLYTELLING
        ======================================================== */}
        <section id="experience" className="px-4 sm:px-10 lg:px-16 py-28 sm:py-36 border-t border-white/[0.06] relative">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="max-w-2xl mb-16 sm:mb-20">
              <span className="font-mono text-xs text-[#a3e635] tracking-widest uppercase block mb-3">
                {t.experiences.badge}
              </span>
              <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
                {t.experiences.title}
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base font-light mt-4">
                {t.experiences.desc}
              </p>
            </div>

            {/* Scrollytelling Interactive Experience List */}
            <div className="space-y-4">
              {EXPERIENCES_DATA.map((item, idx) => {
                const isActive = activeExp === idx;
                const role = locale === 'vi' ? item.roleVi : item.roleEn;
                const company = locale === 'vi' ? item.companyVi : item.companyEn;
                const tag = locale === 'vi' ? item.tagVi : item.tagEn;
                const highlights = locale === 'vi' ? item.highlightsVi : item.highlightsEn;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      soundEngine.playClick(500 + idx * 75);
                      setActiveExp(idx);
                    }}
                    onMouseEnter={() => soundEngine.playHover()}
                    className={`cursor-pointer rounded-3xl border transition-all duration-500 overflow-hidden ${
                      isActive 
                        ? 'bg-white/[0.04] border-[#a3e635]/50 shadow-[0_10px_40px_rgba(0,0,0,0.5)]' 
                        : 'bg-white/[0.015] border-white/[0.05] hover:border-white/20 hover:bg-white/[0.03]'
                    }`}
                  >
                    {/* Header Row */}
                    <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start sm:items-center gap-4">
                        <span className="font-mono text-xs sm:text-sm px-2.5 py-1 rounded bg-white/[0.05] text-[#a3e635] border border-[#a3e635]/20 font-bold">
                          {item.episode}
                        </span>
                        <div>
                          <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                            {role}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-sm font-medium text-zinc-300">{company}</span>
                            <span className="text-zinc-600">•</span>
                            <span className="text-xs font-mono text-zinc-500">{item.period}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-3">
                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
                          {tag}
                        </span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-transform duration-300 ${
                          isActive ? 'rotate-180 bg-[#a3e635] border-[#a3e635] text-black' : 'border-white/10 text-zinc-400'
                        }`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Expandable Body Drawer */}
                    {isActive && (
                      <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-white/[0.05]">
                        <div className="mt-4 space-y-3 max-w-4xl">
                          <span className="font-mono text-[11px] text-[#a3e635] uppercase tracking-widest block">
                            {highlights.length} {t.experiences.itemsCount}
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                            {highlights.map((point, pIdx) => (
                              <div key={pIdx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/[0.04]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] mt-2 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                                  {point}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* ========================================================
            CHAPTER 03 // SKILLS & AI ECOSYSTEM
        ======================================================== */}
        <section id="skills" className="px-4 sm:px-10 lg:px-16 py-28 sm:py-36 border-t border-white/[0.06] relative">
          <div className="max-w-7xl mx-auto">
            
            <div className="max-w-2xl mb-16 sm:mb-20">
              <span className="font-mono text-xs text-[#a3e635] tracking-widest uppercase block mb-3">
                {t.skills.badge}
              </span>
              <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
                {t.skills.title}
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base font-light mt-4">
                {t.skills.desc}
              </p>
            </div>

            {/* 3 Domain Matrix Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SKILL_GROUPS_DATA.map((grp, idx) => {
                const category = locale === 'vi' ? grp.categoryVi : grp.categoryEn;
                const level = locale === 'vi' ? grp.levelVi : grp.levelEn;

                return (
                  <div 
                    key={idx}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-[#a3e635]/40 hover:bg-white/[0.035] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs text-zinc-500 uppercase">CLUSTER 0{idx + 1}</span>
                        <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#a3e635]/10 text-[#a3e635] border border-[#a3e635]/20 font-bold">
                          {level}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-xl text-white uppercase mb-6 tracking-tight">
                        {category}
                      </h3>
                      <div className="space-y-3">
                        {grp.skills.map((skill, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300 font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                      <span>{locale === 'vi' ? 'Sẵn sàng triển khai' : 'Deploy Ready'}</span>
                      <Zap className="w-3.5 h-3.5 text-[#a3e635]" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Autonomous AI Operations Thesis Card */}
            <div className="mt-8 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0e131d] via-[#050608] to-[#030305] border border-[#a3e635]/20 relative overflow-hidden">
              <div className="max-w-3xl space-y-4 relative z-10">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#a3e635]" />
                  <span className="font-mono text-xs text-[#a3e635] uppercase tracking-widest">
                    {t.skills.thesisTitle}
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase">
                  {locale === 'vi' ? 'KIẾN TRÚC TỰ ĐỘNG HÓA THÔNG MINH' : 'INTELLIGENT AUTONOMOUS ARCHITECTURE'}
                </h3>
                <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
                  {t.skills.thesisDesc}
                </p>
              </div>

              {/* Decorative Subtle Background Circuit */}
              <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none bg-[radial-gradient(#a3e635_1px,transparent_1px)] [background-size:20px_20px]" />
            </div>
          </div>
        </section>


        {/* ========================================================
            CHAPTER 04 // EDUCATION & ROOTS
        ======================================================== */}
        <section id="education" className="px-4 sm:px-10 lg:px-16 py-28 sm:py-36 border-t border-white/[0.06] relative">
          <div className="max-w-7xl mx-auto">
            
            <div className="max-w-2xl mb-16">
              <span className="font-mono text-xs text-[#a3e635] tracking-widest uppercase block mb-3">
                {t.education.badge}
              </span>
              <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
                {t.education.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {EDUCATION_DATA.map((edu, idx) => {
                const school = locale === 'vi' ? edu.schoolVi : edu.schoolEn;
                const major = locale === 'vi' ? edu.majorVi : edu.majorEn;
                const status = locale === 'vi' ? edu.statusVi : edu.statusEn;

                return (
                  <div 
                    key={idx}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/20 transition-all"
                  >
                    <span className="font-mono text-xs text-[#a3e635] uppercase">{edu.year}</span>
                    <h3 className="font-display font-bold text-xl text-white uppercase mt-2">{school}</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1">{major}</p>
                    {status && (
                      <span className="inline-block mt-4 text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-white/[0.05] text-zinc-400 border border-white/5">
                        {status}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* ========================================================
            CHAPTER 05 // CONTACT & INVITATION (AWWWARDS FINALE)
        ======================================================== */}
        <section id="contact" className="px-4 sm:px-10 lg:px-16 py-28 sm:py-36 relative overflow-hidden border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <div className="p-8 sm:p-16 lg:p-20 rounded-[2.5rem] bg-[#07090e] border border-white/[0.08] relative overflow-hidden">
              
              {/* Background Ambient Glow */}
              <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-[#a3e635]/15 rounded-full blur-[140px] pointer-events-none" />
              <div className="absolute -left-24 -top-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

              <div className="max-w-4xl space-y-8 relative z-10">
                <span className="font-mono text-xs text-[#a3e635] tracking-widest uppercase block">
                  {t.contact.badge}
                </span>

                <h2 className="font-display font-black text-4xl sm:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-[0.92]">
                  <span>{t.contact.title1}</span><br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] via-emerald-300 to-cyan-400">
                    {t.contact.title2}
                  </span>
                </h2>

                <p className="text-zinc-400 text-sm sm:text-lg font-light leading-relaxed max-w-2xl">
                  {t.contact.desc}
                </p>

                {/* Direct Action Interactive Contact Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  {/* Email Button */}
                  <div className="flex items-center gap-2">
                    <a 
                      href="mailto:postlain.music@gmail.com"
                      onClick={() => soundEngine.playClick(700)}
                      className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-[#a3e635] text-black font-display font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(163,230,53,0.3)]"
                    >
                      <Mail className="w-4 h-4" />
                      <span>postlain.music@gmail.com</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleCopy('postlain.music@gmail.com', 'email')}
                      className="p-4 rounded-full bg-white/[0.05] border border-white/10 hover:bg-white/10 text-zinc-300 hover:text-white transition-all"
                      title={locale === 'vi' ? 'Sao chép email' : 'Copy email'}
                    >
                      {copiedKey === 'email' ? <Check className="w-4 h-4 text-[#a3e635]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Phone Button */}
                  <div className="flex items-center gap-2">
                    <a 
                      href="tel:0377758764"
                      onClick={() => soundEngine.playClick(600)}
                      className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-white/[0.05] border border-white/10 text-white font-mono text-xs sm:text-sm uppercase tracking-wider hover:bg-white/10 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#a3e635]" />
                      <span>0377 758 764</span>
                    </a>
                    <button
                      onClick={() => handleCopy('0377758764', 'phone')}
                      className="p-4 rounded-full bg-white/[0.05] border border-white/10 hover:bg-white/10 text-zinc-300 hover:text-white transition-all"
                      title={locale === 'vi' ? 'Sao chép số điện thoại' : 'Copy phone number'}
                    >
                      {copiedKey === 'phone' ? <Check className="w-4 h-4 text-[#a3e635]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Location Note */}
                <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-500 pt-6">
                  <MapPin className="w-3.5 h-3.5 text-[#a3e635] flex-shrink-0" />
                  <span>{t.contact.locationNote}</span>
                </div>

                {/* Live Cloudflare Worker Edge Dispatch & Contact Form */}
                <div className="pt-8">
                  <EdgeDispatch />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ========================================================
          FOOTER
      ======================================================== */}
      <footer className="px-4 sm:px-10 lg:px-16 py-10 border-t border-white/[0.04] bg-[#030305] text-xs font-mono text-zinc-500 relative z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © 2026 NGÔ PHÚC (POSTLAIN). CRAFTED WITH DISCIPLINE & AESTHETICS.
          </div>
          <div className="flex items-center gap-6 text-zinc-400">
            <span className="hover:text-[#a3e635] transition-colors">AWWWARDS STANDARD</span>
            <span className="hover:text-[#a3e635] transition-colors">CLOUDFLARE EDGE</span>
            <span className="hover:text-[#a3e635] transition-colors">WEB AUDIO API</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
