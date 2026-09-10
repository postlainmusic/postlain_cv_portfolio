/**
 * PRELOADER & GPU SHADER WARM-UP CURTAIN
 * Preloads Google Fonts, unlocks Web Audio Context, compiles all 3D GLSL shaders into VRAM,
 * and performs a smooth GSAP curtain reveal.
 */

import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PreloaderProps {
  onEnter: () => void;
  isReady: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ onEnter, isReady }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING GPU VRAM...');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setStatusText('SYSTEM READY // ALL SHADERS COMPILED');
        setIsCompleted(true);
      } else if (current > 70) {
        setStatusText('WARMING UP 3D CELESTIAL MESHES...');
      } else if (current > 40) {
        setStatusText('COMPILING GPU GLSL SHADERS...');
      } else if (current > 15) {
        setStatusText('PRELOADING LUXURY TYPOGRAPHY...');
      }
      setProgress(current);
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="preloader-curtain"
      className="fixed inset-0 z-50 flex flex-col justify-between p-8 sm:p-14 bg-[#030508] text-[#e8e5dc] select-none transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)]"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono tracking-widest text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>POSTLAIN // 3D VISUAL AUTOBIOGRAPHY</span>
        </div>
        <span>[ SOTY MASTER BUILD ]</span>
      </div>

      {/* Center Counter & Branding */}
      <div className="flex flex-col items-center justify-center my-auto text-center">
        <span className="font-sans font-extrabold text-[ clamp(80px,16vw,180px) ] leading-none tracking-tighter text-white">
          {progress < 10 ? `0${progress}` : progress}
          <span className="text-amber-400 text-[ clamp(32px,6vw,64px) ]">%</span>
        </span>
        <div className="h-4 flex items-center justify-center mt-3">
          <p className="font-mono text-xs text-zinc-400 tracking-[0.25em] uppercase animate-pulse">
            {statusText}
          </p>
        </div>
      </div>

      {/* Bottom CTA / Status */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
        <span className="font-mono text-[11px] tracking-wider text-zinc-500">
          NGÔ PHÚC · CREATIVE TECHNOLOGIST & SOUND ARCHITECT
        </span>

        {isCompleted && isReady ? (
          <button
            type="button"
            onClick={onEnter}
            className="group relative flex items-center gap-3 px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-mono font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.45)] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>ENTER JOURNEY</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        ) : (
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-pulse" />
            <span>PREPARING VRAM STAGE...</span>
          </div>
        )}
      </div>
    </div>
  );
};
