"use client"

import Button, { ButtonProps } from 'app/components/Buttons/Button';
import { IconPlaylistX, IconProps, IconRotateClockwise2 } from '@tabler/icons-react'
import { useRouter } from 'next/navigation';
import React, { FC } from 'react'

interface EmptySection {
  title?: string;
  description?: string;
  Icon?: React.ElementType<IconProps>;
  reload?: boolean;
  button?: ButtonProps;
  children?: React.ReactNode;
}

let DEFAULT_TITLE = "No hay resultados disponibles";
let DEFAULT_DESC = "Parece que no hay elementos para mostrar en este momento. Prueba con otros criterios de búsqueda o agrega nuevos registros.";
let DEFAULT_BTN_PROPS: ButtonProps = { classNameContainer: "max-w-[300px] w-full" }

const EmptySection: FC<EmptySection> = ({
  Icon = IconPlaylistX,
  description = DEFAULT_DESC,
  title = DEFAULT_TITLE,
  reload = false,
  button,
  children
}) => {

  const router = useRouter()

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col gap-[10px] max-w-[425px] w-full items-center">
        <Icon size={44} />
        <h3 className="font-semibold text-xl text-center">{title}</h3>
        <p className="text-text-grey text-center">{description}</p>
        {reload && !button && (
          <Button
            classNameContainer={DEFAULT_BTN_PROPS.classNameContainer}
            onClick={() => router.refresh()}
            title="Volver a intentar"
            icon={<IconRotateClockwise2 size={24} className="text-text-grey"/>}
            classNameText="text-text-grey"
          />
        )}
        {reload && button && <Button {...button}/>}
        {children}
      </div>
    </div>
  );
};

export default EmptySection