import React from 'react';
import { Check } from 'lucide-react';

interface AppleToastProps {
  message: string | null;
}

export const AppleToast: React.FC<AppleToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      aria-label="Thông báo trạng thái"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-zinc-900/90 text-white border border-white/20 shadow-2xl backdrop-blur-xl animate-fade-in pointer-events-none"
    >
      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
        <Check className="w-3.5 h-3.5" />
      </span>
      <span className="text-xs font-mono tracking-wide">{message}</span>
    </aside>
  );
};
