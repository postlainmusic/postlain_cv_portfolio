import { create } from 'zustand';

export type Locale = 'vi' | 'en';

interface AppStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  activeSection: string;
  setActiveSection: (id: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  locale: 'vi',
  setLocale: (locale) => set({ locale }),
  toggleLocale: () => set((state) => ({ locale: state.locale === 'vi' ? 'en' : 'vi' })),
  activeSection: 'overture',
  setActiveSection: (activeSection) => set({ activeSection }),
  soundEnabled: false,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
}));
