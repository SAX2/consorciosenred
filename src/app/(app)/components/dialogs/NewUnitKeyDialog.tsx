import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IconChevronRight } from '@tabler/icons-react';
import Input from '@/app/(auth)/components/Input';


const NewUnitKeyDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="w-fit px-2 py-1 flex items-center gap-[6px] border border-[#75B838]/25 bg-[#75B838]/25 dark:text-green text-green-sec rounded-md  max-md:w-full  max-md:justify-center">
        <span className="font-medium">Agregar / Modificar unidades</span>
        <IconChevronRight width={20} height={20} />
      </DialogTrigger>
      <DialogContent className="bg-grey-sec dark:bg-grey-sec-dark border-outline dark:border-outline-dark max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-geist text-2xl">
            Vinculación de Unidades Funcionales
          </DialogTitle>
          <DialogDescription className="text-text-grey text-md">
            Se deben ingresar los 20 dígitos de corrido, sin espacios ni guiones
            de por medio
          </DialogDescription>
          <form className="pt-8 flex flex-col gap-2">
            <Input label="Nuevo P.I.N. de activación" />
            <button className="w-full justify-center px-2 py-1 flex items-center gap-[6px] border border-[#75B838]/25 bg-[#75B838]/25 dark:text-green text-green-sec rounded-md">
              <span className="font-medium">Procesar P.I.N. de activación</span>
              <IconChevronRight width={20} height={20} />
            </button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default NewUnitKeyDialog