import { cn } from 'app/lib/utils';
import React from 'react'

interface MainProps {
  children?: React.ReactNode;
  className?: string;
}

export const mainPadding = ``;

const Main: React.FC<MainProps> = ({ children, className }) => {
  return (
    <main className={cn("flex flex-col items-center justify-between scroll-smooth", className)}>
      {children}
    </main>
  )
}

export default Main