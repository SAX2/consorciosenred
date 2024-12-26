"use client"

import ShortcutButton from '@/components/Cards/ShortcutCard';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { actions } from '@/lib/contents/(app)/contents';
import { useParams } from 'next/navigation';
import React from 'react'

interface ActionsDropdownProps {
  shortcut: React.ReactNode;
}

const ActionsDropdown = ({ shortcut }: ActionsDropdownProps) => {
  const params = useParams()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>{shortcut}</div>
      </PopoverTrigger>
      <PopoverContent
        className="p-1 border-outline rounded-xl w-fit"
        align="end"
      >
        {actions.map((action) => (
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