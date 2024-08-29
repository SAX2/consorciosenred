"use client"

import { FC, PropsWithChildren } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useRouter } from "next/navigation"
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import useIsLargeScreen from "@/hooks/useIsLargeScreen";
import { cn } from "@/lib/utils";
import { IconChevronLeft, IconX } from "@tabler/icons-react";
import { Separator } from "../ui/separator";

interface ModalProps extends PropsWithChildren {
  hasDrawerResponsive?: boolean;
  isParallel?: boolean;
  dialogTitle?: string;
  className?: string;
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

export const DialogFull: FC<PropsWithChildren & { onClick: (state: boolean) => void, dialogTitle?: string }> = ({ children, onClick, dialogTitle = 'Modal' }) => {
  const handleClick = () => {
    onClick(false);
  }

  return (
    <div className="w-full h-dvh absolute top-0 left-0 z-50 bg-white dark:bg-black-app-bg">
      <div className="flex flex-col">
        <div className="w-full flex justify-between items-center px-3 py-4">
          <div className="flex items-center gap-2">
            <button onClick={handleClick} className="flex items-center gap-1 text-lg font-medium text-text-grey">
              <IconChevronLeft width={24} height={24} />  
              Cancelar
            </button>
          </div>
        </div>
        <Separator />
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}

const Modal: FC<ModalProps> = ({ children, hasDrawerResponsive = false, isParallel = false, dialogTitle, className }) => {
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
    <Dialog defaultOpen={true} modal={true} onOpenChange={handleOpenChange}>
      <ModalContent className={className}>
        <DialogHeader>
          <DialogTitle className="font-geist text-2xl dark:text-white">
            {dialogTitle}
          </DialogTitle>
        </DialogHeader>
        {children}
      </ModalContent>
    </Dialog>
  );
  
  const dialogFull = (
    <DialogFull onClick={handleOpenChangeDrawer} dialogTitle={dialogTitle}>
      {children}
    </DialogFull>
  );

  if (hasDrawerResponsive && !isLargeScreen) return dialogFull;
  return dialog;
}

export default Modal