import Button, { ButtonProps } from '@/components/Buttons/Button'
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import useIsLargeScreen from '@/hooks/useIsLargeScreen';
import { cn } from '@/lib/utils';
import { IconAlertCircleFilled, IconAlertSmall, IconAlertTriangleFilled, IconCircleCheckFilled, IconCircleXFilled, IconHelpCircleFilled, IconProps } from '@tabler/icons-react';
import React, { FC, PropsWithChildren, useState } from 'react'

interface DialogMessageProps extends PropsWithChildren {
  backButton?: { closeDialog?: boolean; button: ButtonProps };
  button?: React.ReactNode;
  status?: 'success' | 'error' | 'warning' | 'info' | 'default';
  CustomIcon?: React.ElementType<IconProps>
  isResponsive?: boolean;
  classNameDialogContent?: string;
  message: string;
  trigger: React.ReactNode;
  dialogOpen?: boolean;
  setDialogOpen?: (open: boolean) => void;
}

const GET_STATUS = (status: DialogMessageProps['status'],  CustomIcon?: DialogMessageProps['CustomIcon']) => {
  switch (status) {
    case "success":
      return { icon: IconCircleCheckFilled, classNameText: "text-green" };
    case "error":
      return { icon: IconCircleXFilled, classNameText: "text-red" };
    case "warning":
      return { icon: IconAlertTriangleFilled, classNameText: "text-orange-icon" };
    case "info":
      return { icon: IconAlertCircleFilled, classNameText: "text-blue-button" };
    default:
        return { icon: CustomIcon ?? IconHelpCircleFilled, classNameText: 'text-text-grey' };
  
  }
}

const DialogMessage: FC<DialogMessageProps> = ({
  button,
  trigger,
  message,
  children,
  setDialogOpen,
  dialogOpen,
  backButton,
  status = "default",
  isResponsive = true,
  classNameDialogContent,
}) => {
  const StatusData = GET_STATUS(status);
  const Icon = StatusData?.icon as React.ElementType<IconProps>;
  const classNameText = StatusData?.classNameText as string;

  const { isLargeScreen } = useIsLargeScreen({ minWidth: 768 });

  if (isResponsive && !isLargeScreen) {
    return (
      <Drawer open={dialogOpen} onOpenChange={setDialogOpen}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent
          className={cn(
            "bg-white dark:bg-grey-sec-dark border-outline dark:border-outline-dark",
            "flex flex-col gap-6 p-4",
            classNameDialogContent
          )}
        >
          <div className="flex items-center justify-center gap-1">
            <Icon size={22} className={classNameText} />
            <DrawerTitle
              className={cn(classNameText, "font-medium text-center")}
            >
              {message}
            </DrawerTitle>
          </div>
          {children}
          <div className="flex flex-col gap-2">
            {button && button}
            {backButton && backButton?.closeDialog && (
              <DrawerClose className='w-full'>
                <Button {...backButton.button} classNameText="text-text-grey" classNameContainer='w-full' />
              </DrawerClose>
            )}
            {backButton && !backButton?.closeDialog && (
              <Button {...backButton.button} classNameText="text-text-grey" />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={cn(
          "bg-white dark:bg-grey-sec-dark border-outline dark:border-outline-dark",
          "flex flex-col gap-6",
          classNameDialogContent
        )}
      >
        <div className="flex items-center justify-center gap-1">
          <Icon size={22} className={classNameText} />
          <DialogTitle className={cn(classNameText, "font-medium text-center")}>
            {message}
          </DialogTitle>
        </div>
        {children}
        <div className="flex flex-col gap-2">
          {button && button}
          {backButton && backButton?.closeDialog && (
            <DialogClose className='w-full'>
              <Button {...backButton.button} classNameText="text-text-grey" classNameContainer='w-full' />
            </DialogClose>
          )}
          {backButton && !backButton?.closeDialog && (
            <Button {...backButton.button} classNameText="text-text-grey" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogMessage