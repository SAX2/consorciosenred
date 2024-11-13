"use client"

import React, { memo } from 'react';
import Link from 'next/link';
import { handlePress as handlePressAction } from './actions';
import { ShortcutProps } from '@/types/globals'

const IconBgDescription = memo(({ title, description, icon, style, handlePress }: ShortcutProps) => (
  <button
    onClick={handlePress ?? handlePressAction}
    className="hover:bg-grey flex w-full items-center justify-start rounded-[12px] p-3"
    style={{ cursor: 'pointer' }}
  >
    <div className="flex w-full items-center justify-start">
      <div className="mr-3 rounded-[8px] p-[3px]" style={{ backgroundColor: style?.background }}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-base font-medium">{title}</span>
        {description && (
          <span className="text-text-grey text-sm font-medium">{description}</span>
        )}
      </div>
    </div>
  </button>
));

const IconBg = memo(({ title, icon, style, handlePress, index, isBottomSheet, path }: ShortcutProps) => {
  const content = (
    <div className="flex items-center justify-center gap-2 max-md:gap-1 w-full">
      <div className="rounded-[8px] p-[3px]" style={{ backgroundColor: style?.background }}>
        {icon}
      </div>
      <span className="text-base font-medium text-start" style={{ color: style?.color }}>
        {title}
      </span>
    </div>
  );

  if (isBottomSheet) {
    return (
      <button
        onClick={handlePress ?? handlePressAction}
        className={`border-outline dark:border-outline-dark dark:bg-black-app-bg flex items-center justify-center rounded-[12px] border bg-white p-3 max-md:p-2 ${
          index && index > 0 ? "ml-2" : ""
        }`}
        style={{ cursor: "pointer" }}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={path}
      className={`border-outline dark:border-outline-dark dark:bg-black-app-bg flex rounded-[12px] border bg-white p-3 max-md:p-2 ${
        index && index > 0 ? "ml-2" : ""
      }`}
    >
      {content}
    </Link>
  );
});

const NoStyled = memo(({ title, icon, handlePress, index, isBottomSheet, path }: ShortcutProps) => {
  const content = (
    <div className="flex flex-col items-center justify-center w-full">
      {icon}
      <span className="text-base font-medium">{title}</span>
    </div>
  );

  const className = `bg-grey dark:bg-grey-dark flex rounded-[12px] p-3 w-full ${index && index > 0 ? 'ml-2' : ''}`;

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

const ShortcutButton = memo(({ display = 'no-styled', ...props }: ShortcutProps) => {
  switch (display) {
    case 'icon-bg-description':
      return <IconBgDescription {...props} />;
    case 'icon-bg':
      return <IconBg {...props} />;
    default:
      return <NoStyled {...props} />;
  }
});

export default ShortcutButton;
