import Pill from '@/components/Pill'
import Button from '@/components/Buttons/Button'
import { useCallback } from 'react'
import { reserveIcon } from '@/lib/contents/(app)/contents'
import { IconEye, IconPlus } from '@tabler/icons-react'

interface ReserveGroupCardProps {
  item: any
  param?: string
} 

const ReserveGroupCard = ({ item, param }: ReserveGroupCardProps) => {
  return (
    <div
      className="border-outline gap-2 w-full flex-col rounded-[16px] border p-4 flex justify-center"
      key={`${item.recuGrupo}`}
    >
      <div className="w-full flex justify-center">
        <div
          className="flex-shrink-0 self-start rounded-[16px] p-3"
          style={{
            backgroundColor: reserveIcon(item.recuGrupo).background,
          }}
        >
          {reserveIcon(item.recuGrupo).icon}
        </div>
      </div>
      <div
        key={item.recuGrupo}
        className="flex gap-[6px] w-full flex-col justify-center"
      >
        <p className="text-base leading-3 font-bold text-black text-center truncate">
          {item.descripcion}
        </p>
        <div className="flex gap-2 flex-wrap justify-center w-full">
          <p className="text-text-grey text-base font-medium text-center">
            Turnos disponibles
          </p>
          <Pill
            text={item.cantidadHabilitados}
            classNameText="text-xs"
            className="px-2"
          />
        </div>
      </div>
      <Button
        buttonPadding="p-1"
        classNameContainer="flex-row items-center justify-center rounded-[8px] px-4 py-2"
        buttonBackground="bg-grey"
        classNameText="text-text-grey"
        textSize="text-sm"
        title="Ver recursos"
        icon={<IconEye className="text-text-grey" size={18} strokeWidth={2} />}
      />
      <Button
        href={`/${param}/reservas/reservar/${item.recuGrupo}`}
        classNameContainer="flex-row items-center justify-center rounded-[8px] px-4 py-2"
        buttonBackground="bg-green/25"
        classNameText="text-green"
        title="Reservar"
        icon={<IconPlus className="text-green" size={22} strokeWidth={2} />}
      />
    </div>
  );
}

export default ReserveGroupCard