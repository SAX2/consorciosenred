import { cn } from 'app/lib/utils';
import { StaticDataType } from 'app/types/globals';
import { IconArrowNarrowRight, IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'
import ButtonArrow from '../buttons/button-arrow';

interface SectionProps {
  data: StaticDataType;
  children: React.ReactNode;
  className?: string;
  black?: boolean;
}

const Section: React.FC<SectionProps> = ({ data, children, className, black }) => {
  return (
    <section
      className={cn(
        "items-center h-full max-w-[1000px] w-full justify-center flex pt-8 max-md:pt-0",
        className
      )}
    >
      <div className="flex flex-col gap-8 py-16 max-md:py-12 w-full">
        <div
          className={cn(
            "flex gap-1",
            data.page?.path && "justify-between items-center"
          )}
        >
          <h2
            className={cn(
              "font-geist font-semibold text-3xl tracking-tight",
              black ? "text-white" : "text-black"
            )}
          >
            {data.title}
          </h2>
          {data.page && (
            <ButtonArrow
              href={data.page?.path}
              title={data?.page.button}
              className={cn(data.page.mainColor, "max-md:hidden")}
            />
          )}
        </div>
        {children}
        {data.page && (
          <ButtonArrow
            href={data.page?.path}
            title={data?.page.button}
            className={cn(data.page.mainColor, "md:hidden")}
          />
        )}
      </div>
    </section>
  );
};

export default Section