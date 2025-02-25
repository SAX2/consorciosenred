"use client"

import React, { useState } from 'react'
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import getParams from '@/env/getParams';
import { reserveIcon } from '@/lib/contents/(app)/contents';
import Pill from '@/components/Pill';
import { getStatusType } from '@/hooks/use-status';
import Button from 'app/components/Buttons/Button';
import { IconActivity, IconCalendar, IconChevronUp, IconCircleXFilled, IconClockHour5, IconInfoCircle, IconInfoCircleFilled, IconMoneybag, IconPlus } from '@tabler/icons-react';
import DialogMessage from '@/components/Dialogs/Message';
import SemiSection from '@/components/Sections/AppSections/SemiSection';
import { cancelTurn } from '@/lib/queries/queries';
import { useRouter } from 'next/navigation';
import useIsLargeScreen from '@/hooks/useIsLargeScreen';
import BottomSection from '@/components/Sections/AppSections/BottomSection';


const ReservationCard = ({ item, param }: { item: any, index: number, param: string }) => {
  const fechaCompleta = parse(`${item.fecha} ${item.desde}`, "dd/MM/yyyy HH:mm:ss", new Date());
  const formattedDate = format(fechaCompleta, "eeee d 'de' MMMM 'a las' h:mm a", { locale: es });
  const date = format(fechaCompleta, "eeee d 'de' MMMM", { locale: es });
  const start = format(parse(item.hasta, "HH:mm:ss", new Date()), "HH:mm 'hs'", { locale: es });
  const end = format(parse(item.desde, "HH:mm:ss", new Date()), "HH:mm 'hs'", { locale: es });
  
  const router = useRouter()
  const id = getParams({ params: param, type: "id" })
  const [isOpen, setIsOpen] = useState(false);

  const handleCancelTurn = async () => {
    const startDate = parse(`${item.fecha} ${item.desde}`, "dd/MM/yyyy HH:mm:ss", new Date());
    const endDate = parse(`${item.fecha} ${item.hasta}`, "dd/MM/yyyy HH:mm:ss", new Date());
  
    const data = await cancelTurn({
      eventos: [
        {
          accion: "",
          recurso: item.codRecurso,
          start: startDate.getTime().toString(),
          end: endDate.getTime().toString(),
          id: item.id,
          fechaHoraDesde: `${item.fecha} ${item.desde}`,
          title: item.recuGrupoLabel,
          pn: id,
        },
      ],
    }); 

    console.log(data)

    if (data.PROCESS) {
      router.refresh();
      setIsOpen(false)
    }
  };

  return (
    <>
      <div className="flex gap-2 p-3 bg-grey dark:bg-grey-dark w-full flex-1 flex-col overflow-hidden rounded-2xl">
        <div className="flex gap-3 items-center flex-1">
          <div
            style={{
              backgroundColor: reserveIcon(item.recuGrupo, 20).background,
            }}
            className="p-2 rounded-xl flex flex-col"
          >
            {reserveIcon(item.recuGrupo, 40).icon}
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <div className="flex gap-2 items-center">
              <p className="text-lg font-semibold max-w-full">
                {item.recuGrupoLabel}
              </p>
              <Pill
                text={item.estado}
                className="py-0"
                classNameText="text-base"
                variant={getStatusType("reservas", item.estado)}
              />
            </div>
            <div className="flex">
              <Pill
                text={formattedDate}
                className="py-0 px-2"
                classNameText="text-base"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setIsOpen(true)}
            icon={<IconChevronUp size={24} className="text-text-grey" />}
            iconOrientation="right"
            title="Ver detalles"
            textSize="text-lg"
            buttonBackground="bg-grey-sec dark:bg-grey-sec-dark"
            classNameText="text-text-grey"
            classNameContainer="flex-1"
          />
        </div>
      </div>
      <DialogMessage
        setDialogOpen={setIsOpen}
        dialogOpen={isOpen}
        message="Detalles de la Reserva"
        trigger={null}
        button={
          item.estado !== "Anuló Prop." && (
            <Button
              onClick={handleCancelTurn}
              icon={<IconCircleXFilled size={24} className="fill-white" />}
              title="Cancelar este turno"
              classNameContainer="mt-1"
              buttonBackground="bg-red"
              classNameText="text-white"
            />
          )
        }
      >
        <div className="flex flex-col gap-2">
          <SemiSection
            type="simple"
            title="Estado de la reservas"
            icon={<IconActivity size={24} />}
          >
            <Pill
              text={item.estado}
              className="py-0"
              classNameText="text-base"
              variant={getStatusType("reservas", item.estado)}
            />
          </SemiSection>
          <SemiSection
            type="simple"
            title="Estado de la reservas"
            icon={<IconMoneybag size={24} />}
          >
            <Pill
              text={new Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(item.importe)}
              className="py-0"
              classNameText="text-base"
            />
          </SemiSection>
          <SemiSection
            type="simple"
            title="Dia de la reserva"
            icon={<IconCalendar size={24} />}
          >
            <Pill text={date} className="py-0" classNameText="text-base" />
          </SemiSection>
          <SemiSection
            type="multiple"
            title="Horarios"
            icon={<IconClockHour5 size={24} />}
            content={[
              {
                title: "Desde",
                children: (
                  <Pill
                    text={start}
                    className="py-0"
                    classNameText="text-base"
                  />
                ),
              },
              {
                title: "Hasta",
                children: (
                  <Pill text={end} className="py-0" classNameText="text-base" />
                ),
              },
            ]}
          />
        </div>
      </DialogMessage>
    </>
  );
}

interface ReservationsScreenProps {
  data: any[];
  param?: string;
}

const ReservationsScreen = ({ data, param }: ReservationsScreenProps) => {

  return (
    <>
      <div className='flex flex-col gap-[10px]'>
        {data.map((item, index) => {
          return (
            <ReservationCard
              param={param as string}
              item={item}
              index={index}
              key={`reservation_${item.id + index}`}
            />
          );
        })}
      </div>
    </>
  );
}

export const BottomSectionReserve = ({ param }: { param: string }) => {
  const { isLargeScreen } = useIsLargeScreen({ minWidth: 768 });

  return (
    <>
      {!isLargeScreen && (
        <BottomSection>
          <Button
            href={`/prp/expensas/${param}/reservas/reservar`}
            title="Nueva reserva"
            classNameContainer="w-full"
            buttonBackground="bg-green"
            classNameText="text-white"
            icon={<IconPlus size={24} className="text-white" />}
          />
        </BottomSection>
      )}
    </>
  );
}

export default ReservationsScreen