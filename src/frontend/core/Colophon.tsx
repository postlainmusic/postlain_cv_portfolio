import React from 'react';
import { ArrowUp } from 'lucide-react';
import { SiteContent } from '../content/types';

interface ColophonProps {
  content: SiteContent['colophon'];
}

export const Colophon: React.FC<ColophonProps> = ({ content }) => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#08090a] py-12 text-xs font-mono text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-display font-black text-sm text-white tracking-wider block">
              NGÔ PHÚC // MANAGER
            </span>
            <p className="text-zinc-400 text-xs max-w-lg">
              {content.statement}
            </p>
          </div>

          <div className="md:text-right space-y-1">
            <p className="text-[11px] text-zinc-500">
              {content.techStack}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span>{content.copyright}</span>
          <a
            href="#overture"
            className="text-zinc-300 hover:text-accent-amber transition-colors inline-flex items-center gap-1.5 uppercase font-bold"
          >
            <span>{content.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </footer>
  );
};
