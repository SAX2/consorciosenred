import Pill, { PillProps } from '@/components/pill/Pill';
import { BackButton } from '@/components/title/MainTitle';
import { cn } from '@/lib/utils';
import Link, { LinkProps } from 'next/link';
import React from 'react'
import OpenSidebarUnit from './OpenSidebarUnit';

interface TitleSectionProps {
  children: React.ReactNode;
  title?: string;
  link?: {
    icon?: string;
  } & LinkProps & React.HTMLAttributes<HTMLAnchorElement>;
  pills?: PillProps[];
  className?: string;
  titleClassName?: string;
  isFirst?: boolean;
  pageTitle?: string;
  backUrl?: boolean;
  unitPage?: boolean;
  rightContent?: React.ReactElement;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  children,
  title,
  link,
  className,
  pills,
  titleClassName,
  pageTitle,
  isFirst = false,
  backUrl = false,
  unitPage = false,
  rightContent
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 max-md:gap-3 text-black dark:text-white",
        className,
        isFirst && pageTitle && "max-md:mt-3"
      )}
    >
      <div className="flex justify-between gap-2 items-center relative">
        <div className={cn("flex items-center gap-2", titleClassName)}>
          {backUrl && (
            <BackButton
              className="hidden max-md:flex"
              icon={{ height: 20, width: 20 }}
            />
          )}
          {isFirst && (
            <h1 className="hidden max-md:block font-medium text-xl truncate">
              {pageTitle}
            </h1>
          )}
          {title && isFirst && (
            <span className="hidden max-md:block text-xl text-text-grey truncate">
              /
            </span>
          )}
          {title && (
            <h3
              className={cn(
                "font-medium text-xl truncate",
                isFirst &&
                  pageTitle &&
                  "max-md:dark:text-white/75 max-md:text-black/75  max-md:font-normal"
              )}
            >
              {title}
            </h3>
          )}
          {pills?.map((pill) => {
            return <Pill text={pill.text} key={pill.text} />;
          })}
        </div>
        {unitPage && isFirst && <OpenSidebarUnit />}
        {!rightContent && link && (
          <Link
            {...link}
            className="font-medium rounded-md flex gap-2 px-2 py-[2px] bg-grey border border-outline dark:bg-grey-dark dark:border-outline-dark items-center max-lg:hidden"
          >
            {link.icon && <span>{link.icon}</span>}
            {link.title}
          </Link>
        )}
        {rightContent && !link && <>{rightContent}</>}
      </div>
      {children}
    </div>
  );
};

export default TitleSection