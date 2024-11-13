import { cn } from '@/lib/utils';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import React, { FC } from 'react'

interface ButtonArrowProps {
  onClick?: () => void;
  href?: string;
  title: string;
  className?: string;
  textSize?: "text-xl" | "text-lg" | "text-base"
}

export const ButtonClassName = "px-3 py-2 transition-colors rounded-md font-medium flex items-center gap-1 w-fit";

const ButtonArrow: FC<ButtonArrowProps> = ({ title, className, href, onClick, textSize = 'text-lg' }) => {
  const content = (
    <>
      {title} <IconArrowNarrowRight width={24} height={24} />
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(className, ButtonClassName, textSize)}
        title={title}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      title={title}
      onClick={onClick}
      className={cn(className, ButtonClassName, textSize)}
    >
      {content}
    </button>
  );
}

export default ButtonArrow