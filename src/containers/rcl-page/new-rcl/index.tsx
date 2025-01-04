"use client";

import React, { useState, useTransition, FC, PropsWithChildren } from 'react'
import { createNewRcl } from '@/lib/queries/queries';
import { z, ZodFormattedError } from 'zod'
import FileSelectorDrag from '@/components/Form/FileSelectorDrag';
import Input from '@/components/Form/Input';
import getParams from '@/env/getParams';
import InputSubmit from '@/components/Form/InputSubmit';

interface NewRclProps extends PropsWithChildren {
  id: string,
}

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
  adjuntos: z.array(z.string()).optional(),
});

type RclFormValues = z.infer<typeof Rcl>;
type RclFormErrors = ZodFormattedError<RclFormValues>;

const NewRcl: FC<NewRclProps> = ({ id, children }) => {
  const [formValues, setFormValues] = useState<RclFormValues>({
    Rcl_Sobre: 'Departamento',
    Rcl_Type: 'Administrativo',
    Rcl_DateTime: new Date().toISOString(),
    Rcl_Subject: '',
    Rcl_Description: '',
    adjuntos: [],
  });
  const [errors, setErrors] = useState<Partial<RclFormErrors>>({});

  const arrRclAbout = [{ arr: ["Departamento", "Edificio"] }];
  const arrRclType = [{ arr: ["Reparaciones", "Administrativo"] }];

  const [isPending, startTransition] = useTransition();
  const [queryError, setQueryError] = useState(false);
  const [querySuccess, setQuerySuccess] = useState(false);

  const unitId = getParams({ params: id, type: "id" });

  const onChangeRclAbout = (value: string) => {
    setFormValues((prev) => ({ ...prev, Rcl_Sobre: value }));
  };

  const onChangeRclType = (value: string) => {
    setFormValues((prev) => ({ ...prev, Rcl_Type: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = Rcl.safeParse(formValues);

    setQueryError(false);
    setQuerySuccess(false);

    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    startTransition(async () => {
      try {
        const res = await createNewRcl({
          ...formValues,
          id: unitId,
          Rcl_Description: formValues.Rcl_Description.trim(),
          Rcl_DateTime: new Date(formValues.Rcl_DateTime).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '/'),
        });

        console.log(res);

        if (res.ERROR || res.ERROR_CATCH === null) {
          setQueryError(true);
        } else {
          setQuerySuccess(true);
        }
      } catch (error) {
        console.error("ERROR CATCH:", error);
        setQueryError(true);
      }
    });

    setErrors({});
  };

  const handleFilesSelected = (files: File[]) => {
    const convertToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64String = reader.result as string;
          const base64WithoutPrefix = base64String.split(',')[1];
          resolve(base64WithoutPrefix);
        };
        reader.onerror = error => reject(error);
      });
    };

    Promise.all(files.map(file => convertToBase64(file)))
      .then(base64Files => {
        setFormValues(prev => ({
          ...prev,
          adjuntos: [...(prev.adjuntos || []), ...base64Files],
        }));
      })
      .catch(error => {
        console.error('Error al convertir archivos a base64:', error);
      });
  };

  return (
    <>
      {children}
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
          type='text'
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
          <FileSelectorDrag
            onFilesSelected={handleFilesSelected}
            acceptedFileTypes={["image/png", "image/jpeg", "image/jpg"]}
            className="w-full"

          />
        </div>
        <InputSubmit
          status={isPending ? 'loading' : queryError ? 'error' : querySuccess ? 'success' : 'idle'}
          idleText="Enviar reclamo"
          loadingText="Enviando reclamo..."
          successText="Reclamo enviado correctamente"
          errorText="Error al enviar el reclamo"
          className="bg-orange-icon text-white border-0 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-auto"
          value="Enviar reclamo"
        />
      </form>
    </>
  );
}

export default NewRcl