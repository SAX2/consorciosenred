"use client"

import React, { useState, useEffect, useRef } from 'react';
import UnitCard from '../cards/UnitCard';
import NewUnitKeyDialog from '../dialogs/NewUnitKeyDialog';
import { cn } from '@/lib/utils';

const UnitGrid = ({ data }: { data: any }) => {
  const [isSmall, setIsSmall] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  // Funcion para detectar el ancho del contenedor 
  useEffect(() => {
    const checkWidth = () => {
      if (divRef.current) {
        setIsSmall(divRef.current.offsetWidth < 710);
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
      className={cn(
        "grid gap-5 w-full max-md:grid-cols-1",
        isSmall ? "grid-cols-1" : "grid-cols-2"
      )}
      ref={divRef}
    >
      {data.map((unit: any) => {
        return <UnitCard unit={unit} key={unit.uf_id} />;
      })}
      <div
        className={cn(
          "border border-outline dark:border-outline-dark border-dashed rounded-lg flex items-center justify-center max-lg:border-0 py-28 max-lg:py-0"
        )}
      >
        <NewUnitKeyDialog />
      </div>
    </div>
  );
}

export default UnitGrid