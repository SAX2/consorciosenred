"use client"

import ShortcutButton from '@/components/Cards/ShortcutCard';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ShortcutProps } from '@/types/globals';
import { useParams } from 'next/navigation';
import React from 'react'

interface ActionsDropdownProps {
  shortcut: React.ReactNode;
  actions?: ShortcutProps[]
}

const ActionsDropdown = ({ shortcut, actions }: ActionsDropdownProps) => {
  const params = useParams()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>{shortcut}</div>
      </PopoverTrigger>
      <PopoverContent
        className="p-1 border-outline dark:border-outline-dark bg-white dark:bg-black-app-bg rounded-xl w-fit"
        align="end"
      >
        {actions && actions.map((action) => (
          <ShortcutButton
            {...action}
            path={`/prp/expensas/` + params.id + action.path}
            key={`/prp/expensas/` + params.id + action.path}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}

export default ActionsDropdown