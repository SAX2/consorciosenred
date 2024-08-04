"use client"

import { cn } from '@/lib/utils';
import React, { useState } from 'react'
import RclCard from './RclCard';

interface ListProps {
  max?: number;
  className?: string;
  buttonMore?: string;
  buttonLess?: string;
  items: any[];
  children?: React.ReactNode;
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

const ListRcl: React.FC<ListProps> = ({ max, className, buttonMore = "Ver más", buttonLess = "Mostrar menos", items, children }) => {
  const [showAll, setShowAll] = useState(false);
  
  const displayedItems = showAll || !max ? items : items.slice(0, max);

  const handleToggle = () => {
    setShowAll(!showAll);
  }

  const showToggleButton = max && items.length > max;

  return (
    <>
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

export default ListRcl