import { IconPlaylistX, IconProps } from '@tabler/icons-react'
import React, { FC } from 'react'

interface EmptySection {
  title?: string;
  description?: string;
  Icon?: React.ElementType<IconProps>;
}

let DEFAULT_TITLE = "No hay resultados disponibles";
let DEFAULT_DESC = "Parece que no hay elementos para mostrar en este momento. Prueba con otros criterios de búsqueda o agrega nuevos registros.";

const EmptySection: FC<EmptySection> = ({
  Icon = IconPlaylistX,
  description = DEFAULT_DESC,
  title = DEFAULT_TITLE,
}) => {
  return (
    <div className='w-full flex justify-center'>
      <div className="flex flex-col gap-[10px] max-w-[350px] w-full items-center">
        <Icon size={44} className="text-black" />
        <h3 className="font-semibold text-xl text-center">{title}</h3>
        <p className="text-text-grey text-center">{description}</p>
      </div>
    </div>
  );
};

export default EmptySection