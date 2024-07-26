import { cn } from '@/lib/utils';
import React from 'react'

export interface PillProps {
  className?: string;
  text: string;
  icon?: React.ReactElement;
}

const Pill: React.FC<PillProps> = ({ text, className, icon }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1 px-1 py-[2px] border bg-white border-outline dark:bg-grey-sec-dark dark:border-outline-dark w-fit text-xs font-medium rounded-md",
        className
      )}
    >
      {icon}
      <span className='text-black dark:text-white font-medium'>{text}</span>
    </div>
  );
};

export default Pill;