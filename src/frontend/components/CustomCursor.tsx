import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

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

    const onTouchStart = () => {
      setIsVisible(false); // Hide on touch
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });

    // Smooth inertia lerp for the outer ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.25;
      ringY += (mouseY - ringY) * 0.25;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchStart);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Precision Center Crosshair Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#a3e635] shadow-[0_0_10px_#a3e635]"
      />

      {/* Lerping Outer Ring with Viewfinder Crosshair */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full border transition-all duration-150 ease-out ${
          isHovered
            ? '-ml-7 -mt-7 w-14 h-14 bg-[#a3e635]/20 border-[#a3e635] shadow-[0_0_25px_rgba(163,230,53,0.4)] backdrop-blur-[1px]'
            : '-ml-4 -mt-4 w-8 h-8 border-white/40 bg-transparent'
        }`}
      >
        {isHovered && cursorText ? (
          <span className="font-mono text-[9px] font-black tracking-widest text-[#a3e635] uppercase select-none animate-pulse">
            {cursorText}
          </span>
        ) : (
          <div className="w-1.5 h-1.5 rounded-full border border-white/60" />
        )}
      </div>
    </div>
  );
};
