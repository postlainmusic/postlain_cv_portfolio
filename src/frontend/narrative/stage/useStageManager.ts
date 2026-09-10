import { useState, useEffect, useCallback, useRef } from 'react';

export const WORLD_IDS = ['void', 'water', 'wood', 'fire', 'metal', 'earth'] as const;
export type WorldId = typeof WORLD_IDS[number];

export interface StageState {
  currentStage: number;
  currentWorldId: WorldId;
  direction: 'next' | 'prev' | 'idle';
  isTransitioning: boolean;
  goToStage: (stageIndex: number) => void;
  nextStage: () => void;
  prevStage: () => void;
}

const COOLDOWN_MS = 650;
const WHEEL_THRESHOLD = 45;
const TOUCH_THRESHOLD = 50;

export function useStageManager(): StageState {
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [direction, setDirection] = useState<'next' | 'prev' | 'idle'>('idle');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const lastTransitionTime = useRef<number>(0);
  const touchStartY = useRef<number | null>(null);
  const wheelAccumulator = useRef<number>(0);
  const wheelResetTimeout = useRef<number | null>(null);

  const changeStage = useCallback((targetIndex: number) => {
    const now = performance.now();
    if (now - lastTransitionTime.current < COOLDOWN_MS) return;
    if (targetIndex < 0 || targetIndex >= WORLD_IDS.length) return;
    if (targetIndex === currentStage) return;

    lastTransitionTime.current = now;
    const dir = targetIndex > currentStage ? 'next' : 'prev';
    setDirection(dir);
    setIsTransitioning(true);
    setCurrentStage(targetIndex);

    // Update browser URL hash without jump
    const worldId = WORLD_IDS[targetIndex];
    if (window.location.hash !== `#${worldId}`) {
      window.history.replaceState(null, '', `#${worldId}`);
    }

    setTimeout(() => {
      setIsTransitioning(false);
      setDirection('idle');
    }, COOLDOWN_MS);
  }, [currentStage]);

  const nextStage = useCallback(() => {
    if (currentStage < WORLD_IDS.length - 1) {
      changeStage(currentStage + 1);
    }
  }, [currentStage, changeStage]);

  const prevStage = useCallback(() => {
    if (currentStage > 0) {
      changeStage(currentStage - 1);
    }
  }, [currentStage, changeStage]);

  const goToStage = useCallback((index: number) => {
    changeStage(index);
  }, [changeStage]);

  // Sync with initial URL hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as WorldId;
    const initialIndex = WORLD_IDS.indexOf(hash);
    if (initialIndex >= 0 && initialIndex !== currentStage) {
      setCurrentStage(initialIndex);
    }
  }, []);

  // Global Wheel listener (Single-frame virtual navigation)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent default browser scroll overscroll bounce
      e.preventDefault();

      const now = performance.now();
      if (now - lastTransitionTime.current < COOLDOWN_MS) return;

      wheelAccumulator.current += e.deltaY;

      if (wheelResetTimeout.current) {
        window.clearTimeout(wheelResetTimeout.current);
      }

      wheelResetTimeout.current = window.setTimeout(() => {
        wheelAccumulator.current = 0;
      }, 150);

      if (wheelAccumulator.current > WHEEL_THRESHOLD) {
        wheelAccumulator.current = 0;
        nextStage();
      } else if (wheelAccumulator.current < -WHEEL_THRESHOLD) {
        wheelAccumulator.current = 0;
        prevStage();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelResetTimeout.current) window.clearTimeout(wheelResetTimeout.current);
    };
  }, [nextStage, prevStage]);

  // Touch swipe navigation for mobile
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent rubber-banding
      if (e.cancelable) {
        // e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const touchEndY = e.changedTouches[0]?.clientY ?? touchStartY.current;
      const diffY = touchStartY.current - touchEndY;
      touchStartY.current = null;

      const now = performance.now();
      if (now - lastTransitionTime.current < COOLDOWN_MS) return;

      if (diffY > TOUCH_THRESHOLD) {
        // Swiped up -> go to next world
        nextStage();
      } else if (diffY < -TOUCH_THRESHOLD) {
        // Swiped down -> go to previous world
        prevStage();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextStage, prevStage]);

  // Keyboard navigation (Arrow keys / PageUp / PageDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        nextStage();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        prevStage();
      } else if (e.key >= '0' && e.key <= '5') {
        const stageNum = parseInt(e.key, 10);
        if (stageNum >= 0 && stageNum <= 5) {
          e.preventDefault();
          goToStage(stageNum);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStage, prevStage, goToStage]);

  return {
    currentStage,
    currentWorldId: WORLD_IDS[currentStage],
    direction,
    isTransitioning,
    goToStage,
    nextStage,
    prevStage,
  };
}
