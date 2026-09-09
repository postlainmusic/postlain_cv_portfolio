import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Menu, X, Globe } from 'lucide-react';
import { SiteContent } from '../content/types';
import { useAppStore } from '../stores/useAppStore';
import { useLiveClock } from '../hooks/useLiveClock';

interface MastheadProps {
  content: SiteContent['masthead'];
  activeSection: string;
}

export const Masthead: React.FC<MastheadProps> = ({ content, activeSection }) => {
  const { locale, toggleLocale, soundEnabled, toggleSound } = useAppStore();
  const timeString = useLiveClock();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstNavLinkRef = useRef<HTMLAnchorElement | null>(null);
  const wasOpenRef = useRef<boolean>(false);

  // Focus management: move focus into drawer on open, return to trigger on close
  useEffect(() => {
    if (mobileMenuOpen) {
      wasOpenRef.current = true;
      firstNavLinkRef.current?.focus();
    } else if (wasOpenRef.current) {
      triggerButtonRef.current?.focus();
      wasOpenRef.current = false;
    }
  }, [mobileMenuOpen]);

  // Keyboard Escape and Click-Outside dismiss listeners
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
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
    <header className="sticky top-0 z-50 w-full bg-bg-base/90 backdrop-blur-md border-b border-edge-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Left: Monogram / Identity Anchor */}
        <a
          href="#overture"
          className="font-display font-black text-sm sm:text-base tracking-tight text-ink-hero hover:text-accent-amber transition-colors duration-150 rounded-sm"
          aria-label="POSTLAIN - Return to top"
        >
          {content.monogram}
        </a>

        {/* Center: Desktop Navigation Anchors */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8" aria-label="Main Navigation">
          {content.nav.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`text-xs font-mono tracking-wider transition-colors duration-150 relative py-1 rounded-sm ${
                  isActive ? 'text-accent-amber font-semibold' : 'text-ink-muted hover:text-ink-hero'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent-amber animate-fadeIn" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Clock, Locale Switcher & Sound Toggle */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Da Lat Live Clock */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-ink-muted">
            <span className="text-accent-amber font-semibold">ĐÀ LẠT</span>
            <time
              dateTime={timeString}
              aria-label="Giờ hiện tại tại Đà Lạt, Việt Nam (GMT+7)"
              className="tabular-nums"
            >
              {timeString || '12:00:00'}
            </time>
            <span className="text-[10px] text-ink-muted/70">GMT+7</span>
          </div>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLocale}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-edge-subtle text-xs font-mono text-ink-body hover:border-edge-active hover:text-ink-hero transition-colors duration-150"
            aria-label={locale === 'vi' ? 'Switch language to English' : 'Chuyển sang Tiếng Việt'}
          >
            <Globe className="w-3.5 h-3.5 text-accent-amber" />
            <span className="font-bold">{locale.toUpperCase()}</span>
          </button>

          {/* Sound Mute/Unmute Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-md border border-edge-subtle text-xs font-mono text-ink-body hover:border-edge-active hover:text-ink-hero transition-colors duration-150"
            aria-label={soundEnabled ? content.soundToggle.off : content.soundToggle.on}
            aria-pressed={soundEnabled}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-accent-amber" />
                <span className="text-[10px] uppercase font-medium">{content.soundToggle.on}</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-ink-muted" />
                <span className="text-[10px] uppercase text-ink-muted font-medium">{content.soundToggle.off}</span>
              </>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            ref={triggerButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-md border border-edge-subtle text-ink-body hover:text-ink-hero transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer (Disclosure Navigation Pattern) */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          ref={mobileMenuRef}
          aria-label="Mobile Navigation Menu"
          className="lg:hidden border-t border-edge-subtle bg-bg-base/98 px-6 py-8 space-y-6 animate-fadeIn"
        >
          <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation Links">
            {content.nav.map((item, index) => (
              <a
                key={item.id}
                ref={index === 0 ? firstNavLinkRef : undefined}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-heading font-bold text-lg transition-colors py-1 ${
                  activeSection === item.id ? 'text-accent-amber' : 'text-ink-hero hover:text-accent-amber'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-edge-subtle flex items-center justify-between text-xs font-mono text-ink-muted">
            <div className="flex items-center gap-1.5">
              <span>ĐÀ LẠT</span>
              <time dateTime={timeString}>{timeString}</time>
            </div>
            <button
              type="button"
              onClick={toggleSound}
              className="flex items-center gap-1.5 text-accent-amber font-semibold"
              aria-label={soundEnabled ? content.soundToggle.off : content.soundToggle.on}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? content.soundToggle.on : content.soundToggle.off}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


