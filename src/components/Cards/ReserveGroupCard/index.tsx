import Pill from '@/components/Pill'
import Button from '@/components/Buttons/Button'
import { useCallback } from 'react'
import { reserveIcon } from '@/lib/contents/(app)/contents'
import { IconPlus } from '@tabler/icons-react'

interface ReserveGroupCardProps {
  item: any
  param?: string
} 

const ReserveGroupCard = ({ item, param }: ReserveGroupCardProps) => {
  const renderResourcePills = useCallback((recursos: any[]) => {
    const maxVisiblePills = 2;
    const visibleResources = recursos.slice(0, maxVisiblePills);
    let remainingCount = recursos.length - maxVisiblePills;

    return (
      <>
        {visibleResources.map((resource: any, index: number) => {
          if (index === 1 && resource.descripcion.length > 10) {
            remainingCount += 1;
            return null;
          }

          return (
            <Pill
              className="px-2"
              classNameText="text-sm"
              key={resource.id}
              text={
                resource.descripcion.length > 24
                  ? `${resource.descripcion.slice(0, 24)}...`
                  : resource.descripcion
              }
            />
          );
        })}
        {remainingCount > 0 && (
          <Pill
            key={`${remainingCount}-${item.id}`}
            text={`+${remainingCount}`}
            className="px-2"
            classNameText="text-sm"
          />
        )}
      </>
    );
  }, [item]);

  return (
    <div
      className="border-outline gap-2 w-full flex-col rounded-[16px] border p-4 flex"
      key={`${item.recuGrupo}`}
    >
      <div key={item.recuGrupo} className="flex gap-2 w-full flex-1">
        <div
          className="flex-shrink-0 self-start rounded-[16px] p-3"
          style={{
            backgroundColor: reserveIcon(item.recuGrupo).background,
          }}
        >
          {reserveIcon(item.recuGrupo).icon}
        </div>
        <div className="flex flex-grow flex-col gap-1">
          <p className="text-base leading-3 font-bold text-black">{item.descripcion}</p>
          <div className="flex gap-2 flex-wrap">
            <p className="text-text-grey text-base font-medium">
              Turnos disponibles
            </p>
            <Pill text={item.cantidadHabilitados} classNameText="text-xs"  className='px-2'/>
          </div>
          <div className="flex-wrap flex gap-2">{renderResourcePills(item.recursos)}</div>
        </div>
      </div>
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