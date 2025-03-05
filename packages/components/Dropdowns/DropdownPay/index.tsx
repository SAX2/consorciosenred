import ShortcutButton from 'app/components/Buttons/ButtonShortcut';
import { Popover, PopoverContent, PopoverTrigger } from 'app/components/ui/popover'
import { ShortcutProps } from 'app/types/globals';
import React, { FC } from 'react'

interface DropdownPayProps {
  shortcut: React.ReactNode;
  methods: ShortcutProps[]
  params: string;
}

const DropdownPay: FC<DropdownPayProps> = ({ methods, params, shortcut }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>{shortcut}</div>
      </PopoverTrigger>
      <PopoverContent
        className="p-1 border-outline dark:border-outline-dark bg-white dark:bg-black-app-bg rounded-xl w-fit"
        align="start"
      >
        {methods &&
          methods.map((action, index) => (
            <ShortcutButton
              {...action}
              path={`/prp/expensas/` + params + action.path}
              key={`/prp/expensas/` + params + action.path + index}
            />
          ))}
      </PopoverContent>
    </Popover>
  );
}

export default DropdownPay