"use client"

import ButtonFile from "app/components/Buttons/ButtonFile";
import UserIcon from "@/components/Icons/UserIcon";
import Pill from "@/components/Pill";
import SemiSection from "@/components/Sections/AppSections/SemiSection";
import { getStatusType } from "@/hooks/use-status";
import { cn } from "@/lib/utils";
import { IconAlertTriangle, IconChevronRight, IconFolderDollar, IconGavel, IconId, IconInfoCircle, IconMailExclamation, IconMessage, IconUserSquareRounded } from "@tabler/icons-react";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import React from "react";

interface InfoHeader {
  item: any;
}

const InfoHeader = ({ item }: InfoHeader) => {
  const itemDate = parse(item.Jui_DateTime, 'dd/MM/yyyy', new Date());
  const formattedDateTime = format(itemDate, "d 'de' MMMM, yyyy", { locale: es })

  return (
    <div className="flex items-center">
      <div className="flex flex-col bg-brown/10 dark:bg-brown-dark/10 mr-3 flex-shrink-0 self-start rounded-[16px] p-3">
        <IconAlertTriangle size={50} className="text-brown dark:text-brown-dark" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-sm font-medium text-text-grey leading-none">
          Expendiente: {item.Jui_Caratula}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">
            {item.Jui_Caratula}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-1">
            <Pill
              key="date-pill"
              text={formattedDateTime}
              classNameText="text-sm"
              className="py-0"
            />
            <Pill
              key="status-pill"
              text={item.Jui_Status}
              variant={getStatusType("juicios", item.Jui_Status)}
              classNameText="text-sm"
              className="py-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const PageDatos = ({ item }: { item: any }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <SemiSection
          key={"Objeto"}
          type="simple"
          title="Objeto"
          icon={<IconInfoCircle size={24} />}
        >
          <Pill
            text={item.Jui_Objeto}
            classNameText="text-sm"
            className="py-0 px-2"
          />
        </SemiSection>
        <SemiSection
          key={"Monto"}
          type="simple"
          title="Monto"
          icon={<IconFolderDollar size={24} />}
        >
          <Pill
            text={item.Jui_Monto}
            classNameText="text-sm"
            className="py-0 px-2"
          />
        </SemiSection>
        <SemiSection
          key={"Juzgado"}
          type="multiple"
          title="Juzgado"
          icon={<IconGavel size={24} />}
          content={[
            {
              title: "Fuero",
              children: (
                <Pill
                  text={item.Jui_Fuero}
                  classNameText="text-sm"
                  className="py-0 px-2"
                />
              ),
            },
            {
              title: "Tribunal",
              children: (
                <Pill
                  text={item.Jui_Tribunal}
                  classNameText="text-sm"
                  className="py-0 px-2"
                />
              ),
            },
            {
              title: "Juzgado Nro",
              children: (
                <Pill
                  text={item.Jui_JuzgadoNro}
                  classNameText="text-sm"
                  className="py-0 px-2"
                />
              ),
            },
          ]}
        >
          <Pill text={item.Jui_Monto} classNameText="text-sm" />
        </SemiSection>
        {item.Jui_Observaciones && (
          <SemiSection
            key="Jui_Message"
            type="custom"
            title={"Descripcion"}
            margin="top"
          >
            <div className="flex w-full flex-col gap-3">
              <div className="flex items-center gap-[6px]">
                <IconMessage size={24} />
                <p className="text-base font-semibold">Descripcion</p>
              </div>
              <p className="text-base text-black/75 dark:text-white/75">
                {item.Jui_Observaciones}
              </p>
            </div>
          </SemiSection>
        )}
      </div>
      {item.adjuntos.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">
          <p className="text-xl font-semibold">Archivos Adjuntos</p>
          {item.adjuntosMobile.map((file: any) => (
            <ButtonFile
              fileId={file.id}
              fileName={file.nombre}
              fileType={file.tipo}
              title={file.nombre}
              icon={<IconMailExclamation type='image/png' size={18} />}
              chevron
            />
          ))}
        </div>
      )}
    </div>
  );
}


