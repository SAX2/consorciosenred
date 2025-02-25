"use client";

import React, { useState, useEffect, useRef, FC } from "react";
import { cn } from "app/lib/utils";

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
    const currentRef = divRef.current;
    const checkWidth = () => {
      if (currentRef) {
        setIsSmall(currentRef.offsetWidth < offsetWidth);
      }
    };

    checkWidth();

    const resizeObserver = new ResizeObserver(checkWidth);
    if (currentRef) {
      resizeObserver.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef);
      }
    };
  }, [offsetWidth]);

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

export default Grid;
