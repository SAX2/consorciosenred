import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

type MobileMenuStore = {
  isOpen: boolean;
  setClose: () => void;
  setOpen: () => void;
  toggle: () => void;
};

export const useMobileMenuStore = (id: string) => create<MobileMenuStore>()(persist(
  (set) => ({
    isOpen: false,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    setOpen: () => set(() => ({ isOpen: true })),
    setClose: () => set(() => ({ isOpen: false })),
  }),
  {
    name: `mobile-menu-${id}`,
    storage: createJSONStorage(() => sessionStorage)
  }
));

export const useUnitMenuStore = useMobileMenuStore('unit');
export const useUserMenuStore = useMobileMenuStore('user');