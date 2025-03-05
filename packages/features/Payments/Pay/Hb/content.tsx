import Button from "app/components/Buttons/Button";
import { TimeLineTitle } from "app/components/Sections/Timeline";
import { IconChevronRight, IconCopy } from "@tabler/icons-react";
import { handleCopy } from "../Mp/content";

const RoelaSIRO = "https://siropagos.bancoroela.com.ar";

export const content = {
  bank: "El Servicio Integral de Recaudación de Banco Roela (ROELA SIRO), brinda los servicios para recaudar la cobranza de las expensas en nombre de su edificio.",
  expires: (vencimiento: string) => (
    <p className="text-black/75 dark:text-white/75">
      Abone su importe hasta el
      <b className="font-semibold"> {vencimiento}</b> inclusive,
      directamente desde aquí por medio de su Código de Pago Electrónico
    </p>
  ),
  timeline: {
    title: "Cómo concretar el pago?",
    items: (code: string) => [
      <div className="flex flex-col gap-3">
        <TimeLineTitle className="font-semibold">Paso 1</TimeLineTitle>
        <p className="text-black/75 dark:text-white/75">
          Pulse el botón que esta debajo, eso copia el
          <b className="font-semibold">
            {" "}
            Código de Pago Electrónico.
          </b>{" "}
          Después vaya al paso 2 ó 3.
        </p>
        <Button
          onClick={() => handleCopy(code)}
          title={code}
          icon={<IconCopy size={22} />}
          buttonBackground=""
          classNameText="text-black dark:text-white"
          classNameContainer="border border-outline dark:border-outline-dark"
          iconOrientation="right"
        />
      </div>,
      <div className="flex flex-col gap-3">
        <TimeLineTitle className="font-semibold">Paso 2</TimeLineTitle>
        <p className="text-black/75 dark:text-white/75">
          En la web de
          <b className="font-semibold"> SIRO Online</b> pegue el Código de
          Pago Electrónico y siga las instrucciones.
        </p>
        <Button
          href={RoelaSIRO}
          classNameContainer="w-full"
          classNameText="text-black dark:text-white"
          title="Abonar expensas con SIRO ONLINE"
          icon={<IconChevronRight size={22} className="text-text-grey"/>}
          iconOrientation="right"
        />
      </div>,
      <div className="flex flex-col gap-3">
        <TimeLineTitle className="font-semibold">Paso 3</TimeLineTitle>
        <p className="text-black/75 dark:text-white/75">
          En el <b className="font-semibold">HomeBanking</b> de su banco.
          Vaya Pago de Servicios, buscar ROELA SIRO,{" "}
          <b className="font-semibold">
            pegar el Código de Pago Electrónico
          </b>{" "}
          y pagar.
        </p>
        <p className="text-black/75 dark:text-white/75">
          La ventaja de pagar por éste medio es que en los meses sucesivos
          tendrá automáticamente las nuevas expensas en su calendario de Pagos o
          cuentas a pagar.
        </p>
      </div>,
    ],
  },
};