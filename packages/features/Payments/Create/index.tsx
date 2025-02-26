"use client";

import React, { FC, PropsWithChildren, useEffect, useState, useTransition } from "react";
import { z, ZodFormattedError } from 'zod';
import { IconCalendar, IconCheck, IconChevronDown } from '@tabler/icons-react';
import { cn } from 'app/lib/utils';
import FileSelectorDrag from 'app/components/Form/InputFileSelector';
import Input, { inputClassName, Label } from 'app/components/Form/Input';
import InputCalendar from 'app/components/Form/InputCalendar';
import { createNotifyPayment } from "app/services/queries";
import InputSubmit from "app/components/Form/InputSubmit";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "app/components/ui/accordion";
import IconUnit from "app/components/Icons/IconUnit";

interface NewPaymentProps extends PropsWithChildren {
  totalImport: number;
  unitId: string;
  unitCode: string;
}

const Rcl = z.object({
  importe: z.number().min(1, "Debe ingresar una cantidad mayor a $0"),
  fecha: z.date({ required_error: "Selecciona una fecha" }),
  comentario: z.string({ invalid_type_error: "La 'Descripción' debe ser un texto válido." }),
  adjuntos: z.array(z.string()).min(1, { message: "Es obligatório que envíe una foto del comprobante" }),
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

    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleCustomAmount = () => {
    setIsCustomAmount(prev => !prev);
    if (isCustomAmount) {
      setFormValues(prev => ({ ...prev, importe: totalImport }));
    } else {
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

      console.log(res)

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
      <Label
        label="*Fecha de pago (Colocar la misma fecha que la del comprobante)"
        classname="flex flex-col gap-1"
      >
        <InputCalendar
          field={{
            value: formValues.fecha,
            onChange: (date: Date | null) =>
              setFormValues((prev) => ({ ...prev, fecha: date ?? new Date() })),
          }}
        />
      </Label>
      <Label
        label="Importe a pagar*"
        classname="flex flex-col gap-1"
        error={errors.importe?._errors[0]}
      >
        <div
          className={cn(
            inputClassName(""),
            "flex flex-col gap-1 justify-center items-center",
            errors.importe?._errors[0] && "!outline-4 !outline-red/5 !dark:outline-red/30 !border-red !dark:border-red-400"
          )}
        >
          <Input
            name="importe"
            type="number"
            numericProps={{
              name: "importe",
              decimalSeparator: ",",
              thousandSeparator: ".",
              prefix: "$",
              placeholder: "$00,00",
              onChange: (e: any) => {
                const normalized = e.target.value
                  .replace(/\$/g, "")
                  .replace(/\./g, "")
                  .replace(",", ".");
                return setFormValues((prev) => ({
                  ...prev,
                  importe: parseFloat(normalized),
                }));
              },
              value: formValues.importe,
              disabled: !isCustomAmount,
            }}
            className="text-center font-bold text-4xl border-0 disabled:bg-white disabled:text-text-grey/75 disabled:cursor-not-allowed"
            classNameContainerInput="border-0"
          />
          <div className="flex flex-wrap gap-2 max-w-[300px] justify-center">
            <button
              className="flex items-center gap-2"
              onClick={handleToggleCustomAmount}
              type="button"
            >
              <div
                className={cn(
                  "rounded-sm border border-outline dark:border-outline-dark",
                  !isCustomAmount &&
                    "bg-blue text-white !border-blueda dark:!border-blue"
                )}
              >
                <IconCheck
                  size={16}
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
      </Label>
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
        <Label
          label="*Archivos adjuntos"
          classname="flex flex-col gap-1"
          error={errors.adjuntos?._errors[0]}
        >
          <FileSelectorDrag
            error={errors?.adjuntos?._errors?.[0]}
            onFilesSelected={handleFilesSelected}
            acceptedFileTypes={["image/jpeg", "image/png", "application/pdf"]}
          />
        </Label>
      </div>
      <InputSubmit
        status={
          isPending
            ? "loading"
            : queryError
            ? "error"
            : querySuccess
            ? "success"
            : "idle"
        }
        idleText="Notificar"
        loadingText="Notificando"
        successText="Pago notificado correctamente"
        errorText="Error al notificar el pago"
        type="submit"
        className="mb-8 bg-blue-button text-white border-0 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-auto"
        value="Notificar"
      />
    </form>
  );
};

interface AccordionNewPaymentDetailsProps {
  unit: any;
  id: string;
}

export const AccordionNewPaymentDetails: FC<AccordionNewPaymentDetailsProps> = ({ unit, id }) => {
  return (
    <Accordion type="multiple">
      <AccordionItem
        value={id}
        className="!p-3 rounded-xl bg-grey dark:bg-grey-dark w-full flex flex-col h-fit gap-[6px]"
      >
        <AccordionTrigger className="w-full [&>svg]:hidden hover:no-underline flex flex-col gap-2 !p-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-2 items-center">
              <IconUnit
                id={unit.id}
                name=""
                iconSize={14}
                size={24}
                padding="p-1"
              />
              <p className="text-black font-semibold">{unit.uf_domiDpto}</p>
            </div>
            <IconChevronDown size={24} className="text-text-grey" />
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-text-grey font-medium">Importe a pagar</p>
            <p className="font-semibold font-geist">{unit.uf_importeTotal}</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-0 flex flex-col gap-[6px]">
          <div className="flex items-center justify-between w-full">
            <p className="text-text-grey font-medium text-base">Ultima expensa</p>
            <p className="text-text-grey font-semibold font-geist text-base">$ {unit.uf_importeUltimaExpensa}</p>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-text-grey font-medium text-base">Intereses acumulados</p>
            <p className="text-text-grey font-semibold font-geist text-base">{unit.uf_importeInteresAcumulado}</p>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-text-grey font-medium text-base">Deudas acumuladas</p>
            <p className="text-text-grey font-semibold font-geist text-base">{unit.uf_importeExpensasAcumulado}</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default NewPayment;