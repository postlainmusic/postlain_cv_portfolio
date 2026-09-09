import React from 'react';
import { cn } from '../lib/utils';

interface DividerProps {
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ className }) => {
  return (
    <hr className={cn("w-full border-0 border-t border-edge-subtle my-0", className)} />
  );
};
