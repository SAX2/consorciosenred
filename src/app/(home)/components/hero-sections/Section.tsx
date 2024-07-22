import { StaticDataType } from '@/lib/types/data.types';
import { cn } from '@/lib/utils';
import { IconArrowNarrowRight, IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'

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
            <Link
              href={data.page?.path}
              title={data?.title}
              className={cn(
                "w-fit flex items-center text-lg gap-1 px-3 py-1 rounded-md font-medium transition-colors max-md:hidden",
                data.page.mainColor
              )}
            >
              {data.page?.button}{" "}
              <IconArrowNarrowRight width={24} height={24} />
            </Link>
          )}
        </div>
        {children}
        {data.page && (
          <Link
            href={data.page?.path}
            title={data?.title}
            className={cn(
              "w-fit hidden items-center text-lg gap-1 px-3 py-1 rounded-md font-medium transition-colors max-md:flex",
              data.page.mainColor
            )}
          >
            {data.page?.button} <IconArrowNarrowRight width={24} height={24} />
          </Link>
        )}
      </div>
    </section>
  );
};

export default Section