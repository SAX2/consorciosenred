import React from 'react'
import { format, isSameYear, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import { IconUsersGroup } from '@tabler/icons-react';
import { PopoverFiles } from '@/components/Dropdowns/PopoverFiles';

const AssemblyCard = ({ item }: { item: any }) => {
  const itemDate = parse(item.fecha, "dd/MM/yyyy", new Date());
  const formattedDateTime = isSameYear(itemDate, new Date())
    ? format(itemDate, "dd/MM", { locale: es })
    : format(itemDate, "yyyy", { locale: es });

    return (
      <div className="flex gap-6 items-center px-2">
        <div className="flex flex-col items-center justify-center gap-1 w-[45px] h-full">
          <p className="text-text-grey text-sm">{formattedDateTime}</p>
          <div className="flex flex-1 w-[2px] bg-outline"></div>
        </div>
        <div className="flex flex-col gap-1 pb-4 flex-1">
          <div className="flex flex-col p-2 rounded-lg bg-grey w-full gap-1">
            <div className="flex gap-2 w-full">
              <IconUsersGroup size={20} className='mt-[6px]'/>
              <p
                className="text-lg font-medium flex-1 "
              >
                {item.asunto}
              </p>
            </div>
            <p className="text-black/75 text-base">{item.detalle}</p>
            {item.adjuntosMobile.length > 0 && (
              <div className="flex">
                <PopoverFiles files={item.adjuntosMobile} totalLength={item.adjuntosMobile.length} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

interface AssemblyScreenProps {
  data: any[];
  param?: string;
}

const AssemblyScreen = ({ data, param }: AssemblyScreenProps) => {
  return (
    <div className='flex flex-col gap-1'>
      {data.map((item, index ) => {
        return <AssemblyCard
        item={item}
        key={`new_${item.id}_${index}`}
      />
      })}
    </div>
  );
}

export default AssemblyScreen