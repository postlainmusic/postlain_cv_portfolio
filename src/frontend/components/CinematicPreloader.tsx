import React, { useEffect, useState } from 'react';

interface CinematicPreloaderProps {
  onComplete: () => void;
}

export const CinematicPreloader: React.FC<CinematicPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1800; // 1.8s intro sequence

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 600); // allow fade out transition
        }, 200);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#030305] flex flex-col items-center justify-between p-8 sm:p-12 transition-all duration-700 pointer-events-auto ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Preloader Status */}
      <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
        <span>POSTLAIN DIGITAL EXPERIENCE // 2026</span>
        <span className="text-[#a3e635]">ĐÀ LẠT • CLOUDFLARE EDGE</span>
      </div>

      {/* Center Cinematic Liquid Chrome Orb */}
      <div className="flex flex-col items-center justify-center space-y-8 my-auto">
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
          {/* Pulsing chromatic halo */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00f2fe]/20 via-[#a855f7]/20 to-[#a3e635]/20 blur-2xl animate-pulse" />
          
          {/* Outer rotating dashed ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-[spin_8s_linear_infinite]" />
          
          {/* Inner counter-rotating neon ring */}
          <div className="absolute inset-3 rounded-full border border-t-[#a3e635] border-r-[#00f2fe] border-b-transparent border-l-transparent animate-[spin_3s_linear_infinite_reverse]" />

          {/* Central chrome metallic sphere */}
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-zinc-200 via-zinc-600 to-zinc-950 border border-white/40 shadow-[0_0_40px_rgba(163,230,53,0.3)] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.8),transparent_60%)]" />
            <span className="font-mono font-bold text-xs text-black tracking-widest">
              {String(progress).padStart(2, '0')}%
            </span>
          </div>
        </div>

        {/* Cinematic Monospace Readout (inspired by sidewave.it) */}
        <div className="text-center space-y-2 max-w-md">
          <p className="font-mono text-xs sm:text-sm text-zinc-300 tracking-[0.2em] uppercase">
            PREPARING THE CONTENT. GOOD THINGS TAKE A FEW MILLISECONDS.
          </p>
          <p className="font-mono text-[10px] text-zinc-600 tracking-widest">
            INITIALIZING 3D SPATIAL ENGINE & ACOUSTIC SHADERS...
          </p>
        </div>
      </div>

      {/* Bottom Sleek 1px Progress Line */}
      <div className="w-full max-w-xl space-y-3">
        <div className="w-full h-px bg-white/10 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#00f2fe] via-[#a855f7] to-[#a3e635] transition-all duration-75 ease-out shadow-[0_0_10px_#a3e635]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <span>STATUS: LOADING ASSETS</span>
          <button
            onClick={() => {
              setIsExiting(true);
              setTimeout(onComplete, 300);
            }}
            className="text-zinc-400 hover:text-white uppercase tracking-wider underline cursor-pointer"
          >
            [SKIP INTRO]
          </button>
        </div>
      </div>
    </div>
  );
};
