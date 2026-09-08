import { create } from 'zustand';

export type PortfolioTab = 'overview' | 'experience' | 'projects' | 'skills' | 'contact';

interface PortfolioStore {
  activeTab: PortfolioTab;
  setActiveTab: (tab: PortfolioTab) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  activeTab: 'overview',
  setActiveTab: (tab) => set({ activeTab: tab }),
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
