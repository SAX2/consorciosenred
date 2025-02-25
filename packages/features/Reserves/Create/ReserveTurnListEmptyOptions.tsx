import React, { useEffect, useState } from 'react'
import { IconSelector } from '@tabler/icons-react'
import getParams from '@/env/getParams'
import { getUnitReservationsByGroup } from '@/lib/queries/queries'
import { reserveIcon } from '@/lib/contents/(app)/contents'
import { ShortcutProps } from '@/types/globals'
import { ReserveButtonOptions } from 'app/features/Reserves/Create/ReserveResourceCard'

const MoreOptionsEmpty = ({ params, group }: { params: string, group: string }) => {
  const id = getParams({ params: params, type: "id" });
  const code = getParams({ params: params, type: "code" });

  const [data, setData] = useState<any>([]);
  const [options, setOptions] = useState<ShortcutProps[]>([])

  useEffect(() => {
    const fetch = async () => {
      const data = await getUnitReservationsByGroup({
        id: id,
        code: code,
        group: group,
      });

      if (data) {
        setData(data)
      }
    }

    fetch();
  }, [params, group])

  useEffect(() => {
    if (data?.reservas && data.reservas.length > 0) {
      const op = data.reservas.map((recurso: any) => ({
        id: recurso.codRecurso,
        title: recurso.descripcion,
        description: 'Reserva disponible',
        path: `/${group}/?code=${recurso.codRecurso}`,
        icon: reserveIcon(group, 36).icon,
        display: 'icon-bg-description',
        style: {
          background: reserveIcon(group).background,
          color: reserveIcon(group).color,
        },
        isBottomSheet: true,
      }));
      setOptions(op);
    }
  }, [data]);

  return (
    <ReserveButtonOptions
      buttonProps={{
        classNameText: "text-text-grey",
        title: "Ver mas opciones",
        iconOrientation: "right",
      }}
      Icon={IconSelector}
      options={options}
      classNameTrigger="max-w-[300px] w-full"
      param={`prp/expensas/${params}`}
    />
  );
}

export default MoreOptionsEmpty