"use client";

import { useEffect, useState } from "react";

interface HookProps {
  maxWidth: number;
}

function useIsShortScreen({ maxWidth }: HookProps) {
  const [isShortScreen, setIsShortScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`);

    setIsShortScreen(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsShortScreen(e.matches);
    };

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, [maxWidth]);

  return { isShortScreen };
};

export default useIsShortScreen;
