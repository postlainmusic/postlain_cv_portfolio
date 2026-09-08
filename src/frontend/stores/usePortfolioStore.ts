import { create } from 'zustand';
import { soundEngine } from '../lib/audio';

export type PortfolioTab = 'overview' | 'manifesto' | 'experience' | 'skills' | 'education' | 'contact';
export type Locale = 'vi' | 'en';

interface PortfolioStore {
  activeTab: PortfolioTab;
  setActiveTab: (tab: PortfolioTab) => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
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
