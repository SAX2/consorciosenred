"use client"

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ButtonPopoverProps {
  children: React.ReactNode;
  title: string;
  iconPosition?: "left" | "right";
  className?: string;
}

const ButtonPopover = ({
  children,
  title,
  iconPosition = "left",
  className
}: ButtonPopoverProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const iconCode = (
    <div
      className={`transition-all duration-300 flex items-center overflow-hidden ${
        isHovered ? "w-6 mr-2 opacity-100" : "w-0 mr-0 opacity-0"
      }`}
    >
      {children}
    </div>
  );

  return (
    <div
      className={cn(
        "text-white transition-colors duration-300 flex items-center",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {iconPosition === "left" && iconCode}
      <span className="transition-all duration-300">{title}</span>
      {iconPosition === "right" && iconCode}
    </div>
  );
};

export default ButtonPopover