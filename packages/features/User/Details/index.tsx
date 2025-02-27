
import React, { FC } from 'react';
import { IconCalendarFilled, IconChevronRight, IconHelp, IconLogout, IconMailFilled } from '@tabler/icons-react';
import Button from 'app/components/Buttons/Button';
import UserIcon from 'app/components/Icons/IconUser';
import Pill from 'app/components/Pill';
import MediaQueryProvider from 'app/contexts/MediaQueryProvider';
import AsideUser from 'app/features/User/Details/_AsideUser';
import { logoutHandler } from 'app/services/auth';
import Link from 'next/link';

interface UserPanel {
  user: any
}

const UserPanel: FC<UserPanel> = ({ user }) => {
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center max-md:p-4">
        <UserIcon
          name={user.nombre}
          color="blue"
          dimensions="h-16 w-16"
          textSize="text-3xl"
        />
        <div className="flex flex-col gap-1 items-center">
          <h1 className="text-3xl font-bold">
            {user.nombre} {user.apellido}
          </h1>
          <p className="text-base font-medium text-text-grey">
            Tiene {user.total_unidades} unidad
            {user.total_unidades == 1 ? "" : "es"}
          </p>
        </div>
        <div className="flex items-center justify-center flex-row flex-wrap gap-2">
          <Pill
            text={user.email}
            variant="neutral"
            classNameText="text-base"
            icon={<IconMailFilled size={18} className="text-text-grey" />}
          />
          {user.fechaNac && (
            <Pill
              text={user.fechaNac}
              variant="neutral"
              classNameText="text-base"
              icon={<IconCalendarFilled size={18} className="text-text-grey" />}
            />
          )}
        </div>
      </div>
      <MediaQueryProvider maxWidth={768}>
        <div className="flex-col">
          <div className="px-4 pt-4 pb-6 border-y border-outline dark:border-outline-dark w-full">
            <AsideUser userData={user} />
          </div>
          <div className="p-4 flex flex-col gap-2">
            <Button
              title="Cerrar sesión"
              classNameContainer="w-full"
              buttonBackground="bg-red dark:bg-red-dark"
              classNameText="text-white"
              icon={<IconLogout size={22} className="text-white" />}
              onClick={logoutHandler}
              key={"logout"}
            />
            <Button
              title="Centro de ayuda"
              icon={<IconHelp size={22} className="text-text-grey" />}
              href="/ayuda"
              classNameText="text-text-grey"
            />
          </div>
        </div>
      </MediaQueryProvider>
    </>
  );
}

export default UserPanel