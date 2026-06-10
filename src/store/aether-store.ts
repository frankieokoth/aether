import { create } from 'zustand';

interface AetherStore {
  view: string;
  prevView: string;
  isScrolled: boolean;
  setView: (view: string) => void;
  setIsScrolled: (scrolled: boolean) => void;
}

export const useAetherStore = create<AetherStore>((set) => ({
  view: 'HOME',
  prevView: 'HOME',
  isScrolled: false,
  setView: (newView) => set((state) => {
    if (newView === state.view) return state;
    return { prevView: state.view, view: newView };
  }),
  setIsScrolled: (scrolled) => set((state) => state.isScrolled === scrolled ? state : { isScrolled: scrolled }),
}));
