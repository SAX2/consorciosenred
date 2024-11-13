"use client"

import React from 'react';
import { cn } from '@/lib/utils'; // To handle conditional classes

interface SemiSectionProps {
  children?: React.ReactNode;
  title: string;
  icon?: React.ReactElement;
  className?: string;
  mainColors?: "icon-yellow" | "icon-green" | "icon-blue" | "icon-purple" | string;
  custom?: boolean;
  content?: { title: string, children: React.ReactElement; }[];
  type: "main" | "simple" | "multiple" | "custom";
  background?: string;
  margin?: 'top' | 'bottom';
}

const SemiSection: React.FC<SemiSectionProps> = ({
  children,
  icon,
  title,
  mainColors,
  className,
  custom = false,
  content,
  type,
  background = "bg-grey dark:bg-grey-dark",
}) => {
  const containerClasses = cn(
    className,
    background,
    "w-full flex items-center justify-between rounded-xl p-3"
  );

  if (type === 'custom') {
    return (
      <div className={containerClasses}>
        {children}
      </div>
    );
  }

  if (type === 'main') {
    return (
      <SemiSectionMain
        title={title}
        className={className}
        background={background}
      >
        {children}
      </SemiSectionMain>
    );
  }

  if (type === 'simple') {
    return (
      <SemiSectionSimple title={title} icon={icon} className={className} background={background}>
        {children}
      </SemiSectionSimple>
    );
  }

  if (type === 'multiple') {
    return (
      <SemiSectionMultiple title={title} icon={icon} content={content} className={className} background={background}>
        {children}
      </SemiSectionMultiple>
    );
  }

  return null;
};

interface SemiSectionMainProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  background?: string;
}

const SemiSectionMain = ({ title, children, className, background = "bg-grey dark:bg-grey-dark" }: SemiSectionMainProps) => {
  const containerClasses = cn(className, background, 'w-full flex flex-col items-center justify-between rounded-xl p-3 gap-1 ');
  return (
    <div className={containerClasses}>
      <span className="text-text-grey text-base font-medium">{title}</span>
      {children}
    </div>
  );
};

interface SemiSectionSimpleProps extends SemiSectionMainProps {
  icon?: React.ReactElement;
}

const SemiSectionSimple = ({ children, title, icon, className, background = "bg-grey dark:bg-grey-dark" }: SemiSectionSimpleProps) => {
  const containerClasses = cn(className, background, 'w-full flex items-center justify-between rounded-xl p-3');
  return (
    <div className={containerClasses}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          {icon}
          <span key={title} className="text-base font-semibold ml-2">
            {title}
          </span>
        </div>
        <div className="flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

interface SemiSectionMultipleProps extends SemiSectionSimpleProps {
  content?: {
    title: string;
    children?: React.ReactElement;
  }[];
}

const SemiSectionMultiple = ({ title, content, icon, className, background = "bg-grey dark:bg-grey-dark" }: SemiSectionMultipleProps) => {
  const containerClasses = cn(className, background, 'w-full flex flex-col rounded-xl p-3');
  return (
    <div className={containerClasses}>
      <div className="w-full flex items-center justify-between mb-2">
        <div className="flex items-center">
          {icon}
          <span key={title} className="text-base font-semibold ml-2">
            {title}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-[6px]">
        {content &&
          content.map((item) => (
            <div className="flex justify-between items-center" key={item.title}>
              <span className="text-text-grey text-sm font-medium">{item.title}</span>
              {item.children}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SemiSection;
