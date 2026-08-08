import { create } from 'zustand';
import type { ActivePanel, MobilePanel } from '../types';

interface UIState {
  activePanel: ActivePanel;
  mobilePanel: MobilePanel;
  isLoading: boolean;
  setActivePanel: (panel: ActivePanel) => void;
  togglePanel: (panel: ActivePanel) => void;
  setMobilePanel: (panel: MobilePanel) => void;
  toggleMobilePanel: (panel: MobilePanel) => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  activePanel: 'none',
  mobilePanel: 'none',
  isLoading: true,

  setActivePanel: (panel) => set({ activePanel: panel }),

  togglePanel: (panel) => {
    const current = get().activePanel;
    set({ activePanel: current === panel ? 'none' : panel });
  },

  setMobilePanel: (panel) => set({ mobilePanel: panel }),

  toggleMobilePanel: (panel) => {
    const current = get().mobilePanel;
    set({ mobilePanel: current === panel ? 'none' : panel });
  },

  setLoading: (loading) => set({ isLoading: loading }),
}));
