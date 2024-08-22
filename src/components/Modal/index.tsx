"use client"

import { FC, PropsWithChildren } from "react"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { useRouter } from "next/navigation"
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import useIsLargeScreen from "@/hooks/useIsLargeScreen";
import { cn } from "@/lib/utils";

interface ModalProps extends PropsWithChildren {
  hasDrawerResponsive?: boolean;
  isParallel?: boolean;
}

interface ModalContentProps extends PropsWithChildren {
  className?: string;
}

export const ModalContent: FC<ModalContentProps> = ({ children, className }) => {
  const { isLargeScreen } = useIsLargeScreen({ minWidth: 768 });

  const dialog = (
    <DialogContent
      className={cn(
        "bg-white dark:bg-grey-sec-dark border-outline dark:border-outline-dark",
        className
      )}
    >
      {children}
    </DialogContent>
  );

  const drawer = (
    <DrawerContent
      className={cn(
        "bg-white dark:bg-grey-sec-dark border-outline dark:border-outline-dark max-h-[calc(100dvh-60px)] h-full !outline-none",
        className
      )}
    >
      {children}
    </DrawerContent>
  );

  if (!isLargeScreen) return drawer;
  return dialog;
};

export const ModalTrigger: FC<PropsWithChildren> = ({ children }) => {
  const { isLargeScreen } = useIsLargeScreen({ minWidth: 768 });

  const dialog = <DialogTrigger asChild>{children}</DialogTrigger>;

  const drawer = (
   <DrawerTrigger asChild>{children}</DrawerTrigger>
  );

  if (!isLargeScreen) return drawer;
  return dialog;
};

const Modal: FC<ModalProps> = ({ children, hasDrawerResponsive = false, isParallel = false }) => {
  const router = useRouter();
  const { isLargeScreen } = useIsLargeScreen({ minWidth: 768 })

  const handleOpenChange = () => {
    if (isParallel) {
      router.back();
    }
  }

  const handleOpenChangeDrawer = (state: any) => {
    if (isParallel) {
      if (state === false) {
        router.back();
      }
    }

    return null;
  }

  const dialog = (
    <Dialog onOpenChange={handleOpenChange}>
      {children}
    </Dialog>
  );
  
  const drawer = (
    <Drawer onOpenChange={handleOpenChangeDrawer}>
      {children}
    </Drawer>
  );

  if (hasDrawerResponsive) {
    if (!isLargeScreen) return drawer;
  }

  return dialog;
}

export default Modal