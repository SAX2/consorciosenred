import Pill, { PillProps } from '@/components/pill/Pill';
import { cn } from '@/lib/utils';
import Link, { LinkProps } from 'next/link';
import React from 'react'

interface TitleSectionProps {
  children: React.ReactNode;
  title: string;
  link?: {
    icon?: string;
  } & LinkProps & React.HTMLAttributes<HTMLAnchorElement>;
  pills?: PillProps[];
  className?: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({ children, title, link, className, pills }) => {
  return (
    <section
      className={cn(
        "flex flex-col gap-4 max-md:gap-3 text-black dark:text-white",
        className
      )}
    >
      <div className="flex justify-between gap-2 items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-xl">{title}</h3>
          {pills?.map((pill) => {
            return <Pill text={pill.text} />;
          })}
        </div>
        {link && (
          <Link
            {...link}
            className="font-medium rounded-md flex gap-2 px-2 py-[2px] bg-grey border border-outline dark:bg-grey-dark dark:border-outline-dark items-center max-lg:hidden"
          >
            {link.icon && <span>{link.icon}</span>}
            {link.title}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

export default TitleSection