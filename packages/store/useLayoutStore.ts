import { StaticImageData } from "next/image";
import { create } from "zustand";

type LayoutStore = {
  isInView: boolean;
  hasBuilding?: {
    id: string,
    direction: string;
    image: StaticImageData;
    unit: string;
  }
  handleHasBuilding: (val: {
    id: string,
    direction: string;
    image: StaticImageData;
    unit: string;
  }) => void;
  setIsInView: (status: boolean) => void;
};

export const useLayoutStore = create<LayoutStore>()((set) => ({
  isInView: true,
  hasBuilding: undefined,
  handleHasBuilding: (val: any) => set((state) => ({ hasBuilding: val })),
  setIsInView: (status: boolean) => set((state) => ({ isInView: status })),
}));