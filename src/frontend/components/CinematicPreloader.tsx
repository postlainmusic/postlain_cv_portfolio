import React, { useEffect, useState } from 'react';

interface CinematicPreloaderProps {
  onComplete: () => void;
}

export const CinematicPreloader: React.FC<CinematicPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  useEffect(() => {
    // Check if user already saw intro in this session
    if (sessionStorage.getItem('postlain_intro_seen')) {
      onComplete();
      return;
    }

    const startTime = performance.now();
    const duration = 650; // Snappy 0.65s intro (zero annoying delay)

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        sessionStorage.setItem('postlain_intro_seen', 'true');
        setIsExiting(true);
        setTimeout(onComplete, 350);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleDismiss = () => {
    sessionStorage.setItem('postlain_intro_seen', 'true');
    setIsExiting(true);
    setTimeout(onComplete, 200);
  };

  return (
    <div
      onClick={handleDismiss}
      className={`fixed inset-0 z-[100] bg-[#030305] flex flex-col items-center justify-between p-6 sm:p-12 transition-opacity duration-300 pointer-events-auto cursor-pointer ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Preloader Status */}
      <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
        <span>POSTLAIN DIGITAL EXPERIENCE // 2026</span>
        <span className="text-[#a3e635]">ĐÀ LẠT • CLOUDFLARE EDGE</span>
      </div>

      {/* Center Cinematic Liquid Chrome Orb */}
      <div className="flex flex-col items-center justify-center space-y-6 my-auto">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00f2fe]/20 via-[#a855f7]/20 to-[#a3e635]/20 blur-xl animate-pulse" />
          <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-[spin_6s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-t-[#a3e635] border-r-[#00f2fe] border-b-transparent border-l-transparent animate-[spin_2s_linear_infinite_reverse]" />

          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-zinc-200 via-zinc-600 to-zinc-950 border border-white/40 shadow-[0_0_30px_rgba(163,230,53,0.3)] flex items-center justify-center overflow-hidden">
            <span className="font-mono font-bold text-xs text-black tracking-widest">
              {String(progress).padStart(2, '0')}%
            </span>
          </div>
        </div>

        <div className="text-center space-y-1.5 max-w-md">
          <p className="font-mono text-xs sm:text-sm text-zinc-300 tracking-[0.2em] uppercase">
            INITIALIZING POSTLAIN EDGE SYSTEM
          </p>
          <p className="font-mono text-[10px] text-zinc-600 tracking-widest">
            CLICK ANYWHERE TO ENTER IMMEDIATELY
          </p>
        </div>
      </div>

      {/* Bottom Progress Line */}
      <div className="w-full max-w-md space-y-2">
        <div className="w-full h-px bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00f2fe] via-[#a855f7] to-[#a3e635] transition-all duration-75 ease-out shadow-[0_0_10px_#a3e635]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
