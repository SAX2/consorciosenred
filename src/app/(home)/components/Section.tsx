import { StaticDataType } from '@/lib/types/data.types';
import { cn } from '@/lib/utils';
import { IconArrowRight } from '@tabler/icons-react';
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
            "flex gap-1 max-md:justify-center",
            data.page?.path && "justify-between items-center"
          )}
        >
          <h2
            className={cn(
              "font-geist font-bold text-3xl  max-md:text-center tracking-tight",
              black ? "text-white" : "text-black"
            )}
          >
            {data.title}
          </h2>
          {data.page && (
            <Link
              href={data.page?.path}
              title={data.page?.title}
              className="flex items-center gap-1 font-medium bg-grey p-1 rounded-md h-fit hover:bg-gray-100 transition-colors max-md:transition-none max-md:hidden"
            >
              {data.page.button === "know-more" && (
                <>
                  Saber mas <IconArrowRight width={16} height={16} />
                </>
              )}
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section