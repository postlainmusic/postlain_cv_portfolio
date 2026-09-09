import React from 'react';
import { Masthead } from './Masthead';
import { Colophon } from './Colophon';
import { AudioPlayerBar } from './AudioPlayerBar';
import { SiteContent } from '../content/types';

interface LayoutProps {
  content: SiteContent;
  activeSection: string;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  content,
  activeSection,
  children,
}) => {
  return (
    <div className="min-h-screen bg-bg-base text-ink-body flex flex-col selection:bg-accent-amber selection:text-bg-base">
      
      {/* Accessible Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-accent-amber text-bg-base font-mono text-xs font-bold rounded-md"
      >
        Skip to main content
      </a>

      {/* Global Masthead */}
      <Masthead content={content.masthead} activeSection={activeSection} />

      {/* Main Narrative Flow */}
      <main id="main-content" className="flex-1 w-full">
        {children}
      </main>

      {/* Audio Experience Dock */}
      <AudioPlayerBar
        listeningContent={content.chapter02.listeningRoom}
        ventureUrl={content.chapter02.ventureUrl}
      />

      {/* Colophon & Footer */}
      <Colophon content={content.colophon} />
    </div>
  );
};
