import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'
import IconFile from './IconFile';
import { StatusValue } from '@/hooks/use-status';

export interface PillProps {
  className?: string;
  classNameText?: string;
  text: string;
  icon?: React.ReactNode;
  iconOrientation?: "left" | "right"
  isFile?: boolean;
  fileId?: string;
  variant?: StatusValue;
}

export const variantContainerClassName = (variant: StatusValue) => variant === "warning" ? "border-yellow-sec/15 bg-yellow/15" : variant === "error" ? "border-red/25 bg-red/15" : variant === "success" ? "border-green/15 bg-green/15" : variant === "neutral" ? "border-outline bg-grey-sec" : variant === "default" ? "border-outline bg-white" : variant === "info" ? "bg-blue-button/15 border-blue-button/15": "" 
export const variantTextClassName = (variant: StatusValue) => variant === "warning" ? "text-yellow-sec" : variant === "error" ? "text-red" : variant === "success" ? "text-green" : variant === "neutral" ? "text-text-grey" : variant === "default" ? "text-black" : variant === "info" ? "text-blue-button": ""

const Pill: React.FC<PillProps> = ({
  text,
  className,
  icon,
  classNameText,
  isFile = false,
  fileId,
  iconOrientation = "left",
  variant = "default"
}) => {
  if (isFile) {
    return (
      <Link
        href={`/file/type/${fileId}/${fileId}`}
        className={cn(
          "flex items-center gap-1 px-1 py-[2px] border bg-white border-outline dark:bg-grey-sec-dark dark:border-outline-dark w-fit text-xs font-medium rounded-md",
          className
        )}
      >
        {iconOrientation === "left" && icon}
        <IconFile
          type={typeof fileId === "string" ? fileId.split(".").pop() ?? "" : ""}
        />
        <span
          className={cn(
            "text-black dark:text-white font-medium",
            classNameText
          )}
        >
          {text}
        </span>
        {iconOrientation === "right" && icon}
      </Link>
    );
  }

  return (
    <div
      className={cn(
        variantContainerClassName(variant),
        "darkk:bg-grey-sec-dark darkk:border-outline-dark flex w-fit items-center justify-center rounded-[6px] border px-1 text-xs font-medium flex-row",
        className
      )}
    >
      {iconOrientation === "left" && icon}
      <span
        className={cn("dark:text-white font-medium", classNameText, variantTextClassName(variant))}
      >
        {text}
      </span>
      {iconOrientation === "right" && icon}
    </div>
  );
};

export default Pill;