import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Menu, X, Globe, Download } from 'lucide-react';
import { SiteContent } from '../content/types';
import { useAppStore } from '../stores/useAppStore';

interface MastheadProps {
  content: SiteContent['masthead'];
  activeSection: string;
}

export const Masthead: React.FC<MastheadProps> = ({ content, activeSection }) => {
  const { locale, toggleLocale, soundEnabled, toggleSound } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        triggerButtonRef.current &&
        !triggerButtonRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#08090a]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Left: Brand / Monogram */}
        <a
          href="#overture"
          className="flex items-center gap-2 text-ink-hero hover:text-accent-amber transition-colors duration-150"
          aria-label={`${content.brandName} - Return to top`}
        >
          <span className="font-display font-black text-base sm:text-lg tracking-wider text-white">
            {content.brandName}
          </span>
          <span className="text-[10px] font-mono tracking-widest text-accent-amber border border-accent-amber/30 px-1.5 py-0.5 rounded">
            {content.brandRole}
          </span>
        </a>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8" aria-label="Main Navigation">
          {content.nav.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`text-xs font-mono tracking-wider transition-colors duration-150 relative py-1 ${
                  isActive ? 'text-accent-amber font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-amber animate-fadeIn" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Download CV CTA */}
          <a
            href={content.downloadCvUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="NGOPHUC_CV_2026.pdf"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent-amber text-black text-xs font-mono font-bold hover:bg-white hover:text-black transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{content.downloadCvLabel}</span>
          </a>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLocale}
            className="flex items-center gap-1 px-2.5 py-1 rounded border border-white/15 text-xs font-mono text-zinc-300 hover:border-accent-amber hover:text-accent-amber transition-colors"
            aria-label={locale === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
          >
            <Globe className="w-3.5 h-3.5 text-accent-amber" />
            <span className="font-bold">{locale.toUpperCase()}</span>
          </button>

          {/* Sound Mute/Unmute */}
          <button
            type="button"
            onClick={toggleSound}
            className="p-1.5 rounded border border-white/15 text-zinc-300 hover:border-accent-amber hover:text-accent-amber transition-colors"
            aria-label={soundEnabled ? content.soundToggle.off : content.soundToggle.on}
            title={soundEnabled ? content.soundToggle.off : content.soundToggle.on}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-accent-amber" />
            ) : (
              <VolumeX className="w-4 h-4 text-zinc-500" />
            )}
          </button>

          {/* Mobile Hamburger Menu */}
          <button
            ref={triggerButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-1.5 rounded border border-white/15 text-zinc-300 hover:text-white transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden w-full bg-[#0d0e10] border-b border-white/10 px-6 py-6 space-y-4 animate-fadeIn"
        >
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {content.nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono tracking-wider text-zinc-300 hover:text-accent-amber py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-white/10">
            <a
              href={content.downloadCvUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="NGOPHUC_CV_2026.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded bg-accent-amber text-black text-xs font-mono font-bold hover:bg-white transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{content.downloadCvLabel}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
