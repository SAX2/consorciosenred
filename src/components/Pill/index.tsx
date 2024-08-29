import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'
import IconFile from './IconFile';

export interface PillProps {
  className?: string;
  classNameText?: string;
  text: string;
  icon?: React.ReactNode;
  iconOrientation?: "left" | "right"
  isFile?: boolean;
  fileId?: string;
}

const Pill: React.FC<PillProps> = ({ text, className, icon, classNameText, isFile = false, fileId, iconOrientation = "left" }) => {
  if (isFile) {
    return <Link
      href={`/file/type/${fileId}/${fileId}`}
      className={cn(
        "flex items-center gap-1 px-1 py-[2px] border bg-white border-outline dark:bg-grey-sec-dark dark:border-outline-dark w-fit text-xs font-medium rounded-md",
        className
      )}
    >
      <IconFile type={typeof fileId === 'string' ? fileId.split('.').pop() ?? "" : ""}/>
      <span className={cn('text-black dark:text-white font-medium', classNameText)}>{text}</span>
    </Link>;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1 px-1 py-[2px] border bg-white border-outline dark:bg-grey-sec-dark dark:border-outline-dark w-fit text-xs font-medium rounded-md",
        className
      )}
    >
      {iconOrientation === "left" && icon}
      <span className={cn('text-black dark:text-white font-medium', classNameText)}>{text}</span>
      {iconOrientation === "right" && icon}
      </div>
  );
};

export default Pill;