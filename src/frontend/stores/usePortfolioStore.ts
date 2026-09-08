import { create } from 'zustand';
import { soundEngine } from '../lib/audio';

export type PortfolioTab = 'overview' | 'manifesto' | 'experience' | 'skills' | 'education' | 'contact';
export type Locale = 'vi' | 'en';

interface PortfolioStore {
  activeAct: number; // 0: Hero/Overture, 1: Career Tour, 2: Hidden Music, 3: Matrix & Education, 4: Direct Dispatch
  totalActs: number;
  setActiveAct: (act: number) => void;
  nextAct: () => void;
  prevAct: () => void;
  activeTab: PortfolioTab;
  setActiveTab: (tab: PortfolioTab) => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  activeAct: 0,
  totalActs: 5,
  setActiveAct: (act) => {
    soundEngine.playClick(600 + act * 60);
    set({ activeAct: Math.max(0, Math.min(4, act)) });
  },
  nextAct: () => {
    set((state) => {
      const next = Math.min(state.totalActs - 1, state.activeAct + 1);
      if (next !== state.activeAct) {
        soundEngine.playClick(750);
      }
      return { activeAct: next };
    });
  },
  prevAct: () => {
    set((state) => {
      const prev = Math.max(0, state.activeAct - 1);
      if (prev !== state.activeAct) {
        soundEngine.playClick(550);
      }
      return { activeAct: prev };
    });
  },
  activeTab: 'overview',
  setActiveTab: (tab) => set({ activeTab: tab }),
  locale: 'vi',
  setLocale: (locale) => set({ locale }),
  toggleLocale: () => {
    soundEngine.playClick(784); // G5 blip
    set((state) => ({ locale: state.locale === 'vi' ? 'en' : 'vi' }));
  },
  soundEnabled: false,
  toggleSound: () =>
    set((state) => {
      const nextSound = !state.soundEnabled;
      soundEngine.toggleSound(nextSound);
      return { soundEnabled: nextSound };
    }),
}));

