"use client"

import { useEffect, useState } from "react";

interface HookProps {
  minWidth: number
}

function useIsLargeScreen({ minWidth }: HookProps) {
  const [isLargeScreen, setIsLargeScreen] = useState(true); 

  useEffect(() => {
    setIsLargeScreen(window.matchMedia(`(min-width: ${minWidth}px)`).matches);

    const handleResize = (e: any) => {
      setIsLargeScreen(e.matches);
    };

    const mediaQuery = window.matchMedia(`(min-width: ${minWidth}px)`);

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, [minWidth]);

  return { isLargeScreen }
};

export default useIsLargeScreen;