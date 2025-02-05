import { cn } from '@/lib/utils';
import React from 'react'

interface BottomSectionProps {
  children?: React.ReactNode;
  sticky?: boolean
}

const BottomSection = ({ children, sticky = true }: BottomSectionProps) => {
  return (
    <div className={cn(sticky ? "sticky bottom-0" : "absolute bottom-0 w-full")}>
      <div className="bg-white dark:bg-black-app-bg p-4 px-2 border-t border-outline dark:border-outline-dark">
        {children}
      </div>
    </div>
  );
}

export default BottomSection