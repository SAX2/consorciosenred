"use client"

import React from 'react'
import { format, formatDistanceToNow, isToday, parse } from 'date-fns'
import { es } from 'date-fns/locale'
import DialogMessage from '@/components/Dialogs/Message'
import Button from '../../../../packages/components/Buttons/Button'
import { cn } from '@/lib/utils'
import { IconBellFilled, IconBellRingingFilled, IconCalendarFilled, IconChevronRight, IconFile, IconSettings } from '@tabler/icons-react'
import Pill from '@/components/Pill'
import SemiSection from '@/components/Sections/AppSections/SemiSection'

const NewDetail = ({ item }: { item: any }) => {
  const itemDate = parse(item.fecha, 'dd/MM/yyyy', new Date());
  const formattedDateTime = format(itemDate, "d 'de' MMMM, yyyy", { locale: es })

  return (
      <div className="flex flex-col gap-2">
        <SemiSection type="custom" title="" className="px-2">
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold text-black">{item.asunto}</p>
            <p className="text-base text-black/75 flex">
              {item.detalle}
            </p>
            {/* <SeeMoreText
              className="text-base text-black/75 flex"
              seeMoreClassName="font-medium text-black/75"
              numberOfLines={3}
            >
              {item.detalle} adasidujb
            </SeeMoreText> */}
          </div>
        </SemiSection>
        <SemiSection
          type="simple"
          title="Fecha de publicación"
          key="Fecha de publicación"
          icon={
            <IconCalendarFilled
              size={24}
              className="text-black"
            />
          }
        >
          <Pill
            text={formattedDateTime}
            classNameText="text-base"
            className="py-0"
          />
        </SemiSection>
        <SemiSection
          type="simple"
          title="Tipo de novedad"
          key="Tipo de novedad"
          icon={<IconSettings size={24} />}
        >
          <Pill text={item.tipo} classNameText="text-base" className="py-0" />
        </SemiSection>
        {item.adjuntosMobile.length > 0 && (
          <SemiSection type="custom" title="">
            <div className="flex w-full gap-2 items-center">
              <IconFile size={24} />
              {item.adjuntosMobile.map((item: any) => {
                return <Pill text={"Adjunto"} isFile fileId={item.id} fileName={item.nombre} fileType={item.tipo} className='text-sm'/>;
              })}
              {/* <PopoverFiles files={item.adjuntosMobile} totalLength={item.adjuntosMobile.length}/> */}
            </div>
          </SemiSection>
        )}
      </div>
  );
}

interface NewCardProps {
  item: any
  index: number
}

const NewCard = ({ item }: NewCardProps) => {
  return (
    <>
      <DialogMessage
        message="Detalles de la Novedad"
        trigger={
          <div className="flex flex-row rounded-2xl bg-grey p-3 gap-3 cursor-pointer">
            <div
              className={cn(
                "flex flex-col rounded-lg p-1 flex-shrink-0 self-start",
                item.estado === "Vigente" ? "bg-green" : "bg-blue-button"
              )}
            >
              {item.estado === "Vigente" ? (
                <IconBellFilled size={24} className="text-white" />
              ) : (
                <IconBellRingingFilled size={24} className="text-white" />
              )}
            </div>
            <div className="flex flex-col flex-1">
              <p className="text-lg font-bold text-black w-fit">
                {item.asunto}
              </p>
              <div className="flex justify-between gap-1 flex-1">
                <div className="flex gap-1 flex-wrap">
                  <Pill
                    text={
                      isToday(parse(item.fecha, "dd/MM/yyyy", new Date()))
                        ? "Hoy"
                        : formatDistanceToNow(
                            parse(item.fecha, "dd/MM/yyyy", new Date()),
                            { locale: es, addSuffix: true }
                          )
                    }
                    className="py-0 border-outline bg-white"
                    classNameText="text-base text-text-grey"
                    variant="custom"
                  />
                  <Pill
                    text={`${item.adjuntos.length} adjunto${
                      item.adjuntos.length == 1 ? "" : "s"
                    }`}
                    className="py-0 bg-grey-sec border-0"
                    classNameText="text-base text-text-grey"
                    variant="custom"
                  />
                </div>
                <Button
                  buttonPadding="pl-2"
                  iconOrientation="right"
                  classNameText="text-text-grey"
                  icon={
                    <IconChevronRight size={22} className="text-text-grey" />
                  }
                />
              </div>
            </div>
          </div>
        }
      >
        <NewDetail item={item} />
      </DialogMessage>
    </>
  );
}

export default NewCard