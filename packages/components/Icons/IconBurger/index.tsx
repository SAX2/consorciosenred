import { cn } from 'app/lib/utils';
import React from 'react'

interface BurgerProps {
  isMenuOpen: boolean;
  size?: "md" | "sm";
  className?: string;
}

const Burger = ({ isMenuOpen, size = 'md', className }: BurgerProps) => {
  return (
    <>
      <span
        className={cn(
          "block absolute h-0.5 bg-black transform transition duration-300 ease-in-out",
          size === 'md' && "w-6",
          size === 'sm' && "w-4",
          isMenuOpen ? "rotate-45 bg-white" : (size === 'md' ? "-translate-y-1.5" : size === 'sm' && "-translate-y-1"),
          className
        )}
      ></span>
      <span
        className={cn(
          "block absolute h-0.5 w-6 bg-black transform transition duration-300 ease-in-out",
          size === 'md' && "w-6",
          size === 'sm' && "w-4",
          isMenuOpen ? "-rotate-45 bg-white" : (size === 'md' ? "translate-y-1.5" : size === 'sm' && "translate-y-1.5"),
          className
        )}
      ></span>
    </>
  );
}

export default Burger