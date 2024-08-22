"use client"

import React, { useState, useEffect, useRef, FC } from 'react';
import { cn } from '@/lib/utils';

interface GridProps {
  children: React.ReactNode;
  className?: string;
  offsetWidth?: number;
  enableMedia?: boolean;
}

const Grid: FC<GridProps> = ({
  children,
  offsetWidth = 710,
  className,
  enableMedia = true,
}) => {
  const [isSmall, setIsSmall] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkWidth = () => {
      if (divRef.current) {
        setIsSmall(divRef.current.offsetWidth < offsetWidth);
      }
    };

    checkWidth();

    const resizeObserver = new ResizeObserver(checkWidth);
    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        resizeObserver.unobserve(divRef.current);
      }
    };
  }, [divRef.current?.offsetWidth]);

  return (
    <div
      ref={divRef}
      className={cn(
        "grid gap-5 w-full max-md:grid-cols-1",
        enableMedia && isSmall ? "grid-cols-1" : "grid-cols-2",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Grid