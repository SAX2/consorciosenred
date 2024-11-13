"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import useIsLargeScreen from '@/hooks/useIsLargeScreen';
import Input from '@/components/Form/Input';
import { IconChevronRight } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { content } from './constans';


const NewUnitDialog = ({ className, classSpan }:  { className?: string, classSpan?: string }) => {
  const { isLargeScreen } = useIsLargeScreen({ minWidth: 768 })

  if (isLargeScreen) {
    return (
      <Dialog>
        <DialogTrigger
          className={cn(
            "w-fit px-2 py-1 flex items-center gap-[6px] border border-[#75B838]/25 bg-[#75B838]/25 dark:text-green text-green-sec rounded-md  max-lg:w-full  max-lg:justify-center",
            className
          )}
        >
          <span className={cn("font-medium", classSpan)}>
            {content.trigger}
          </span>
          <IconChevronRight width={20} height={20} />
        </DialogTrigger>
        <DialogContent className="bg-white dark:bg-grey-sec-dark border-outline dark:border-outline-dark max-w-[425px] !text-start gap-6">
          <DialogHeader>
            <DialogTitle className="font-geist text-2xl dark:text-white">{content.title}</DialogTitle>
            <DialogDescription className="text-text-grey text-md">{content.description}</DialogDescription>
          </DialogHeader>
          <Form className="!p-0" />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger
        className={cn(
          "!outline-none w-fit px-2 py-1 flex items-center gap-[6px] border border-[#75B838]/25 bg-[#75B838]/25 dark:text-green text-green-sec rounded-md  max-lg:w-full  max-lg:justify-center",
          className
        )}
      >
        <span className={cn("font-medium", classSpan)}>{content.trigger}</span>
        <IconChevronRight width={20} height={20} />
      </DrawerTrigger>
      <DrawerContent className="bg-white dark:bg-grey-sec-dark border-outline dark:border-outline-dark !text-start">
        <DrawerHeader>
          <DrawerTitle className="font-geist text-2xl dark:text-white text-start">
            {content.title}
          </DrawerTitle>
          <DrawerDescription className="text-text-grey text-md text-start">
            {content.description}
          </DrawerDescription>
        </DrawerHeader>
        <Form />
      </DrawerContent>
    </Drawer>
  );
}

const Form = ({ className }: { className?: string }) => {
  return (
    <form className={cn("pt-8 flex flex-col gap-2 p-4 pb-8", className)}>
      <Input
        label={content.label}
        type="pattern"
        classNameContainerInput="w-full"
        patternProps={{ format: "#### #### #### #### ####", placeholder: "0000 0000 0000 0000" }}
      />
      <button className="w-full justify-center px-2 py-1 flex items-center gap-[6px] border border-[#75B838]/25 bg-[#75B838]/25 dark:text-green text-green-sec rounded-md">
        <span className="font-medium">{content.button}</span>
        <IconChevronRight width={20} height={20} />
      </button>
    </form>
  );
}

export default NewUnitDialog