import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Phone, Mail, ArrowUpRight, Copy, Check, RotateCcw, Clock, Sparkles } from 'lucide-react';
import { APPLE_CONTENT } from '../../content/appleContent';
import { AppleAudio } from '../../audio/AppleHapticAudio';

interface SOTYSession04TerminalProps {
  lang: 'vi' | 'en';
  onShowToast: (msg: string) => void;
  onRestart: () => void;
  isActive: boolean;
}

export const SOTYSession04Terminal: React.FC<SOTYSession04TerminalProps> = ({
  lang,
  onShowToast,
  onRestart,
  isActive,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = APPLE_CONTENT.contact;

  const [timeStr, setTimeStr] = useState('');
  const [copiedType, setCopiedType] = useState<'hotline' | 'email' | null>(null);

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
      setTimeStr(new Intl.DateTimeFormat('en-GB', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.terminal-reveal',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive, lang]);

  const handleCopy = (text: string, type: 'hotline' | 'email') => {
    navigator.clipboard.writeText(text).catch(() => {});
    AppleAudio.playClick(1800, 0.03);
    setCopiedType(type);
    const msg =
      type === 'hotline'
        ? data.copyHotlineSuccess[lang]
        : data.copyEmailSuccess[lang];
    onShowToast(msg);
    setTimeout(() => {
      setCopiedType(null);
    }, 2500);
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-16 lg:pt-20 pb-5 transition-opacity duration-700 overflow-y-auto sm:overflow-hidden ${
        isActive ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'
      }`}
    >
      {/* Top Meta Bar */}
      <div className="terminal-reveal w-full max-w-7xl mx-auto flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
            {data.sectionBadge}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
          <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>ĐÀ LẠT ICT: {timeStr}</span>
        </div>
      </div>

      {/* Main Editorial Body (Split Screen Layout, Zero Cards) */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 my-auto py-2">
        {/* Left Column: Monumental Headline & Narrative Footnote */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <p className="terminal-reveal text-[10px] sm:text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              {lang === 'vi' ? '[04 // KÊNH LIÊN HỆ TRỰC TIẾP]' : '[04 // DIRECT DISPATCH CHANNELS]'}
            </p>
            <h2 className="terminal-reveal text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase leading-[0.95]">
              {data.title[lang]}
            </h2>
            <p className="terminal-reveal text-xs sm:text-sm font-body text-zinc-400 leading-relaxed max-w-md pt-1">
              {data.subtitle[lang]}
            </p>
          </div>

          {/* Hidden Music Venture Portal - Pure Editorial Footnote */}
          <div className="terminal-reveal pt-4 border-t border-white/10 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                SONIC ARTISTRY VENTURE
              </span>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-display font-bold text-white uppercase tracking-wider">
                {data.hiddenMusicTitle}
              </h3>
              <p className="text-[11px] sm:text-xs font-body text-zinc-400 pt-0.5 line-clamp-2">
                {data.hiddenMusicDesc[lang]}
              </p>
            </div>
            <a
              href="https://hiddenmusic.postlain.id.vn/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => AppleAudio.playClick(1600, 0.015)}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-white hover:text-[#D4AF37] transition-colors group"
            >
              <span className="border-b border-white/30 group-hover:border-[#D4AF37] pb-0.5">
                hiddenmusic.postlain.id.vn
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Massive Typographic Contact Monoliths (Card-Free) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:border-l lg:border-white/10 lg:pl-12">
          {/* Item 01: Hotline / Zalo Direct Line */}
          <div className="terminal-reveal space-y-2 group">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
              <span>01 // DIRECT LINE & ZALO</span>
              <span className="text-zinc-400 group-hover:text-[#D4AF37] transition-colors">[VIETNAM GMT+7]</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <a
                href={`tel:${data.hotline}`}
                onMouseEnter={() => AppleAudio.playClick(1400, 0.01)}
                className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white hover:text-[#D4AF37] transition-colors"
              >
                {data.hotline}
              </a>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopy(data.hotline, 'hotline')}
                  onMouseEnter={() => AppleAudio.playClick(1400, 0.01)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] font-mono text-xs tracking-wider transition-all duration-300"
                >
                  {copiedType === 'hotline' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{lang === 'vi' ? 'ĐÃ CHÉP' : 'COPIED'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'vi' ? 'SAO CHÉP' : 'COPY'}</span>
                    </>
                  )}
                </button>
                <a
                  href={`tel:${data.hotline}`}
                  onMouseEnter={() => AppleAudio.playClick(1400, 0.01)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-[#D4AF37] font-mono text-xs font-bold tracking-wider transition-all duration-300"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{lang === 'vi' ? 'GỌI' : 'CALL'}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="terminal-reveal w-full h-[1px] bg-white/10" />

          {/* Item 02: Official Dispatch Inbox */}
          <div className="terminal-reveal space-y-2 group">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
              <span>02 // OFFICIAL INBOX & DISPATCH</span>
              <span className="text-zinc-400 group-hover:text-[#D4AF37] transition-colors">[GLOBAL ENQUIRIES]</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <a
                href={`mailto:${data.email}`}
                onMouseEnter={() => AppleAudio.playClick(1400, 0.01)}
                className="text-lg sm:text-2xl lg:text-3xl font-display font-bold tracking-tight text-white hover:text-[#D4AF37] transition-colors break-all"
              >
                {data.email}
              </a>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopy(data.email, 'email')}
                  onMouseEnter={() => AppleAudio.playClick(1400, 0.01)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] font-mono text-xs tracking-wider transition-all duration-300"
                >
                  {copiedType === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{lang === 'vi' ? 'ĐÃ CHÉP' : 'COPIED'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'vi' ? 'SAO CHÉP' : 'COPY'}</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${data.email}`}
                  onMouseEnter={() => AppleAudio.playClick(1400, 0.01)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-[#D4AF37] font-mono text-xs font-bold tracking-wider transition-all duration-300"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{lang === 'vi' ? 'GỬI MAIL' : 'EMAIL'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer & Navigation */}
      <div className="terminal-reveal w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10 text-[11px] sm:text-xs font-mono text-zinc-400">
        <div>
          <span>{data.location[lang]}</span>
        </div>

        <div className="text-center">
          <span className="text-zinc-400">© 2026 NGÔ PHÚC (POSTLAIN). HAUTE-COUTURE SOTY STANDARD.</span>
        </div>

        <button
          type="button"
          onClick={onRestart}
          onMouseEnter={() => AppleAudio.playClick(1400, 0.01)}
          className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors group"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37] group-hover:-rotate-90 transition-transform duration-500" />
          <span className="tracking-wider">{lang === 'vi' ? 'VỀ KHỞI NGUYÊN' : 'RETURN TO GENESIS'}</span>
        </button>
      </div>
    </div>
  );
};
