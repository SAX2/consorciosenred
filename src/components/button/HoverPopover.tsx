import { cn } from '@/lib/utils';
import React from 'react'

interface HoverPopoverProps {
  children: React.ReactNode;
  className?: string;
}

const HoverPopover = ({ children, className }: HoverPopoverProps) => {
  return (
    <span
      className={cn(
        "transition-all duration-300 flex items-center overflow-hidden w-0 ml-0 opacity-0 group-hover:w-6 group-hover:ml-2 group-hover:opacity-100",
        className
      )}
    >
      {children}
    </span>
  );
}

export default HoverPopover