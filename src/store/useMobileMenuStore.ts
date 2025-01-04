import { create } from "zustand";

type MobileMenuStore = {
  isOpen: boolean;
  setClose: () => void;
  setOpen: () => void;
  toggle: () => void;
};

export const useMobileMenuStore = create<MobileMenuStore>()((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: () => set(() => ({ isOpen: true })),
  setClose: () => set(() => ({ isOpen: false })),
}));