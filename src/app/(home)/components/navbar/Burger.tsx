import { cn } from '@/lib/utils';
import React from 'react'

const Burger = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  return (
    <>
      <span
        className={cn(
          "block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out",
          isMenuOpen ? "rotate-45" : "-translate-y-1.5"
        )}
      ></span>
      <span
        className={cn(
          "block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out",
          isMenuOpen ? "-rotate-45" : "translate-y-1.5"
        )}
      ></span>
    </>
  );
}

export default Burger