"use client";

import React, { FC, PropsWithChildren, useEffect, useState, useTransition } from "react";
import { z, ZodFormattedError } from 'zod';
import { IconCalendar, IconCheck } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import FileSelectorDrag from '@/components/Form/FileSelectorDrag';
import Input from '@/components/Form/Input';
import InputCalendar from '@/components/Form/InputCalendar';
import { createNotifyPayment } from "@/lib/queries/queries";
import toast, { Toaster } from "react-hot-toast";
import InputSubmit from "@/components/Form/InputSubmit";

interface NewPaymentProps extends PropsWithChildren {
  totalImport: number;
  unitId: string;
  unitCode: string;
}

const Rcl = z.object({
  importe: z.number(),
  fecha: z.date({ required_error: "Selecciona una fecha" }),
  comentario: z.string({ invalid_type_error: "La 'Descripción' debe ser un texto válido." }),
  adjuntos: z.array(z.string()).optional(),
  pagoTotal: z.boolean(),
});

type RclFormValues = z.infer<typeof Rcl>;
type RclFormErrors = ZodFormattedError<RclFormValues>;

const NewPayment: FC<NewPaymentProps> = ({ children, totalImport, unitId, unitCode }) => {
  const [formValues, setFormValues] = useState<RclFormValues>({
    fecha: new Date(),
    importe: totalImport,
    comentario: "",
    adjuntos: [],
    pagoTotal: true
  });
  const [errors, setErrors] = useState<Partial<RclFormErrors>>({});
  const [isCustomAmount, setIsCustomAmount] = useState<boolean>(false);
  const [customAmount, setCustomAmount] = useState<string>(totalImport.toFixed(2).replace('.', ','));

  const [isPending, startTransition] = useTransition();
  const [queryError, setQueryError] = useState<boolean>(false);
  const [querySuccess, setQuerySuccess] = useState<boolean>(false);

  useEffect(() => {
    setFormValues(prev => ({ 
      ...prev, 
      pagoTotal: !isCustomAmount, 
      importe: isCustomAmount ? parseFloat(customAmount.replace(',', '.')) : totalImport 
    }));
  }, [isCustomAmount, customAmount, totalImport]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    let valueImport = value;
    if (value.length === 0) valueImport = "0";

    setFormValues(prev => ({
      ...prev,
      [name]: name === 'importe' ? parseFloat(valueImport) : value
    }));
  };

  const handleToggleCustomAmount = () => {
    setIsCustomAmount(prev => !prev);
    if (isCustomAmount) {
      setFormValues(prev => ({ ...prev, importe: totalImport }));
      setCustomAmount(totalImport.toFixed(2).replace('.', ','));
    } else {
      setCustomAmount(totalImport.toFixed(2).replace('.', ','));
      setFormValues(prev => ({ ...prev, importe: totalImport }));
    }
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
          adjuntos: base64Files
        }));
      })
      .catch(error => {
        console.error('Error al convertir archivos a base64:', error);
      });
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
      const res = await createNotifyPayment({
        ...formValues,
        comentario: formValues.comentario.trim(),
        codEdificio: unitCode,
        idDepto: unitId,
        fecha: formValues.fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '/'),
        adjuntos: formValues.adjuntos && formValues.adjuntos?.length > 0 ? formValues.adjuntos : [""]
      });
  
      if (!res.CODIGO) {
        setQueryError(true);
      } else {
        setQuerySuccess(true);
      }
    })

    setErrors({});
  };

  return (
    <form
      className="flex flex-col gap-4 w-full max-md:py-6"
      onSubmit={handleSubmit}
    >
      {children}
      <Input
        type="children"
        label="*Fecha de pago (Colocar la misma fecha que la del comprobante)"
        icon={
          <IconCalendar width={24} height={24} className="text-text-grey" />
        }
        orientation="icon-right"
      >
        <InputCalendar
          field={{
            value: formValues.fecha,
            onChange: (date: Date | null) =>
              setFormValues((prev) => ({ ...prev, fecha: date ?? new Date() })),
          }}
        />
      </Input>
      <div className="text-start w-full p-3 rounded-lg placeholder:text-text-grey/50 text-black outline-none border border-outline dark:text-white dark:border-outline-dark outline-offset-0 flex flex-col justify-center items-center gap-4">
        <label className="text-sm font-medium text-black/75 px-2 dark:text-white/75">
          *Importe pagado
        </label>
        <div className="flex items-start gap-1">
          <span className="text-2xl font-bold text-black/50 px-2 dark:text-white/50">
            $
          </span>
          <input
            type="number"
            name="importe"
            value={formValues.importe}
            onChange={handleChange}
            disabled={!isCustomAmount}
            className="font-bold text-4xl w-auto disabled:opacity-80 disabled:cursor-not-allowed disabled:bg-transparent focus:outline-none transition-all duration-300 ease-in-out !appearance-none active:border-0 active:outline-0"
            style={{
              width: `${formValues.importe.toString().length + 0.55}ch`,
              animation: "typing 0.5s steps(40, end)",
              WebkitAppearance: "none",
              MozAppearance: "textfield",
            }}
          />
        </div>
        <div className="flex flex-wrap gap-2 max-w-[300px] justify-center">
          <button
            className="flex items-center gap-2"
            onClick={handleToggleCustomAmount}
            type="button"
          >
            <div
              className={cn(
                "rounded-sm border border-outline dark:border-outline-dark",
                !isCustomAmount && "bg-blue text-white !border-blueda dark:!border-blue"
              )}
            >
              <IconCheck
                width={16}
                height={16}
                className={cn(isCustomAmount && "opacity-0")}
              />
            </div>
            <p
              className={cn(
                "font-medium text-text-grey",
                !isCustomAmount && "text-blue dark:text-[#70C4FF]"
              )}
            >
              Abono el importe total
            </p>
          </button>
        </div>
      </div>
      <Input
        className="min-h-[150px]"
        label="Mensaje"
        placeholder="Coloque un mensaje"
        type="text-area"
        name="comentario"
        value={formValues.comentario}
        onChange={handleChange}
        error={errors?.comentario?._errors?.[0]}
      />
      <div className="flex flex-col gap-1 w-full">
        <label
          className={cn(
            "text-sm font-medium text-black/75 px-2 dark:text-white/75",
            errors?.adjuntos?._errors?.[0] && "text-red-600 dark:text-red-400"
          )}
        >
          Archivos adjuntos (Opcional)
        </label>
        <FileSelectorDrag
          error={errors?.adjuntos?._errors?.[0]}
          onFilesSelected={handleFilesSelected}
          acceptedFileTypes={["image/jpeg", "image/png", "application/pdf"]}
        />
      </div>
      <InputSubmit
        status={isPending ? 'loading' : queryError ? 'error' : querySuccess ? 'success' : 'idle'}
        idleText="Notificar"
        loadingText="Notificando..."
        successText="Pago notificado correctamente"
        errorText="Error al notificar el pago"
        type="submit"
        className="mb-8 icon-blue border-0 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-auto"
        value="Notificar"
      />
    </form>
  );
};

export default NewPayment;