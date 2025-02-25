import { cn } from 'app/lib/utils';
import { ShortcutProps } from 'app/types/globals';
import { handlePress as handlePressAction } from './actions';
import Link from 'next/link';
import React, { memo } from 'react'

const IconBgDescription = memo(
  ({ title, description, icon, style, handlePress, path }: ShortcutProps) => {
    const content = (
      <div className="flex w-full items-center justify-start">
        <div
          className={cn("mr-3 rounded-[8px] p-[3px]", style?.background)}
          style={{ backgroundColor: style?.background }}
        >
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-base font-medium text-start">{title}</span>
          {description && (
            <span className="text-text-grey text-sm font-medium text-start">
              {description}
            </span>
          )}
        </div>
      </div>
    );

    if (handlePress)
      return (
        <button
          onClick={handlePress ?? handlePressAction}
          className="hover:bg-grey hover:dark:bg-grey-dark flex w-full items-center justify-start rounded-[12px] p-3 cursor-pointer"
        >
          {content}
        </button>
      );

    return (
      <Link
        href={path}
        className="hover:bg-grey hover:dark:bg-grey-dark flex w-full items-center justify-start rounded-[12px] p-3 cursor-pointer"
      >
        {content}
      </Link>
    );
  }
);

export default IconBgDescription