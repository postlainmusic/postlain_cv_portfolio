import React from 'react';
import { Volume2, VolumeX, Globe, ArrowUpRight } from 'lucide-react';
import { AppleAudio } from '../../audio/AppleHapticAudio';

interface SOTYNavbarProps {
  lang: 'vi' | 'en';
  setLang: (lang: 'vi' | 'en') => void;
  isSoundOn: boolean;
  setIsSoundOn: (on: boolean) => void;
  onGoToGenesis: () => void;
  onGoToContact: () => void;
}

export const SOTYNavbar: React.FC<SOTYNavbarProps> = ({
  lang,
  setLang,
  isSoundOn,
  setIsSoundOn,
  onGoToGenesis,
  onGoToContact,
}) => {
  const handleSoundToggle = () => {
    const nextState = !isSoundOn;
    setIsSoundOn(nextState);
    AppleAudio.setSoundEnabled(nextState);
  };

  const handleLangToggle = () => {
    AppleAudio.playClick(1400);
    setLang(lang === 'vi' ? 'en' : 'vi');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between pointer-events-none">
      {/* Brand Monogram */}
      <button
        type="button"
        onClick={() => {
          AppleAudio.playClick();
          onGoToGenesis();
        }}
        onMouseEnter={() => AppleAudio.playClick(1600, 0.015)}
        className="pointer-events-auto flex items-center gap-3 px-4 py-2 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 hover:border-white/25 backdrop-blur-2xl transition-all duration-300 group"
      >
        <span className="font-display font-black text-xs sm:text-sm tracking-widest text-white uppercase group-hover:text-amber-300 transition-colors">
          NGÔ PHÚC
        </span>
        <span className="text-[10px] font-mono tracking-wider text-zinc-400 group-hover:text-zinc-200 transition-colors">
          [POSTLAIN]
        </span>
      </button>

      {/* Right Controls: Sound & Language & Contact CTA */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Sound Toggle */}
        <button
          type="button"
          onClick={handleSoundToggle}
          onMouseEnter={() => AppleAudio.playClick(1600, 0.01)}
          aria-label={isSoundOn ? 'Tắt âm thanh' : 'Bật âm thanh'}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 hover:border-white/25 backdrop-blur-2xl text-xs font-mono tracking-wider transition-all duration-200"
        >
          {isSoundOn ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="hidden sm:inline text-amber-300 text-[11px]">SOUND ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
              <span className="hidden sm:inline text-zinc-500 text-[11px]">SOUND OFF</span>
            </>
          )}
        </button>

        {/* Language Switcher */}
        <button
          type="button"
          onClick={handleLangToggle}
          onMouseEnter={() => AppleAudio.playClick(1600, 0.01)}
          aria-label="Chuyển đổi ngôn ngữ Tiếng Việt và Tiếng Anh"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 hover:border-white/25 backdrop-blur-2xl text-xs font-mono tracking-wider text-zinc-300 hover:text-white transition-all duration-200"
        >
          <Globe className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-[11px] font-semibold">{lang.toUpperCase()}</span>
        </button>

        {/* Direct Contact Button */}
        <button
          type="button"
          onClick={() => {
            AppleAudio.playCardSnap();
            onGoToContact();
          }}
          onMouseEnter={() => AppleAudio.playClick(1600, 0.01)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black hover:bg-amber-300 font-mono text-xs font-bold tracking-wider transition-all duration-300 shadow-lg shadow-white/10"
        >
          <span>{lang === 'vi' ? 'LIÊN HỆ' : 'CONTACT'}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
