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
    <div className="min-h-screen bg-[#08090a] text-zinc-100 flex flex-col selection:bg-accent-amber selection:text-black">
      
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-accent-amber text-black font-mono text-xs font-bold rounded"
      >
        Skip to main content
      </a>

      {/* Global Masthead */}
      <Masthead content={content.masthead} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1 w-full">
        {children}
      </main>

      {/* Audio Experience Dock */}
      <AudioPlayerBar
        listeningContent={content.chapter02.listeningRoom}
        platformUrl={content.chapter02.platformUrl}
      />

      {/* Footer Colophon */}
      <Colophon content={content.colophon} />
    </div>
  );
};
