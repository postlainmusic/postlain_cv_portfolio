import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AppleNavbar } from './components/apple/AppleNavbar';
import { ApplePreloader } from './components/apple/ApplePreloader';
import { AppleHero } from './components/apple/AppleHero';
import { AppleScrubPhilosophy } from './components/apple/AppleScrubPhilosophy';
import { AppleMilestonesRunway } from './components/apple/AppleMilestonesRunway';
import { AppleBentoSpecs } from './components/apple/AppleBentoSpecs';
import { AppleContactFooter } from './components/apple/AppleContactFooter';
import { AppleCustomCursor } from './components/apple/AppleCustomCursor';
import { AppleToast } from './components/apple/AppleToast';
import { AppleAudio } from './audio/AppleHapticAudio';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll and sync with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const handlePreloaderComplete = (withSound: boolean) => {
    setIsSoundOn(withSound);
    setIsLoaded(true);
    // Refresh ScrollTrigger after DOM renders
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0, duration: 1.4 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black font-body overflow-x-hidden">
      {/* Magnetic Spring Custom Cursor */}
      <AppleCustomCursor />

      {/* Floating Pill Toast */}
      <AppleToast message={toastMessage} />

      {/* Preloader Overlay (until user enters) */}
      {!isLoaded && (
        <ApplePreloader onComplete={handlePreloaderComplete} lang={lang} />
      )}

      {/* Main Glass Navbar */}
      <AppleNavbar
        lang={lang}
        setLang={setLang}
        isSoundOn={isSoundOn}
        setIsSoundOn={setIsSoundOn}
        onScrollTo={handleScrollTo}
      />

      {/* Section 1: Giant Kinetic Typography Hero */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <AppleHero
          lang={lang}
          onScrollDown={() => handleScrollTo('philosophy-section')}
        />

        {/* Section 2: Apple Word-by-Word Scrubbing Philosophy */}
        <AppleScrubPhilosophy lang={lang} />

        {/* Section 3: Horizontal Milestone Runway */}
        <AppleMilestonesRunway lang={lang} />

        {/* Section 4: 2x2 Bento Capability Matrix */}
        <AppleBentoSpecs lang={lang} />

        {/* Section 5: Direct Contact Monolith & Outro */}
        <AppleContactFooter
          lang={lang}
          onShowToast={handleShowToast}
          onScrollToTop={handleScrollToTop}
        />
      </main>
    </div>
  );
};

export default App;
