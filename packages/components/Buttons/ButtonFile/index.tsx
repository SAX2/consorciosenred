"use client"

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { IconChevronRight } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ButtonFileProps {
  fileId: string
  fileName: string
  fileType: string
  chevron?: boolean
  position?: 'justify-between' | 'justify-center' | 'justify-start'
  margin?: 'top' | 'right' | 'bottom' | 'left'
  classname?: string;
  icon?: React.ReactElement
  title: string
  replace?: boolean;
}

const ButtonFile = ({ fileId, fileName, fileType, title, chevron = true, icon, position = 'justify-start', classname, margin, replace = false }: ButtonFileProps) => {
  const router = useRouter()
  
  const positionWithIcon = (position === 'justify-start' && chevron) ? 'justify-between' : position

  const containerClassName = cn(
    classname,
    positionWithIcon,
    "border-outline dark:border-outline-dark flex w-full flex-row justify-between items-center rounded-[6px] border p-2"
  )
  
  const content = (
    <div className="flex justify-between flex-1 w-full gap-2">
      <div className="flex items-center gap-[6px] flex-1">
        {icon && icon}
        <p
          className="text-base font-medium flex-1 truncate"
        >
          {title}
        </p>
      </div>
      {chevron && (
        <IconChevronRight width={20} height={20} className="text-text-grey" />
      )}
    </div>
  );

  return (
    <Link
      target="_blank"
      href={`/file/${fileType}/${fileId}/${fileName}`}
      // onPress={handlePress}
      className={containerClassName}
      replace={replace}
    >
      {content}
    </Link>
  );
}

export default ButtonFile