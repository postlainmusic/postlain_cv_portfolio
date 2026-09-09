import React from 'react';
import { cn } from '../lib/utils';

interface EditorialMediaSlotProps {
  src?: string;
  alt?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/4';
  title?: string;
  caption?: string;
  category?: string;
  className?: string;
}

export const EditorialMediaSlot: React.FC<EditorialMediaSlotProps> = ({
  src,
  alt,
  aspectRatio = '16/9',
  title = 'STRUCTURAL FREQUENCY ARCHITECTURE',
  caption = 'Fig // Visual representation of acoustic balance and operational structure.',
  category = 'ARCHIVAL DIAGRAM',
  className,
}) => {
  const aspectClass = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '3/4': 'aspect-[3/4]',
  }[aspectRatio];

  return (
    <figure className={cn("flex flex-col space-y-2.5", className)}>
      <div
        className={cn(
          "relative w-full rounded-md border border-edge-subtle bg-bg-surface flex flex-col justify-between p-4 sm:p-6 overflow-hidden select-none group hover:border-edge-active transition-colors duration-200",
          aspectClass
        )}
      >
        {/* Corner Archival Registration Marks */}
        <span aria-hidden="true" className="absolute top-2.5 left-2.5 text-xs font-mono text-ink-muted leading-none select-none">+</span>
        <span aria-hidden="true" className="absolute top-2.5 right-2.5 text-xs font-mono text-ink-muted leading-none select-none">+</span>
        <span aria-hidden="true" className="absolute bottom-2.5 left-2.5 text-xs font-mono text-ink-muted leading-none select-none">+</span>
        <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 text-xs font-mono text-ink-muted leading-none select-none">+</span>

        {/* Real Photo / Asset Viewport */}
        {src ? (
          <img
            src={src}
            alt={alt || title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <>
            {/* Top Metadata */}
            <div className="w-full flex items-center justify-between text-[10px] font-mono text-ink-muted uppercase tracking-wider relative z-10">
              <span>{category}</span>
              <span className="text-accent-amber font-bold">11°56'N 108°26'E</span>
            </div>

            {/* Center Architectural Vector Diagram */}
            <div className="my-auto flex flex-col items-center justify-center space-y-3 opacity-80 group-hover:opacity-100 transition-opacity relative z-10">
              <svg
                className="w-24 h-12 text-ink-muted"
                viewBox="0 0 100 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                role="img"
                aria-label={title}
              >
                <path d="M 0 20 Q 25 5, 50 20 T 100 20" />
                <line x1="50" y1="0" x2="50" y2="40" strokeDasharray="2 2" />
                <circle cx="50" cy="20" r="3" fill="#e2b714" stroke="none" />
              </svg>
              <span className="text-xs font-mono tracking-wider text-ink-body uppercase text-center font-medium">
                {title}
              </span>
            </div>

            {/* Bottom Technical Spec */}
            <div className="w-full flex items-center justify-between text-[10px] font-mono text-ink-muted uppercase relative z-10">
              <span>DA LAT STUDIO</span>
              <span>48kHz / 24-BIT</span>
            </div>
          </>
        )}
      </div>

      {caption && (
        <figcaption className="text-[11px] font-mono text-ink-muted tracking-wide leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

