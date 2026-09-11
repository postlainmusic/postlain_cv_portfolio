import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { AppleAudio } from '../audio/AppleHapticAudio';

export interface SOTYEngineState {
  currentSession: number;
  isTransitioning: boolean;
  transitionProgress: number;
  direction: 'next' | 'prev';
  goToSession: (index: number) => void;
  nextSession: () => void;
  prevSession: () => void;
}

export const TOTAL_SESSIONS = 5;

export function useSOTYTimelineEngine(): SOTYEngineState {
  const [currentSession, setCurrentSession] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionProgress, setTransitionProgress] = useState<number>(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const isLockedRef = useRef<boolean>(false);
  const touchStartYRef = useRef<number | null>(null);
  const sessionRef = useRef<number>(0);

  useEffect(() => {
    sessionRef.current = currentSession;
  }, [currentSession]);

  const triggerTransition = useCallback((targetIndex: number, dir: 'next' | 'prev') => {
    if (isLockedRef.current || targetIndex === sessionRef.current) return;
    if (targetIndex < 0 || targetIndex >= TOTAL_SESSIONS) return;

    isLockedRef.current = true;
    setIsTransitioning(true);
    setDirection(dir);

    // Play bespoke transition soundscapes
    if (dir === 'next') {
      if (sessionRef.current === 0) AppleAudio.playDepthBoom();
      else if (sessionRef.current === 1) AppleAudio.playLiquidResonance();
      else if (sessionRef.current === 2) AppleAudio.playShutterSnap();
      else if (sessionRef.current === 3) AppleAudio.playVortexWarp();
      else AppleAudio.playCardSnap();
    } else {
      AppleAudio.playCardSnap();
    }

    // Switch active session immediately
    setCurrentSession(targetIndex);
    sessionRef.current = targetIndex;

    // GSAP Timeline to animate transitionProgress 0 -> 1
    const progressObj = { value: 0 };
    const tl = gsap.timeline({
      onUpdate: () => {
        setTransitionProgress(progressObj.value);
      },
      onComplete: () => {
        setTransitionProgress(0);
        setIsTransitioning(false);

        // Release lock after settling
        setTimeout(() => {
          isLockedRef.current = false;
        }, 150);
      },
    });

    tl.to(progressObj, { value: 1, duration: 0.6, ease: 'power3.inOut' });
  }, []);

  const nextSession = useCallback(() => {
    if (sessionRef.current < TOTAL_SESSIONS - 1) {
      triggerTransition(sessionRef.current + 1, 'next');
    }
  }, [triggerTransition]);

  const prevSession = useCallback(() => {
    if (sessionRef.current > 0) {
      triggerTransition(sessionRef.current - 1, 'prev');
    }
  }, [triggerTransition]);

  const goToSession = useCallback(
    (index: number) => {
      if (index === sessionRef.current) return;
      const dir = index > sessionRef.current ? 'next' : 'prev';
      triggerTransition(index, dir);
    },
    [triggerTransition]
  );

  // Bind Global Wheel, Touch, and Keyboard Listeners
  useEffect(() => {
    let wheelAcc = 0;
    let wheelTimer: NodeJS.Timeout | null = null;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isLockedRef.current) return;

      wheelAcc += e.deltaY;

      if (wheelTimer) clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        wheelAcc = 0;
      }, 200);

      if (wheelAcc > 45) {
        wheelAcc = 0;
        nextSession();
      } else if (wheelAcc < -45) {
        wheelAcc = 0;
        prevSession();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isLockedRef.current || touchStartYRef.current === null) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - currentY;

      if (deltaY > 50) {
        touchStartYRef.current = null;
        nextSession();
      } else if (deltaY < -50) {
        touchStartYRef.current = null;
        prevSession();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLockedRef.current) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextSession();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        prevSession();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    (window as any).__sotyEngine = {
      nextSession,
      prevSession,
      goToSession,
      getCurrentSession: () => sessionRef.current,
    };

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }, [nextSession, prevSession]);

  return {
    currentSession,
    isTransitioning,
    transitionProgress,
    direction,
    goToSession,
    nextSession,
    prevSession,
  };
}
