
import React from 'react'
import { format, isSameYear, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import { IconChevronRight, IconJpg } from '@tabler/icons-react';
import Pill from '@/components/Pill';
import Image from 'next/image';
import ButtonFile from 'app/components/Buttons/ButtonFile';
import IconUnit from '@/components/Icons/IconUnit';

const RegulationItem = ({ item }: { item: any }) => {
  const itemDate = parse(item.fecha, "dd/MM/yyyy", new Date());
  const formattedDateTime = isSameYear(itemDate, new Date())
    ? format(itemDate, "dd/MM", { locale: es })
    : format(itemDate, "yyyy", { locale: es });

  return (
    <div className="flex flex-col gap-2 mt-2">
      <p className="text-xl font-semibold">Archivos Adjuntos</p>

      {item.adjuntosMobile.map((file: any) => (
        <ButtonFile
          chevron
          fileId={file.id}
          fileName={file.nombre}
          fileType={file.tipo}
          title={file.nombre}
          icon={
            <div className="rounded-sm bg-green h-fit p-[2px]">
              <IconJpg size={18} className="text-white" />
            </div>
          }
        />
      ))}
    </div>
  );
}

const UnitDetails = ({ unit }: { unit: any }) => {
  return (
    <div className="flex items-center justify-between bg-grey rounded-lg p-2 w-full">
      <div className="flex gap-2">
        <IconUnit id={unit.edf_id} name={""} size={44} iconSize={34}/>
        <div className="flex max-w-max flex-col items-start gap-[2px]">
          <p
            className="text-base font-semibold truncate"
          >
            {unit.domiDpto}
          </p>
          <div className="flex items-start" style={{ gap: 4 }}>
            <Pill text={`${unit.nroUnidad} ${unit.CodDepto}`} />
            <Pill
              text={unit.nombrePropietario}
              classNameText="text-blue font-bold"
            />
          </div>
        </div>
      </div>
      <IconChevronRight size={20} className="text-text-grey" />
    </div>
  );
}

interface RegulationScreenProps {
  data: any[];
  unitData: any[];
  param?: string;
}

const RegulationScreen = ({ data, unitData, param }: RegulationScreenProps) => {
  return (
    <div className="flex flex-col gap-4">
      <UnitDetails unit={unitData[0]} />
      <div className="flex flex-col gap-[10px]">
        {data.map((item, index) => {
          return <RegulationItem item={item} key={`new_${item.id}`} />;
        })}
      </div>
    </div>
  );
}

export default RegulationScreen