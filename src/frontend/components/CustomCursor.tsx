import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Detect mobile / touch devices
    const checkTouch = () => {
      const isTouch = 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(isTouch);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch, { passive: true });

    if (isTouchDevice) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check for interactive cursor hover tags
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('[data-cursor], a, button, [role="button"]') as HTMLElement | null;

      if (interactiveEl) {
        const customText = interactiveEl.getAttribute('data-cursor');
        setCursorText(customText || (interactiveEl.tagName === 'A' ? 'OPEN' : 'CLICK'));
        setIsHovered(true);
      } else {
        setCursorText(null);
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Smooth inertia lerp for the outer ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', checkTouch);
    };
  }, [isTouchDevice]);

  // Completely hidden on touch screens
  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Precision Center Crosshair Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635] transition-opacity duration-150"
      />

      {/* Lerping Outer Aura Ring with Viewfinder Crosshair */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full border transition-all duration-200 ease-out ${
          isHovered
            ? '-ml-8 -mt-8 w-16 h-16 bg-[#a3e635]/15 border-[#a3e635] shadow-[0_0_20px_rgba(163,230,53,0.35)] backdrop-blur-[2px]'
            : '-ml-4 -mt-4 w-8 h-8 border-white/30 bg-transparent'
        }`}
      >
        {isHovered && cursorText ? (
          <span className="font-mono text-[9px] font-black tracking-widest text-[#a3e635] uppercase select-none animate-pulse">
            {cursorText}
          </span>
        ) : (
          <div className="w-1.5 h-1.5 rounded-full border border-white/50" />
        )}
      </div>
    </div>
  );
};
