"use client"

import React, { useState, useTransition } from 'react'
import Input from '@/components/Form/Input';
import { IconApps, IconChevronRight } from '@tabler/icons-react';
import DialogMessage from '../Message';
import Button from 'app/components/Buttons/Button';
import SemiSection from '@/components/Sections/AppSections/SemiSection';
import { z, ZodFormattedError } from 'zod';
import InputSubmit from '@/components/Form/InputSubmit';
import { addNewUnit } from '@/lib/queries/queries';

export const content = {
  description: "Si desea vincularse a otra unidad como Propietario o Inquilino, puede ingresar el P.I.N. de activación que se adjunta en el recibo de expensas que usted recibe todos los meses. En caso de no poseerlo solicítelo a su Administración.",
  title: "Vinculación de Unidades Funcionales",
  label: "Se deben ingresar los 20 dígitos, sin espacios ni guiones", 
  button: "Procesar P.I.N. de activación",
  trigger: "Agregar / Modificar unidades"
}

const NewUnitDialog = () => {
  return (
    <DialogMessage
      message={content.title}
      CustomIcon={IconApps}
      trigger={
        <Button
          iconOrientation='right'
          title={content.trigger}
          icon={<IconChevronRight size={24} className='text-green' />}
          classNameContainer="border border-green/15 max-lg:w-full"
          buttonPadding='p-2 max-md:p-3'
          buttonBackground="bg-green/15"
          classNameText="text-green truncate max-lg:hidden max-md:block max-md:text-lg"
        />
      }
    >
      <SemiSection type='custom' title='' className='flex flex-col gap-3'>
        <p className='hyphens-auto' lang='es'>{content.description}</p>
      </SemiSection>
      <Form />
    </DialogMessage>
  );
}

const NewUnitSchema = z.object({
  pin: z.string().min(20, { message: "El pin debe ser de 24 numeros" }),
});

type NewUnitFormValues = z.infer<typeof NewUnitSchema>;
type NewUnitFormErrors = ZodFormattedError<NewUnitFormValues>;


const Form = () => {
  const [formValues, setFormValues] = useState<NewUnitFormValues>({ pin: "" });
  const [errors, setErrors] = useState<Partial<NewUnitFormErrors>>({});
  const [isPending, startTransition] = useTransition();
  const [queryError, setQueryError] = useState<boolean>(false);
  const [querySuccess, setQuerySuccess] = useState<boolean>(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s+/g, '');
    setFormValues(prev => ({ ...prev, pin: value }))
  }

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = NewUnitSchema.safeParse(formValues);

    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    startTransition(async () => {
      const data = await addNewUnit({ pin: formValues.pin })
      if (data.PROCESS) return setQuerySuccess(true);
      setQueryError(true)
    })

    setErrors({});
  }

  return (
    <form className={"flex flex-col gap-2"} onSubmit={handleOnSubmit}>
      <Input
        type="pattern"
        error={errors.pin?._errors[0]}
        label={content.label}
        classNameContainerInput="w-full text-center"
        patternProps={{ format: "#### #### #### #### ####", placeholder: "0000 0000 0000 0000", onChange: handleOnChange }}
      />
      <InputSubmit 
        status={ isPending ? "loading" : queryError ? "error" : querySuccess ? "success" : "idle" }
        idleText={content.button}
        idleIcon={<IconChevronRight size={24} className='text-green' />}
        className="border border-green/15 max-lg:w-full bg-green/15 text-green"
      />
    </form>
  );
}

export default NewUnitDialog