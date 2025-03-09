"use client"

import { IconMoon } from '@tabler/icons-react';
import Shortcuts, { getShortcutCols } from 'app/components/Buttons/ButtonShortcut/List';
import { cn } from 'app/lib/utils';
import { ShortcutProps } from 'app/types/globals';
import React, { FC } from 'react'

interface UserOptionsProps {
  data: any; //User
}

const options: ShortcutProps[] = [
  {
    title: "Reservar",
    description: "Reservar",
    icon: <IconMoon width={32} height={32}  />,
    path: "#",
    isBottomSheet: true,
    handlePress: () => null, 
  },
  {
    title: "Reservar",
    description: "Reservar",
    icon: <IconMoon width={32} height={32}  />,
    path: "#",
    isBottomSheet: true,
    handlePress: () => null, 
  },
  {
    title: "Reservar",
    description: "Reservar",
    icon: <IconMoon width={32} height={32}  />,
    path: "#",
    isBottomSheet: true,
    handlePress: () => null, 
  },
]

const UserOptions: FC<UserOptionsProps> = ({ data }) => {
  return (
    <div>
      {/* <Shortcuts
        data={options}
        display="no-styled"
        className={cn("grid gap-2", getShortcutCols(options.length))}
        mainPath="/"
      /> */}
    </div>
  );
}

export default UserOptions