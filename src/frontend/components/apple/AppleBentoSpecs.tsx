import React, { useState } from 'react';
import { Flame, Cpu, Layout, Music, Play, Square, ExternalLink, Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import { APPLE_CONTENT } from '../../content/appleContent';
import { AppleAudio } from '../../audio/AppleHapticAudio';

interface AppleBentoSpecsProps {
  lang: 'vi' | 'en';
}

export const AppleBentoSpecs: React.FC<AppleBentoSpecsProps> = ({ lang }) => {
  const headerData = APPLE_CONTENT.bentoHeader;
  const bentoItems = APPLE_CONTENT.bento;

  // Interactive Widget 1 State: Team Energy
  const [teamEnergy, setTeamEnergy] = useState(98);
  const [isEnergizing, setIsEnergizing] = useState(false);

  // Interactive Widget 4 State: Sonic Art Preview
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleBoostEnergy = () => {
    setIsEnergizing(true);
    AppleAudio.playCardSnap();
    setTeamEnergy((prev) => (prev >= 100 ? 95 : prev + 2));
    setTimeout(() => setIsEnergizing(false), 500);
  };

  const handleToggleSoundPreview = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      AppleAudio.setSoundEnabled(false);
    } else {
      setIsPlayingAudio(true);
      AppleAudio.setSoundEnabled(true);
      AppleAudio.playHiddenMusicPreview(4.0);
      setTimeout(() => setIsPlayingAudio(false), 4000);
    }
  };

  return (
    <section
      id="bento-section"
      aria-label="Khối ma trận năng lực cốt lõi"
      className="relative min-h-screen w-full px-6 sm:px-12 lg:px-20 py-32 bg-[#060606] text-white border-t border-white/10 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase font-bold">
              {headerData.sectionBadge}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white uppercase">
              {headerData.title[lang]}
            </h2>
            <p className="text-sm sm:text-base font-mono text-zinc-400 max-w-md">
              {headerData.subtitle[lang]}
            </p>
          </div>
        </div>

        {/* 2x2 Bento Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Team Leadership & Flame Keeper */}
          <div
            onMouseEnter={() => AppleAudio.playClick(1500, 0.01)}
            className="p-8 sm:p-12 rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-amber-400/40 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between space-y-8 group relative overflow-hidden"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Flame className="w-6 h-6 animate-pulse" />
                </div>
                <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono tracking-widest text-amber-300">
                  {bentoItems[0].badge}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase group-hover:text-amber-300 transition-colors">
                  {bentoItems[0].title[lang]}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-zinc-400">
                  {bentoItems[0].subtitle[lang]}
                </p>
              </div>

              <p className="text-sm font-body text-zinc-300 leading-relaxed">
                {bentoItems[0].description[lang]}
              </p>
            </div>

            {/* Live Interactive Energy Widget */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  <span>TEAM ENERGY RESONANCE</span>
                </span>
                <span className="text-amber-300 font-bold">{teamEnergy}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300 rounded-full ${
                    isEnergizing ? 'scale-x-105' : ''
                  }`}
                  style={{ width: `${teamEnergy}%` }}
                />
              </div>
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleBoostEnergy}
                  className="text-[11px] font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{lang === 'vi' ? 'TRUYỀN LỬA ĐỘI NGŨ' : 'ENERGIZE TEAM'}</span>
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              {bentoItems[0].tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-zinc-900 text-[10px] font-mono text-zinc-400">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: AI & Workflow Automation */}
          <div
            onMouseEnter={() => AppleAudio.playClick(1500, 0.01)}
            className="p-8 sm:p-12 rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-cyan-400/40 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between space-y-8 group relative overflow-hidden"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono tracking-widest text-cyan-300">
                  {bentoItems[1].badge}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase group-hover:text-cyan-300 transition-colors">
                  {bentoItems[1].title[lang]}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-zinc-400">
                  {bentoItems[1].subtitle[lang]}
                </p>
              </div>

              <p className="text-sm font-body text-zinc-300 leading-relaxed">
                {bentoItems[1].description[lang]}
              </p>
            </div>

            {/* Live Interactive Node Workflow Simulator */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3">
              <div className="text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                <span>AI DISPATCH PIPELINE</span>
                <span className="text-cyan-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>SYNCED</span>
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                <div className="p-2 rounded bg-zinc-900 border border-cyan-500/20 text-cyan-300">
                  INPUT DATA
                </div>
                <div className="p-2 rounded bg-zinc-900 border border-cyan-500/20 text-cyan-300">
                  AI AGENT OPTIMIZE
                </div>
                <div className="p-2 rounded bg-zinc-900 border border-cyan-500/20 text-cyan-300">
                  AUTO DISPATCH
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              {bentoItems[1].tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-zinc-900 text-[10px] font-mono text-zinc-400">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Web Engineering & Systems */}
          <div
            onMouseEnter={() => AppleAudio.playClick(1500, 0.01)}
            className="p-8 sm:p-12 rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-violet-400/40 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between space-y-8 group relative overflow-hidden"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <Layout className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono tracking-widest text-violet-300">
                  {bentoItems[2].badge}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase group-hover:text-violet-300 transition-colors">
                  {bentoItems[2].title[lang]}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-zinc-400">
                  {bentoItems[2].subtitle[lang]}
                </p>
              </div>

              <p className="text-sm font-body text-zinc-300 leading-relaxed">
                {bentoItems[2].description[lang]}
              </p>
            </div>

            {/* FPT Web Design Feature Highlights */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-violet-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CAO ĐẲNG FPT // CHUYÊN NGÀNH THIẾT KẾ WEB</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>ĐẠI HỌC VĂN LANG // QUAN HỆ CÔNG CHÚNG (PR)</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              {bentoItems[2].tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-zinc-900 text-[10px] font-mono text-zinc-400">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 4: Sonic Artistry & Hidden Music */}
          <div
            onMouseEnter={() => AppleAudio.playClick(1500, 0.01)}
            className="p-8 sm:p-12 rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-emerald-400/40 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between space-y-8 group relative overflow-hidden"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Music className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono tracking-widest text-emerald-300">
                  {bentoItems[3].badge}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase group-hover:text-emerald-300 transition-colors">
                  {bentoItems[3].title[lang]}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-zinc-400">
                  {bentoItems[3].subtitle[lang]}
                </p>
              </div>

              <p className="text-sm font-body text-zinc-300 leading-relaxed">
                {bentoItems[3].description[lang]}
              </p>
            </div>

            {/* Interactive Audio Player & External Venture Link */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleToggleSoundPreview}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-xs font-mono text-emerald-300 transition-colors"
                >
                  {isPlayingAudio ? (
                    <>
                      <Square className="w-3.5 h-3.5" />
                      <span>STOP SYNTH PREVIEW</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>PLAY HARMONIC CHORD</span>
                    </>
                  )}
                </button>

                <a
                  href="https://hiddenmusic.postlain.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                >
                  <span>hiddenmusic.postlain.com</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              {bentoItems[3].tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-zinc-900 text-[10px] font-mono text-zinc-400">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
