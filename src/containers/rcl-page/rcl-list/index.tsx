"use client"

import RclCard from '@/components/Cards/RclCard';
import Input from '@/components/Form/Input';
import { cn } from '@/lib/utils';
import { IconHexagonPlus, IconSearch, IconSquareRoundedPlus } from '@tabler/icons-react';
import Link from 'next/link';
import React, { FC, PropsWithChildren, useState } from 'react'

interface RclListProps extends PropsWithChildren {
  max?: number;
  className?: string;
  buttonMore?: string;
  buttonLess?: string;
  items: any[];
  params?: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const Button = ({ title, ...props }: ButtonProps) => {
 return (
   <button
     {...props}
     className="py-1 px-2 text-sm rounded-lg border border-outline bg-grey text-black dark:border-outline-dark dark:bg-grey-dark dark:text-white font-medium shadow-sm"
   >
     {title}
   </button>
 );
}

const RclList: FC<RclListProps> = ({ max, className, buttonMore = "Ver más", buttonLess = "Mostrar menos", items, children, params }) => {
  const [showAll, setShowAll] = useState(false);
  
  const displayedItems = showAll || !max ? items : items.slice(0, max);

  const handleToggle = () => {
    setShowAll(!showAll);
  }

  const showToggleButton = max && items.length > max;

  return (
    <>
      <div className="flex items-center gap-2 w-full">
        <Link href={`/prp/expensas/${params}/reclamos/nuevo`} className='icon-green p-2 flex items-center justify-center rounded-lg'>
          <span>
            <IconSquareRoundedPlus width={26} height={26} />{" "}
          </span>
        </Link>
        <Input
          icon={
            <IconSearch className="text-text-grey" width={18} height={18} />
          }
          type="text"
          placeholder="Buscar"
          orientation="icon-left"
          className="bg-grey dark:bg-grey-dark w-full"
        />
        <Input 
          type='select'
          placeholder='Filtrar'
          selectValues={[{ arr: ["Mas viejo"] }]}
          className='!bg-grey dark:!bg-grey-dark w-fit gap-2'
          classNameContainer='w-fit'
        />
      </div>
      {children}
      <div className={cn(className, "flex flex-col gap-[10px]")}>
        {displayedItems.map((item, index) => (
          <div key={item.Rcl_id} className="relative">
            {!showAll && showToggleButton && index === max - 1 && (
              <div className="absolute top-0 w-full h-full flex items-center justify-center bg-gradient-to-t from-white to-white/20 dark:from-black-app-bg dark:to-black-app-bg/20 backdrop-blur-[2px]">
                <Button title={buttonMore} onClick={handleToggle} />
              </div>
            )}
            <RclCard
              className={
                !showAll && showToggleButton && index === max - 1
                  ? "border-0"
                  : ""
              }
              id={item.Rcl_id}
              title={item.Rcl_Subject}
              status={item.Rcl_Status}
              desc={item.Rcl_Description}
              createdAt={item.Rcl_DateTime}
            />
          </div>
        ))}
        {showAll && showToggleButton && (
          <div className="flex justify-center mt-4">
            <Button title={buttonLess} onClick={handleToggle} />
          </div>
        )}
      </div>
    </>
  );
}

export default RclList