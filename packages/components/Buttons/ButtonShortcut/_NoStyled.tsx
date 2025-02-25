import { handlePress as handlePressAction } from './actions';
import { ShortcutProps } from '@/types/globals';
import Link from 'next/link';
import React, { memo } from 'react'

const NoStyled = memo(({ title, icon, handlePress, index, isBottomSheet, path }: ShortcutProps) => {
  const content = (
    <div className="flex flex-col items-center justify-center w-full">
      {icon}
      <span className="text-base font-medium text-center">{title}</span>
    </div>
  );

  const className = `bg-grey dark:bg-grey-dark flex rounded-[12px] p-3 w-full h-full ${index && index > 0 ? 'ml-2' : ''}`;

  if (isBottomSheet) {
    return (
      <button onClick={handlePress ?? handlePressAction} className={className} style={{ cursor: 'pointer' }}>
        {content}
      </button>
    );
  }

  return (
    <Link href={path} className={className}>
      {content}
    </Link>
  );
});

export default NoStyled;