import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { AppleAudio } from '../../audio/AppleHapticAudio';

interface ApplePreloaderProps {
  onComplete: (soundEnabled: boolean) => void;
  lang: 'vi' | 'en';
}

export const ApplePreloader: React.FC<ApplePreloaderProps> = ({ onComplete, lang }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [soundPref, setSoundPref] = useState<boolean>(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setIsReady(true);
        clearInterval(interval);
      } else {
        setProgress(current);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = (withSound: boolean) => {
    setIsExiting(true);
    AppleAudio.setSoundEnabled(withSound);
    if (withSound) {
      AppleAudio.playPowerOnSweep();
    }
    setTimeout(() => {
      onComplete(withSound);
    }, 600);
  };

  return (
    <div
      id="preloader-curtain"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-8 sm:p-16 bg-[#050505] text-white transition-all duration-700 ease-out ${
        isExiting ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Header */}
      <div className="w-full max-w-5xl flex items-center justify-between text-xs font-mono tracking-widest text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>NGÔ PHÚC // POSTLAIN</span>
        </div>
        <div>
          <span>{lang === 'vi' ? 'KHỞI TẠO HỆ THỐNG' : 'SYSTEM INITIALIZATION'}</span>
        </div>
      </div>

      {/* Center Typographic Core */}
      <div className="flex flex-col items-center text-center max-w-2xl space-y-8">
        <div className="space-y-3">
          <p className="text-xs sm:text-sm font-mono tracking-widest text-zinc-400 uppercase">
            {lang === 'vi' ? 'KIẾN TRÚC SƯ KÉP' : 'THE DUAL-ENGINE ARCHITECT'}
          </p>
          <h1 className="text-4xl sm:text-7xl font-display font-black tracking-tight text-white uppercase">
            NGÔ PHÚC
          </h1>
          <p className="text-sm sm:text-base font-body text-zinc-400 max-w-lg mx-auto">
            {lang === 'vi'
              ? 'Quản lí bằng logic. Thổi hồn bằng nghệ thuật.'
              : 'Led by logic. Elevated by art.'}
          </p>
        </div>

        {/* Progress Counter */}
        <div className="w-full max-w-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>{isReady ? 'READY' : 'LOADING'}</span>
            <span className="text-white font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-200 rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Ready Actions */}
        {isReady && (
          <div className="pt-4 space-y-6 animate-fade-in">
            {/* Sound Preference Pills */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSoundPref(true);
                  AppleAudio.playClick(1400);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono transition-all duration-200 ${
                  soundPref
                    ? 'bg-amber-400/15 border-amber-400/60 text-amber-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'BẬT ÂM THANH' : 'SOUND ON'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSoundPref(false);
                  AppleAudio.playClick(1000);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono transition-all duration-200 ${
                  !soundPref
                    ? 'bg-zinc-800 border-zinc-600 text-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'TẮT ÂM' : 'MUTE'}</span>
              </button>
            </div>

            {/* Primary Enter Button */}
            <button
              type="button"
              onClick={() => handleEnter(soundPref)}
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black hover:bg-amber-300 font-mono text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-2xl shadow-white/20"
            >
              <span>{lang === 'vi' ? 'KHÁM PHÁ HÀNH TRÌNH' : 'ENTER PORTFOLIO'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Footer */}
      <div className="w-full max-w-5xl flex items-center justify-between text-[11px] font-mono tracking-widest text-zinc-400">
        <span>ĐÀ LẠT, VIỆT NAM</span>
        <span>CV 2026 // EDITION</span>
      </div>
    </div>
  );
};
