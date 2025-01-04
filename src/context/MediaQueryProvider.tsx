"use client"

import useIsLargeScreen from '@/hooks/useIsLargeScreen';
import useIsShortScreen from '@/hooks/useIsShortScreen';
import React, { FC } from 'react'

interface MediaQueryProviderProps {
  children: React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
}

const MediaQueryProvider: FC<MediaQueryProviderProps> = ({ children, minWidth, maxWidth }) => {
  const { isLargeScreen } = useIsLargeScreen({ minWidth: minWidth ?? 0 });
  const { isShortScreen } = useIsShortScreen({ maxWidth: maxWidth ?? 0 });

  return (
    <>
      {minWidth && isLargeScreen && children}
      {maxWidth && isShortScreen && children}
    </>
  );
}

export default MediaQueryProvider