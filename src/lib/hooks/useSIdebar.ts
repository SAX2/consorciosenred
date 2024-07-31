import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
}

const useSidebar = create<SidebarStore>((set) => ({
  isOpen: false, // Initial value for SSR
  toggle: () => set((state) => {
    const newState = !state.isOpen;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarOpen', JSON.stringify(newState));
    }
    return { isOpen: newState };
  }),
  setOpen: (open: boolean) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebarOpen", JSON.stringify(open));
    }
    set({ isOpen: open });
  }
}));

export default useSidebar;