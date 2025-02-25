import Pill from '@/components/Pill'
import Button, { ButtonProps } from 'app/components/Buttons/Button'
import { reserveIcon } from '@/lib/contents/(app)/contents'
import { IconPlus, IconProps } from '@tabler/icons-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ShortcutProps } from '@/types/globals'
import ShortcutButton from '../../../components/Buttons/ButtonShortcut'
import { cn } from '@/lib/utils'

export const ReserveButtonOptions = ({
  options,
  param,
  Icon,
  buttonProps,
  classNameTrigger
}: {
  options: ShortcutProps[];
  param: string;
  Icon?: React.ElementType<IconProps>;
  buttonProps: ButtonProps;
  classNameTrigger?: string;
}) => {
  return (
    <Popover>
      <PopoverTrigger className={cn(classNameTrigger)}>
        <Button
          isDiv
          {...buttonProps}
          classNameContainer={cn(buttonProps.classNameContainer, "cursor-pointer")}
          icon={Icon && <Icon className={buttonProps.classNameText} size={24} strokeWidth={2} />}
        />
      </PopoverTrigger>
      <PopoverContent className="p-1 border-outline dark:border-outline-dark bg-white dark:bg-black-app-bg rounded-xl w-full max-w-[350px]">
        {options.map((action) => (
          <ShortcutButton
            {...action}
            path={`/${param}/reservas/reservar` + action.path}
            key={`/${param}/reservas/reservar` + action.path}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
};

interface ReserveGroupCardProps {
  item: any
  param?: string;
} 

const ReserveResourceCard = ({ item, param }: ReserveGroupCardProps) => {
  const options = item.recursos.map((recurso: any) => {
    return {
      id: recurso.codigo,
      title: recurso.descripcion,
      description: `Reserva con ${recurso.diasReservaAnticipada} días de anticipación`,
      path: `/${recurso.recuGrupo }/?code=${recurso.codigo}`,
      icon: reserveIcon(recurso.recuGrupo, 36).icon,
      display: "icon-bg-description",
      style: {
        background: reserveIcon(recurso.recuGrupo).background,
        color: reserveIcon(recurso.recuGrupo).color,
      },
      isBottomSheet: true,
    } as ShortcutProps;
  })

  return (
    <div
      className="border-outline dark:border-outline-dark gap-4 w-full flex-col rounded-xl border p-4 flex justify-center"
      key={`${item.recuGrupo}`}
    >
      <div className="flex gap-3 w-full items-center flex-row">
        <div
          className="flex-shrink-0 self-start rounded-xl p-2"
          style={{
            backgroundColor: reserveIcon(item.recuGrupo).background,
          }}
        >
          {reserveIcon(item.recuGrupo, 48).icon}
        </div>
        <div key={item.recuGrupo} className="flex gap-[6px] w-full flex-col">
          <p className="text-base leading-3 font-bold truncate">
            {item.descripcion}
          </p>
          <div className="flex gap-[6px] flex-wrap w-full">
            <p className="text-text-grey text-base font-medium">
              Turnos disponibles
            </p>
            <Pill
              text={item.cantidadHabilitados}
              classNameText="text-sm"
              className="px-2 py-0"
            />
          </div>
        </div>
      </div>
      <ReserveButtonOptions
        options={options}
        param={param ?? ""}
        buttonProps={{
          classNameText: "text-green dark:text-green-dark",
          buttonBackground: "bg-green/15 dark:bg-green-dark/15",
          title: "Reservar",
        }}
        Icon={IconPlus}
      />
    </div>
  );
}

export default ReserveResourceCard