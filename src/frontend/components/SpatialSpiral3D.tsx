import React, { useState, useRef, useEffect } from 'react';
import { Layers, ListFilter, ArrowUpRight, Sparkles, ChevronRight, Check } from 'lucide-react';
import { EXPERIENCES_DATA, ExperienceData } from '../constants/dictionary';
import { usePortfolioStore } from '../stores/usePortfolioStore';
import { soundEngine } from '../lib/audio';

interface SpatialSpiral3DProps {
  className?: string;
}

export const SpatialSpiral3D: React.FC<SpatialSpiral3DProps> = ({ className = '' }) => {
  const { locale } = usePortfolioStore();
  const [viewMode, setViewMode] = useState<'spiral' | 'list'>('spiral');
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const dragStartX = useRef<number>(0);
  const currentAngle = useRef<number>(0);
  const targetAngle = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Default to list view on small mobile screens for optimal ergonomics
      if (mobile) setViewMode('list');
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Inertia lerp loop for smooth 3D rotation
  useEffect(() => {
    let active = true;

    const lerpLoop = () => {
      currentAngle.current += (targetAngle.current - currentAngle.current) * 0.1;
      setRotationAngle(currentAngle.current);

      if (active) {
        rafRef.current = requestAnimationFrame(lerpLoop);
      }
    };

    rafRef.current = requestAnimationFrame(lerpLoop);

    return () => {
      active = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Mouse & Touch Drag Handlers
  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    dragStartX.current = clientX;
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartX.current;
    dragStartX.current = clientX;
    targetAngle.current += deltaX * 0.35; // sensitivity
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Mouse Wheel Orbit
  const handleWheel = (e: React.WheelEvent) => {
    if (viewMode !== 'spiral') return;
    targetAngle.current -= e.deltaY * 0.15;
  };

  const items = EXPERIENCES_DATA;
  const cardCount = items.length;
  const radius = isMobile ? 260 : 420; // 3D cylinder radius

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      
      {/* View Switcher: spiral • list (Inspired directly by pacomepertant.com) */}
      <div className="flex items-center justify-between pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
          <span className="text-[#a3e635]">02 // CAREER CHRONICLES</span>
          <span>•</span>
          <span>SPATIAL GALLERY</span>
        </div>

        {/* Minimalist Pill Toggle */}
        <div className="flex items-center bg-white/[0.04] p-1 rounded-full border border-white/10 backdrop-blur-md">
          <button
            onClick={() => {
              soundEngine.playClick(600);
              setViewMode('spiral');
            }}
            data-cursor="3D"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
              viewMode === 'spiral'
                ? 'bg-[#a3e635] text-black font-bold shadow-[0_0_15px_rgba(163,230,53,0.3)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Spiral 3D</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick(600);
              setViewMode('list');
            }}
            data-cursor="LIST"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
              viewMode === 'list'
                ? 'bg-[#a3e635] text-black font-bold shadow-[0_0_15px_rgba(163,230,53,0.3)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>List Archive</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          MODE 1: 3D SPATIAL SPIRAL CAROUSEL (PACOME PERTANT STYLE)
      ======================================================== */}
      {viewMode === 'spiral' ? (
        <div
          onWheel={handleWheel}
          onMouseDown={(e) => handlePointerDown(e.clientX)}
          onMouseMove={(e) => handlePointerMove(e.clientX)}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
          onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
          onTouchEnd={handlePointerUp}
          data-cursor="DRAG"
          className="relative w-full h-[580px] sm:h-[640px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          style={{ perspective: '1200px' }}
        >
          {/* Spatial Grid Floor Projection */}
          <div 
            className="absolute bottom-0 inset-x-0 h-48 pointer-events-none opacity-20 bg-[linear-gradient(to_bottom,transparent,#00f2fe_1px,transparent_1px)] [background-size:100%_24px]"
            style={{ transform: 'rotateX(75deg) translateY(60px)' }}
          />

          {/* Central Rotating Stage */}
          <div
            className="relative w-full h-full flex items-center justify-center transition-transform"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotationAngle}deg)`,
            }}
          >
            {items.map((item, idx) => {
              // Calculate spatial cylinder coordinates with slight vertical spiral offset
              const angleStep = 360 / cardCount;
              const cardAngle = idx * angleStep;
              const verticalY = (idx - cardCount / 2) * 35; // gentle vertical spiral stagger

              const role = locale === 'vi' ? item.roleVi : item.roleEn;
              const company = locale === 'vi' ? item.companyVi : item.companyEn;
              const tag = locale === 'vi' ? item.tagVi : item.tagEn;
              const highlights = locale === 'vi' ? item.highlightsVi : item.highlightsEn;

              return (
                <div
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.playClick(750);
                    setActiveCardIndex(idx);
                  }}
                  data-cursor="VIEW"
                  className="absolute w-[280px] sm:w-[360px] p-6 sm:p-7 rounded-[2rem] bg-[#090c14]/90 border border-white/10 hover:border-[#a3e635] shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 group"
                  style={{
                    transform: `rotateY(${cardAngle}deg) translateY(${verticalY}px) translateZ(${radius}px)`,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {/* Glowing Edge Gradient */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#a3e635]/15 via-transparent to-transparent rounded-tr-[2rem] pointer-events-none" />

                  {/* Card Episode Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#a3e635]/15 text-[#a3e635] border border-[#a3e635]/30 font-bold">
                      {item.episode}
                    </span>
                    <span className="font-mono text-[11px] text-zinc-500">
                      {item.period}
                    </span>
                  </div>

                  {/* Role & Company */}
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight mb-1 group-hover:text-[#a3e635] transition-colors">
                    {role}
                  </h3>
                  <div className="text-sm font-serif italic text-zinc-400 mb-4">
                    {company}
                  </div>

                  {/* Tag Pill */}
                  <div className="inline-block px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono uppercase tracking-wider text-zinc-300 mb-5">
                    {tag}
                  </div>

                  {/* Highlights Bullet Points */}
                  <div className="space-y-2 border-t border-white/[0.06] pt-4">
                    {highlights.slice(0, 2).map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-zinc-400 font-light leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] mt-1.5 flex-shrink-0" />
                        <span className="line-clamp-2">{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Trigger */}
                  <div className="mt-5 pt-3 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-t border-white/[0.04]">
                    <span>INSPECT EPISODE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#a3e635] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Drag Instruction */}
          <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-500 tracking-widest uppercase pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-ping" />
            <span>DRAG HORIZONTALLY TO ROTATE 3D SPIRAL • SCROLL TO ORBIT</span>
          </div>
        </div>
      ) : (

        /* ========================================================
            MODE 2: CINEMATIC WORK ARCHIVE (FORMS.WORLD STYLE)
        ======================================================== */
        <div className="space-y-6">
          {items.map((item, idx) => {
            const role = locale === 'vi' ? item.roleVi : item.roleEn;
            const company = locale === 'vi' ? item.companyVi : item.companyEn;
            const tag = locale === 'vi' ? item.tagVi : item.tagEn;
            const highlights = locale === 'vi' ? item.highlightsVi : item.highlightsEn;

            return (
              <div
                key={item.id}
                onMouseEnter={() => soundEngine.playHover()}
                className="p-6 sm:p-10 rounded-[2rem] bg-[#07090e] border border-white/[0.08] hover:border-[#a3e635]/50 transition-all duration-300 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-white/[0.05] text-[#a3e635] border border-[#a3e635]/30 font-bold">
                        {item.episode}
                      </span>
                      <span className="font-mono text-xs text-zinc-500">{item.period}</span>
                    </div>

                    <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase group-hover:text-[#a3e635] transition-colors">
                      {role}
                    </h3>
                    <div className="font-serif italic text-base sm:text-lg text-zinc-400 mt-1">
                      {company}
                    </div>
                  </div>

                  {/* Cinematic Film Tags (Forms.world aesthetic) */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded bg-white/[0.04] border border-white/10 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                      {tag}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white/[0.02] border border-white/5 text-[10px] font-mono text-zinc-500">
                      OPERATIONS
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white/[0.02] border border-white/5 text-[10px] font-mono text-zinc-500">
                      LEADERSHIP
                    </span>
                  </div>
                </div>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                  {highlights.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3 p-4 rounded-2xl bg-black/40 border border-white/[0.03]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] mt-2 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
