import { IconFileReport } from '@tabler/icons-react';
import TimeLine, { TimeLineTitle } from 'app/components/Sections/Timeline'
import { getUser } from 'app/services/queries';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import React from 'react'

const AsideUser = async ({ userData }: { userData?: any }) => {
  const user = userData ?? await getUser()

  const getItemsParse = (): React.ReactElement[] => {
    return user.ultimosAccesos.map((item: string, key: number) => {
      let fecha = item.split(' ')[0];
      let hora = item.split(' ')[1]

      return (
        <div className="flex flex-row gap-2">
          <TimeLineTitle className="font-semibold">
            {format(parse(fecha, "dd/MM/yyyy", new Date()), "dd 'de' MMMM 'del' yyyy", { locale: es })}
          </TimeLineTitle>
          <span className="text-text-grey leading-none">~</span>
          <p className="text-text-grey leading-none">{hora}</p>
        </div>
      );
    })
  }

  return (
    <div className='flex flex-col gap-6 w-full'>
      <div className='flex gap-[6px] items-center'>
        <IconFileReport size={22} className='text-text-grey'/>
        <h3 className='font-semibold text-text-grey'>Ultimos accesos</h3>
      </div>
      <TimeLine items={getItemsParse()} itemPadding="pb-4" gap='gap-2' />
    </div>
  );
}

export default AsideUser;