const PageAbogado = ({ item }: { item: any }) => {
  return (
    <div className="flex flex-col gap-2">
      <SemiSection
        key={"Razon-Social"}
        type="simple"
        title="Razón Social"
        icon={<IconId size={24} />}
      >
        <Pill text={item.Jui_RazonSocial} classNameText="text-sm" className='py-0 px-2' />
      </SemiSection>
      <SemiSection
        key={"Nombre-y-apellido"}
        type="simple"
        title="Nombre y apellido"
        icon={<IconUserSquareRounded size={24} />}
      >
        <Pill text={item.Jui_Abogado} classNameText="text-sm" className='py-0 px-2' />
      </SemiSection>
      <SemiSection
        key={"Juzgado"}
        type="multiple"
        title="Juzgado"
        icon={<IconGavel size={24} />}
        content={[
          { title: "Dirección del estudio", children:  <Pill text={item.Jui_Direccion} classNameText="text-sm" className='py-0 px-2'/> },
          { title: "Teléfono del estudio", children:  <Pill text={item.Jui_Telefono} classNameText="text-sm" className='py-0 px-2' /> },
        ]}
      >
        <Pill text={item.Jui_Monto} classNameText="text-sm" />
      </SemiSection>
    </div>
  );
}

const PageAvances = ({ avances }: { avances: any }) => {
  return (
    <div className="flex flex-col">
      {/* {avances.length === 0 && <NoResultsFound title='No hay movimientos' />} */}
      {avances.map((item: any, index: number) => {
        const itemDate = parse(item.Jui_DateTime, "dd/MM/yyyy", new Date());
        const formattedDateTime = format(itemDate, "d'/'M", { locale: es });

        return (
          <div className="flex gap-6 items-center px-2" key={item.Jui_UserCreated + index}>
            <div className="flex flex-col items-center justify-center gap-1 h-full">
              <div className="flex flex-col flex-1 w-[1px] bg-outline dark:bg-outline-dark"></div>
              <p>{formattedDateTime}</p>
              <div className="flex flex-col flex-1 w-[1px] bg-outline dark:bg-outline-dark"></div>
            </div>
            <div className="flex flex-col gap-1 py-2">
              <div className="flex items-center gap-2">
                <UserIcon
                  name={item.Jui_UserCreated}
                  color={"blue"}
                  rounded="rounded-[6px]"
                  textSize="text-sm"
                  dimensions="w-6 h-6"
                />
                <p className="text-lg font-medium">
                  {item.Jui_UserCreated}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p className="text-base font-medium text-black/75 dark:text-white/75">
                    {item.Jui_Asunto}
                  </p>
                  <p className="text-base text-black/75 dark:text-white/75">
                    {item.Jui_ComentarioShort}
                  </p>
                </div>
                {item.Jui_ComentarioLong && (
                  <p className="text-base text-black/75 dark:text-white/75">
                    {item.Jui_ComentarioLong}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface TabsProps {
  tabs: {
    title: string;
    content: React.ReactNode;
  }[]
}

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 p-1 rounded-xl border border-outline dark:border-outline-dark">
        {tabs.map((tab, index) => (
          <button
            className={cn(
              "flex flex-1 items-center justify-center py-1 rounded-md",
              activeTab === index ? "bg-brown/10 dark:bg-brown-dark/10" : ""
            )}
            key={index}
            onClick={() => setActiveTab(index)}
          >
            <p
              className={cn(
                "text-lg font-semibold text-center",
                activeTab === index ? "text-brown dark:text-brown-dark" : "text-text-grey"
              )}
            >
              {tab.title}
            </p>
          </button>
        ))}
      </div>
      {tabs[activeTab].content}
    </div>
  );
}

interface JudgmentsProps {
  data: any;
  param: string;
}

const JudgmentDetails = ({ data, param }: JudgmentsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <InfoHeader item={data.juicio[0]} />
      <Tabs
        tabs={[
          { title: "Datos", content: <PageDatos item={data.juicio[0]} /> },
          { title: "Abogado", content: <PageAbogado item={data.juicio[0]} /> },
          {
            title: "Movimientos",
            content: <PageAvances avances={data.juicio[0].avances} />,
          },
        ]}
      />
    </div>
  );
}

export default JudgmentDetails