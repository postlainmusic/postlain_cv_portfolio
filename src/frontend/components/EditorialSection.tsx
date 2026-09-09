import React from 'react';
import { cn } from '../lib/utils';

interface EditorialSectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  borderTop?: boolean;
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({
  id,
  className,
  children,
  borderTop = true,
}) => {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 lg:py-32 transition-colors duration-300",
        borderTop && "border-t border-edge-subtle",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
};
