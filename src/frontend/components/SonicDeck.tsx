import React, { useEffect, useState, useRef } from 'react';
import { Play, Pause, Disc3, Radio, Volume2, Sparkles, Sliders } from 'lucide-react';
import { soundEngine, TrackMode } from '../lib/audio';
import { usePortfolioStore } from '../stores/usePortfolioStore';

export const SonicDeck: React.FC = () => {
  const { soundEnabled, toggleSound, locale } = usePortfolioStore();
  const [trackMode, setTrackModeState] = useState<TrackMode>('cyber');
  const [activePad, setActivePad] = useState<string | null>(null);
  const [visualizerLevels, setVisualizerLevels] = useState<number[]>(new Array(12).fill(10));
  const rafRef = useRef<number | null>(null);

  // Audio visualizer loop
  useEffect(() => {
    let active = true;

    const updateVisualizer = () => {
      if (soundEnabled && soundEngine.isSoundActive()) {
        const data = soundEngine.getVisualizerData();
        // Sample 12 frequency bins
        const levels = [];
        for (let i = 0; i < 12; i++) {
          const val = data[i * 2] || 0;
          levels.push(Math.max(12, Math.min(100, (val / 255) * 100)));
        }
        setVisualizerLevels(levels);
      } else {
        setVisualizerLevels(new Array(12).fill(10));
      }

      if (active) {
        rafRef.current = requestAnimationFrame(updateVisualizer);
      }
    };

    rafRef.current = requestAnimationFrame(updateVisualizer);

    return () => {
      active = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [soundEnabled]);

  const handleModeChange = (mode: TrackMode) => {
    setTrackModeState(mode);
    soundEngine.setTrackMode(mode);
  };

  const handlePadClick = (type: 'kick' | 'snare' | 'hihat' | 'laser' | 'subdrop') => {
    setActivePad(type);
    soundEngine.playOneShot(type);
    setTimeout(() => setActivePad(null), 180);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#07090e]/90 border border-white/10 backdrop-blur-xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      {/* Background Neon Halo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#a3e635]/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Top Deck Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
              soundEnabled 
                ? 'bg-[#a3e635]/20 border-[#a3e635] text-[#a3e635] shadow-[0_0_20px_rgba(163,230,53,0.3)]' 
                : 'bg-white/[0.03] border-white/10 text-zinc-500'
            }`}>
              <Disc3 className={`w-5 h-5 ${soundEnabled ? 'animate-spin [animation-duration:3s]' : ''}`} />
            </div>
            {soundEnabled && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3e635] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#a3e635]"></span>
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#a3e635] uppercase tracking-widest font-bold">
                POSTLAIN ACOUSTIC ENGINE
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-zinc-400 border border-white/10">
                {trackMode === 'cyber' ? '124 BPM' : '84 BPM'}
              </span>
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base text-white tracking-wide">
              {trackMode === 'cyber' 
                ? 'CYBERPUNK MATRIX (Synthwave Groove)' 
                : 'MIST OVER ROBIN HILL (Lo-Fi Downtempo)'}
            </h4>
          </div>
        </div>

        {/* Master Play/Pause Toggle */}
        <button
          onClick={toggleSound}
          className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full font-display font-black text-xs uppercase tracking-wider transition-all duration-300 ${
            soundEnabled 
              ? 'bg-[#a3e635] text-black hover:bg-white shadow-[0_0_20px_rgba(163,230,53,0.3)]' 
              : 'bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/10'
          }`}
        >
          {soundEnabled ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>{locale === 'vi' ? 'DỪNG NHẠC' : 'STOP AUDIO'}</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{locale === 'vi' ? 'PHÁT NHẠC (BEAT ON)' : 'DROP THE BEAT'}</span>
            </>
          )}
        </button>
      </div>

      {/* Real-time Frequency Visualizer Bar */}
      <div className="pt-5 pb-4">
        <div className="flex items-end justify-between gap-1.5 sm:gap-2 h-16 px-2 bg-black/40 rounded-2xl border border-white/[0.04]">
          {visualizerLevels.map((lvl, idx) => (
            <div
              key={idx}
              className="flex-1 rounded-full transition-all duration-75"
              style={{
                height: `${lvl}%`,
                background: soundEnabled 
                  ? `linear-gradient(to top, #00f2fe, #a855f7, #a3e635)` 
                  : 'rgba(255,255,255,0.06)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Mode Switches & Interactive Soundboard Pads */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2">
        {/* Track Mode Switcher */}
        <div className="md:col-span-5 flex items-center gap-2 bg-white/[0.02] p-1.5 rounded-2xl border border-white/[0.05]">
          <button
            onClick={() => handleModeChange('cyber')}
            className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all ${
              trackMode === 'cyber'
                ? 'bg-[#a3e635] text-black font-bold shadow-[0_0_15px_rgba(163,230,53,0.3)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            ⚡ Synthwave 124
          </button>
          <button
            onClick={() => handleModeChange('lofi')}
            className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all ${
              trackMode === 'lofi'
                ? 'bg-[#a3e635] text-black font-bold shadow-[0_0_15px_rgba(163,230,53,0.3)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            🌧️ Lo-Fi 84
          </button>
        </div>

        {/* Live Drum Pads Trigger */}
        <div className="md:col-span-7 flex flex-wrap items-center gap-2 justify-start md:justify-end">
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider pr-1 hidden lg:inline">
            LIVE PADS:
          </span>
          {[
            { id: 'kick', label: '808 Kick' },
            { id: 'snare', label: 'Snare' },
            { id: 'hihat', label: 'Hi-Hat' },
            { id: 'laser', label: 'Laser' },
            { id: 'subdrop', label: 'Sub Drop' },
          ].map((pad) => (
            <button
              key={pad.id}
              onClick={() => handlePadClick(pad.id as 'kick' | 'snare' | 'hihat' | 'laser' | 'subdrop')}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] uppercase tracking-wider border transition-all active:scale-95 ${
                activePad === pad.id
                  ? 'bg-[#a3e635] border-[#a3e635] text-black font-bold shadow-[0_0_15px_rgba(163,230,53,0.5)]'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-zinc-300 hover:text-white'
              }`}
            >
              {pad.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
