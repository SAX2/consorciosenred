"use client"

import Button from "app/components/Buttons/Button";
import { TimeLineTitle } from "app/components/Sections/Timeline";
import { IconChevronRight, IconCopy } from "@tabler/icons-react";
import { toast } from "sonner";

export const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Texto copiado correctamente");
};

const MercadoPago = "https://www.mercadopago.com.ar/home";

const handleOpenMp = () => {
  window.open(MercadoPago)
};

export const content = {
  bank: "El Servicio Integral de Recaudación de Banco Roela (ROELA SIRO), brinda los servicios para recaudar la cobranza de las expensas en nombre de su edificio.",
  expires: (vencimiento: string) => (
    <p className="text-black/75 dark:text-white/75">
      Abone su importe hasta el
      <b className="font-semibold"> {vencimiento}</b> inclusive, directamente
      desde aquí por medio de su Código de Pago Electrónico
    </p>
  ),
  timeline: {
    title: "Cómo concretar el pago?",
    items: (code: string) => [
      <div className="flex flex-col gap-3">
        <TimeLineTitle className="font-semibold">Paso 1</TimeLineTitle>
        <p className="text-black/75 dark:text-white/75">
          Pulse el botón que esta debajo, eso copia el
          <b className="font-semibold"> Código de Pago Electrónico.</b> Después
          vaya al paso 2 ó 3.
        </p>
        <div className="flex-1">
          <Button
            onClick={() => handleCopy(code)}
            title="Tocar para copiar codigo"
            icon={<IconCopy size={22} />}
            buttonBackground=""
            classNameText="truncate"
            classNameContainer="border border-outline dark:border-outline-dark w-full"
            iconOrientation="right"
          />
        </div>
      </div>,
      <div className="flex flex-col gap-3">
        <TimeLineTitle className="font-semibold">Paso 2</TimeLineTitle>
        <p className="text-black/75 dark:text-white/75">
          Ingrese a Mercado Pago
        </p>
        <Button
          onClick={handleOpenMp}
          classNameContainer="w-full"
          title="Ir a Mercado Pago"
          classNameText="text-black dark:text-white"
          icon={<IconChevronRight size={22} className="text-text-grey" />}
          iconOrientation="right"
        />
      </div>,
      <div className="flex flex-col gap-3">
        <TimeLineTitle className="font-semibold">Paso 3</TimeLineTitle>
        <ul className="flex flex-col gap-[6px] list-disc">
          <li className="text-black/75 dark:text-white/75 flex-1">
            Ingrese a <b className="font-semibold">Cuentas y Servicios</b> desde
            la pantalla de inicio de la app.
          </li>
          <li className="text-black/75 dark:text-white/75 flex-1">
            Seleccioné{" "}
            <b className="font-semibold">“Pagar una cuenta nueva”.</b>
          </li>
          <li className="text-black/75 dark:text-white/75 flex-1">
            Seleccione la opción de{" "}
            <b className="font-semibold">escanear el código de barras</b> de tu
            factura. Luego ponga Ingresar codigo y pegue el{" "}
            <b className="font-semibold">Código de Pago Electrónico</b>
          </li>
        </ul>
      </div>,
    ],
  },
};