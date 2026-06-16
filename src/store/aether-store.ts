import { create } from 'zustand';

interface AetherStore {
  view: string;
  prevView: string;
  isScrolled: boolean;
  isNavigating: boolean;
  setView: (view: string) => void;
  setIsScrolled: (scrolled: boolean) => void;
  setIsNavigating: (navigating: boolean) => void;
}

export const useAetherStore = create<AetherStore>((set) => ({
  view: 'HOME',
  prevView: 'HOME',
  isScrolled: false,
  isNavigating: false,
  setView: (newView) => set((state) => {
    if (newView === state.view) return state;
    return { prevView: state.view, view: newView };
  }),
  setIsScrolled: (scrolled) => set((state) => state.isScrolled === scrolled ? state : { isScrolled: scrolled }),
  setIsNavigating: (navigating) => set({ isNavigating: navigating }),
}));
