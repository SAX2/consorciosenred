"use client"

import { cn } from '@/lib/utils';
import { IconApps } from '@tabler/icons-react';
import React from 'react'

interface ShortcutGridProps {
  data: any[];
  addShortcuts?: boolean;
  classNameItem?: string;
  className?: string;
}

interface ShortcutItemProps {
  className?: string;
  color?: string;
  description?: string;
  title: string;
  icon: React.ReactElement;
}

const ShortcutItem: React.FC<ShortcutItemProps> = ({
  color,
  icon,
  title,
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full p-[10px] rounded-xl border border-outline dark:border-outline-dark flex items-center gap-[10px] cursor-pointer shadow-shortcut max-lg:gap-2 max-lg:p-2 max-md:p-[6px] max-md:gap-[6px]",
        className
      )}
    >
      <div className={cn('p-[3px] rounded-lg', color)}>{icon}</div>
      <div className='flex flex-col gap-[2px]'>
        <span className={cn("font-medium truncate leading-none !bg-transparent text-base", color)}>{title}</span>
        <span className="text-text-grey leading-none text-xs">{title}</span>
      </div>
    </div>
  );
};

const ShortcutsGrid = ({ data, addShortcuts = true, classNameItem, className }: ShortcutGridProps) => {
  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      {data.map((shortcut) => {
        if (shortcut.isActive) {
          return (
            <ShortcutItem
              className={classNameItem}
              color={shortcut.color}
              title={shortcut.title}
              icon={shortcut.icon}
              key={shortcut.title}
            />
          );
        }
      })}
      {addShortcuts && (
        <ShortcutItem
          title={"Añade mas opciones"}
          icon={<IconApps width={28} height={28} />}
          className={cn(
            "text-text-grey border-black/25 dark:border-white/25 border-dashed shadow-inherit justify-center !py-3",
            data.length > 1 && "col-span-2"
          )}
        />
      )}
    </div>
  );
};

export default ShortcutsGrid