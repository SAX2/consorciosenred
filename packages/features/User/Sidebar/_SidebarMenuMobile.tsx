import { cn } from 'app/lib/utils';
import React, { FC } from 'react'
import Button from 'app/components/Buttons/Button';
import { IconChevronLeft, IconLogout, IconMoonFilled, IconSunFilled } from '@tabler/icons-react';
import { logoutHandler } from 'app/services/auth';
import { sidebarMobile } from './content';
import { useTheme } from 'next-themes';
import { getUser } from 'app/services/queries';

interface MobileMenuProps {
  pathname: string;
  isOpen: boolean;
  setClose: () => void;
}

const MobileMenuUser: FC<MobileMenuProps> = ({ isOpen, setClose, pathname }) => {
  const { theme, setTheme, themes} = useTheme()

  const IconTheme = theme === "dark" ? IconSunFilled : IconMoonFilled;

  return (
    <div
      className={cn(
        "flex items-center gap-3 bg-white dark:bg-black-app-bg overflow-y-auto h-[calc(100dvh-60px)]",
        "max-md:absolute max-md:top-full max-md:left-0 max-md:w-full max-md:p-8 max-md:transition-all max-md:duration-300 max-md:ease-in-out max-md:flex-col max-md:items-start z-50 max-md:gap-4",
        isOpen
          ? "max-md:opacity-100 max-md:translate-y-0"
          : "max-md:opacity-0 max-md:translate-y-[-20px] max-md:pointer-events-none"
      )}
    >
      {sidebarMobile.map((item) => {
        return (
          <Button
            {...item}
            classNameContainer="w-full"
            buttonPadding="px-4 py-3"
            classNameText="font-medium truncate"
            textSize="text-2xl"
            key={item.title}
            onClick={setClose}
          />
        );
      })}
      <Button
        title={`Cambiar a modo ${theme === "dark" ? "claro" : "obscuro"}`}
        classNameContainer="w-full"
        buttonPadding="px-4 py-3"
        classNameText="font-medium truncate"
        textSize="text-2xl"
        icon={<IconTheme size={28} />}
        onClick={() => setTheme(() => themes.filter((t) => t != theme)[0])}
        key={"theme"}
      />
      <Button
        title="Volver a expensas"
        classNameContainer="w-full"
        buttonPadding="px-4 py-3"
        classNameText="font-medium truncate"
        textSize="text-2xl"
        icon={<IconChevronLeft size={28} />}
        href='/prp/expensas'
        onClick={setClose}
        key={"expensas"}
      />
      <Button
        title="Cerrar sesión"
        classNameContainer="w-full"
        buttonPadding="px-4 py-3"
        buttonBackground="bg-red dark:bg-red-dark"
        classNameText="text-white font-medium"
        textSize="text-2xl"
        icon={<IconLogout size={28} className="text-white" />}
        onClick={logoutHandler}
        key={"logout"}
      />
    </div>
  );
}

export default MobileMenuUser