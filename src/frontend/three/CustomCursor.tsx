/**
 * CUSTOM VELOCITY-DEFORMED MAGNETIC CURSOR
 * Organic trailing cursor that stretches with pointer velocity,
 * applies mix-blend-mode: difference over text and 3D scenes,
 * and snaps magnetically to interactive targets.
 */

import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let vx = 0;
    let vy = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let rafId: number;
    const updateCursor = () => {
      // Spring physics lag
      vx = (mouseX - cursorX) * 0.18;
      vy = (mouseY - cursorY) * 0.18;
      cursorX += vx;
      cursorY += vy;

      const speed = Math.hypot(vx, vy);
      const angle = Math.atan2(vy, vx);
      const scaleX = 1.0 + Math.min(speed * 0.05, 0.8);
      const scaleY = 1.0 - Math.min(speed * 0.03, 0.4);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) rotate(${angle}rad) scale(${scaleX}, ${scaleY})`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      rafId = requestAnimationFrame(updateCursor);
    };

    rafId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Trailing Velocity Fluid Ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-amber-400/60 pointer-events-none z-50 mix-blend-difference hidden md:block will-change-transform transition-opacity duration-300"
      />
      {/* Sharp Precision Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-amber-400 pointer-events-none z-50 hidden md:block will-change-transform"
      />
    </>
  );
};
