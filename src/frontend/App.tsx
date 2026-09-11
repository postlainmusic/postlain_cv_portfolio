import React, { useState, useEffect } from 'react';
import { SOTYStageCanvas } from './three/SOTYStageCanvas';
import { useSOTYTimelineEngine } from './core/SOTYTimelineEngine';
import { SOTYSession00Genesis } from './components/soty/SOTYSession00Genesis';
import { SOTYSession01DualEngine } from './components/soty/SOTYSession01DualEngine';
import { SOTYSession02Crucibles } from './components/soty/SOTYSession02Crucibles';
import { SOTYSession03Arsenals } from './components/soty/SOTYSession03Arsenals';
import { SOTYSession04Terminal } from './components/soty/SOTYSession04Terminal';
import { SOTYNavbar } from './components/soty/SOTYNavbar';
import { ApplePreloader } from './components/apple/ApplePreloader';
import { AppleCustomCursor } from './components/apple/AppleCustomCursor';
import { AppleToast } from './components/apple/AppleToast';
import { AppleAudio } from './audio/AppleHapticAudio';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dualTension, setDualTension] = useState(0.5);

  const {
    currentSession,
    isTransitioning,
    transitionProgress,
    goToSession,
    nextSession,
    prevSession,
  } = useSOTYTimelineEngine();

  // Track Mouse Movement for WebGL Parallax and Distortion
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handlePreloaderComplete = (withSound: boolean) => {
    setIsSoundOn(withSound);
    AppleAudio.setSoundEnabled(withSound);
    setIsLoaded(true);
  };

  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black text-white selection:bg-amber-400 selection:text-black font-body overflow-hidden select-none">
      {/* Magnetic Spring Custom Cursor */}
      <AppleCustomCursor />

      {/* Floating Pill Toast */}
      <AppleToast message={toastMessage} />

      {/* Preloader Overlay (until user enters) */}
      {!isLoaded && (
        <ApplePreloader onComplete={handlePreloaderComplete} lang={lang} />
      )}

      {/* WebGL 100dvh Shader Canvas */}
      <SOTYStageCanvas
        currentSession={currentSession}
        transitionProgress={transitionProgress}
        isTransitioning={isTransitioning}
        mousePos={mousePos}
        dualTension={dualTension}
      />

      {/* Clean Top Glass Navbar (No distracting dock/progress bars) */}
      <SOTYNavbar
        lang={lang}
        setLang={setLang}
        isSoundOn={isSoundOn}
        setIsSoundOn={setIsSoundOn}
        onGoToGenesis={() => goToSession(0)}
        onGoToContact={() => goToSession(4)}
      />

      {/* 5 Bespoke SOTY Sessions Container */}
      <main className="relative w-full h-full z-10">
        {/* Session 00: Identity Genesis */}
        <SOTYSession00Genesis
          lang={lang}
          onNext={nextSession}
          isActive={currentSession === 0}
        />

        {/* Session 01: Dual-Engine Matrix */}
        <SOTYSession01DualEngine
          lang={lang}
          onNext={nextSession}
          onPrev={prevSession}
          isActive={currentSession === 1}
          onTensionChange={setDualTension}
        />

        {/* Session 02: 4 Crucible Milestones */}
        <SOTYSession02Crucibles
          lang={lang}
          onNext={nextSession}
          onPrev={prevSession}
          isActive={currentSession === 2}
        />

        {/* Session 03: 4 Command Arsenals */}
        <SOTYSession03Arsenals
          lang={lang}
          onNext={nextSession}
          onPrev={prevSession}
          isActive={currentSession === 3}
        />

        {/* Session 04: Terminal of Engagement & Hidden Music */}
        <SOTYSession04Terminal
          lang={lang}
          onShowToast={handleShowToast}
          onRestart={() => goToSession(0)}
          isActive={currentSession === 4}
        />
      </main>
    </div>
  );
};

export default App;
