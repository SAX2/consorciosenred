"use client"

import { cn } from "@/lib/utils";
import { FC } from "react";

interface SemiSectionProps {
  titles: string[];
  children: React.ReactNode;
  icon?: React.ReactElement;
  className?: string;
  isMain?: boolean;
  mainColors?: "icon-yellow" | "icon-green" | "icon-blue" | "icon-purple" | string;
  custom?: boolean;
  ref?:  React.Ref<HTMLDivElement>;
}

const SemiSection: FC<SemiSectionProps> = ({
  children,
  icon,
  mainColors,
  titles,
  className,
  isMain,
  ref,
  custom = false,
}) => {
  return (
    <div
      ref={ref}
      className={cn(
        "p-3 rounded-xl text-black bg-grey-sec dark:bg-grey-sec-dark dark:text-white flex items-center gap-1 justify-between",
        className,
        !custom && isMain && "flex-col justify-center items-center"
      )}
    >
      {!custom && isMain && (
        <p className="text-base font-medium text-text-grey" key={titles[0]}>
          {titles[0]}
        </p>
      )}
      {!custom && !isMain && (
        <div className="flex items-center gap-3">
          <div
            className={cn(
              mainColors,
              "p-1 rounded-lg",
              "max-[425px]:p-[2px] max-[425px]:children:w-7 max-[425px]:children:h-auto",
              !mainColors && "bg-grey border-outline text-text-grey dark:bg-grey-dark dark:border-outline-dark",
            )}
          >
            {icon && icon}
          </div>
          <div className="flex flex-col">
            {titles.map((title) => (
              <p className="text-base font-medium" key={title}>
                {title}
              </p>
            ))}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default SemiSection;