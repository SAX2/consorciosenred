import { cn } from '@/lib/utils';
import React from 'react'

const Burger = ({ isMenuOpen, size = 'md' }: { isMenuOpen: boolean; size?: "md" | "sm" }) => {
  return (
    <>
      <span
        className={cn(
          "block absolute h-0.5 bg-white transform transition duration-300 ease-in-out",
          size === 'md' && "w-6",
          size === 'sm' && "w-4",
          isMenuOpen ? "rotate-45" : (size === 'md' ? "-translate-y-1.5" : size === 'sm' && "-translate-y-1")
        )}
      ></span>
      <span
        className={cn(
          "block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out",
          size === 'md' && "w-6",
          size === 'sm' && "w-4",
          isMenuOpen ? "-rotate-45" : (size === 'md' ? "translate-y-1.5" : size === 'sm' && "translate-y-1.5")
        )}
      ></span>
    </>
  );
}

export default Burger