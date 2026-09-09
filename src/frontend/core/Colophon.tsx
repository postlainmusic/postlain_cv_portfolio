import React from 'react';
import { SiteContent } from '../content/types';

interface ColophonProps {
  content: SiteContent['colophon'];
}

export const Colophon: React.FC<ColophonProps> = ({ content }) => {
  return (
    <footer className="w-full border-t border-edge-subtle bg-bg-base py-12 sm:py-16 text-xs font-mono text-ink-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start justify-between">
          <div className="md:col-span-6 space-y-2">
            <span className="font-display font-black text-sm text-ink-hero tracking-tight block">
              POSTLAIN // THE OPERATING FREQUENCY
            </span>
            <p className="text-ink-body text-xs font-normal leading-relaxed max-w-lg">
              {content.statement}
            </p>
          </div>

          <div className="md:col-span-6 md:text-right space-y-2">
            <span className="text-accent-amber font-semibold block">
              {content.coordinates}
            </span>
            <p className="text-[11px] text-ink-muted">
              {content.techStack}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-edge-subtle/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <span>{content.copyright}</span>
          <a
            href="#overture"
            className="hover:text-accent-amber hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 ease-tactile uppercase inline-flex items-center"
          >
            [ Về đầu trang / Back to Top ↑ ]
          </a>
        </div>

      </div>
    </footer>
  );
};
