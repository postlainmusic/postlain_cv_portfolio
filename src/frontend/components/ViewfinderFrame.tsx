import React from 'react';

export const ViewfinderFrame: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 p-4 sm:p-6 flex flex-col justify-between select-none">
      {/* Top Corners */}
      <div className="w-full flex items-center justify-between">
        {/* Top Left Bracket */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-t-2 border-l-2 border-white/20" />
          <span className="font-mono text-[9px] text-zinc-600 tracking-widest hidden md:inline">
            SPEC_SYS // 11°56'N 108°26'E
          </span>
        </div>

        {/* Top Right Bracket */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-zinc-600 tracking-widest hidden md:inline">
            CORE_LOAD // 60FPS
          </span>
          <div className="w-4 h-4 border-t-2 border-r-2 border-white/20" />
        </div>
      </div>

      {/* Bottom Corners */}
      <div className="w-full flex items-center justify-between">
        {/* Bottom Left Bracket */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-b-2 border-l-2 border-white/20" />
          <span className="font-mono text-[9px] text-zinc-600 tracking-widest hidden md:inline">
            POSTLAIN // MULTI-DISCIPLINARY
          </span>
        </div>

        {/* Bottom Right Bracket */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-[#a3e635]/60 tracking-widest hidden md:inline">
            EDGE_ONLINE // CLOUDFLARE
          </span>
          <div className="w-4 h-4 border-b-2 border-r-2 border-white/20" />
        </div>
      </div>
    </div>
  );
};
