"use client"

import ShortcutButton from 'app/components/Buttons/ButtonShortcut';
import { Popover, PopoverContent, PopoverTrigger } from 'app/components/ui/popover'
import { ShortcutProps } from 'app/types/globals';
import { useParams } from 'next/navigation';
import React from 'react'

interface ActionsDropdownProps {
  shortcut: React.ReactNode;
  actions?: ShortcutProps[]
  path?: string
}

const ActionsDropdown = ({ shortcut, actions, path }: ActionsDropdownProps) => {
  const params = useParams()

  const resolvedPath = params.id ? params.id : path as string

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>{shortcut}</div>
      </PopoverTrigger>
      <PopoverContent
        className="p-1 border-outline dark:border-outline-dark bg-white dark:bg-black-app-bg rounded-xl w-fit"
        align="end"
      >
        {actions && actions.map((action, index) => (
          <ShortcutButton
            {...action}
            path={`/prp/expensas/` + resolvedPath + action.path}
            key={`/prp/expensas/` + resolvedPath + action.path + index}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}

export default ActionsDropdown