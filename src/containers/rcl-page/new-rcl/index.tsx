"use client";

import FileSelectorDrag from '@/components/Form/FileSelectorDrag';
import Input from '@/components/Form/Input';
import { ModalContent } from '@/components/Modal';
import { DialogTitle } from '@/components/ui/dialog';
import React, { useState } from 'react'
import { z, ZodFormattedError } from 'zod'

const Rcl = z.object({
  Rcl_Sobre: z.string(),
  Rcl_Type: z.string(),
  Rcl_DateTime: z.string(),
  Rcl_Subject: z.string({
    required_error: "El campo 'Título' es obligatorio.",
    invalid_type_error: "El 'Título' debe ser un texto válido.",
  }).min(1, { message: "El campo 'Título' no puede estar vacío." }),
  Rcl_Description: z.string({
    required_error: "El campo 'Descripción' es obligatorio.",
    invalid_type_error: "La 'Descripción' debe ser un texto válido.",
  }).min(1, { message: "El campo 'Descripción' no puede estar vacío." }),
});

type RclFormValues = z.infer<typeof Rcl>;
type RclFormErrors = ZodFormattedError<RclFormValues>;

const NewRcl = () => {
  const [formValues, setFormValues] = useState<RclFormValues>({
    Rcl_Sobre: 'Departamento',
    Rcl_Type: 'Administrativo',
    Rcl_DateTime: new Date().toISOString(),
    Rcl_Subject: '',
    Rcl_Description: '',
  });
  const [errors, setErrors] = useState<Partial<RclFormErrors>>({});

  const arrRclAbout = [{ arr: ["Departamento", "Edificio"] }];
  const arrRclType = [{ arr: ["Reparaciones", "Administrativo"] }];

  const onChangeRclAbout = (value: string) => {
    setFormValues((prev) => ({ ...prev, Rcl_Sobre: value }));
  };

  const onChangeRclType = (value: string) => {
    setFormValues((prev) => ({ ...prev, Rcl_Type: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = Rcl.safeParse(formValues);
    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors(formattedErrors);
      return;
    }

    console.log("Formulario enviado con éxito", formValues);
    setErrors({});
  };

  return (
    <ModalContent className="gap-6 !max-w-[550px] p-4">
      <div className="overflow-y-auto flex-col flex gap-6">
        <DialogTitle className="font-geist text-2xl dark:text-white">
          Nuevo reclamo
        </DialogTitle>
      </div>
      <form
        className="flex flex-col gap-4 w-full max-md:py-6"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-4 w-full">
          <Input
            label="Reclamo sobre"
            type="select"
            selectDefaultValue="Departamento"
            selectOnChange={onChangeRclAbout}
            selectValues={arrRclAbout}
            className="w-full"
          />
          <Input
            label="Tipo de Reclamo"
            type="select"
            selectDefaultValue="Administrativo"
            selectOnChange={onChangeRclType}
            selectValues={arrRclType}
            className="w-full"
          />
        </div>
        <Input
          label="*Título"
          placeholder="Coloque un título"
          name="Rcl_Subject"
          value={formValues.Rcl_Subject}
          onChange={handleChange}
          error={errors?.Rcl_Subject?._errors?.[0]}
        />
        <Input
          className="min-h-[150px]"
          label="*Descripción"
          placeholder="Coloque una descripción"
          type="text-area"
          name="Rcl_Description"
          value={formValues.Rcl_Description}
          onChange={handleChange}
          error={errors?.Rcl_Description?._errors?.[0]}
        />
        <div className="flex flex-col gap-1 w-full">
          <label className="text-sm font-medium text-black/75 px-2 dark:text-white/75">
            Archivos adjuntos (Solo imágenes)
          </label>
          <FileSelectorDrag />
        </div>
        <Input
          type="submit"
          className="!bg-[#FFDF41]/35 icon-yellow border-0 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-auto"
          value={"Enviar reclamo"}
        />
      </form>
    </ModalContent>
  );
}

export default NewRcl