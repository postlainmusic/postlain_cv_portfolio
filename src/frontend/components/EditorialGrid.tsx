import React from 'react';
import { cn } from '../lib/utils';

interface EditorialGridProps {
  children: React.ReactNode;
  className?: string;
}

export const EditorialGrid: React.FC<EditorialGridProps> = ({ children, className }) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-6 lg:gap-8 items-start", className)}>
      {children}
    </div>
  );
};
