"use client"

import { cn } from '@/lib/utils';
import { IconApps } from '@tabler/icons-react';
import React from 'react'

interface ShortcutGridProps {
  data: any[];
  addShortcuts?: boolean;
}

interface ShortcutItemProps {
  className?: string;
  color?: string;
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
        "w-full py-6 rounded-md border flex items-center justify-center gap-1",
        color,
        className
      )}
    >
      {icon}
      <span className='font-medium'>{title}</span>
    </div>
  );
};

const ShortcutsGrid = ({ data, addShortcuts = true }: ShortcutGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {data.map((shortcut) => {
        if (shortcut.isActive) {
          return (
            <ShortcutItem
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
          title={"Añade un atajo"}
          icon={<IconApps width={20} height={20} />}
          className="text-text-grey border-black/25 dark:border-white/25 border-dashed"
        />
      )}
    </div>
  );
};

export default ShortcutsGrid