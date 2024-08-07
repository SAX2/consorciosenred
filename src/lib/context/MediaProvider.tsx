"use client"

import React, { useEffect, useState } from 'react'

interface MediaProviderProps {
  minWidth?: number;
  maxWidth?: number;
  children: React.ReactNode;
}

const MediaProvider: React.FC<MediaProviderProps> = ({ maxWidth, children, minWidth }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      
      if (minWidth !== undefined && maxWidth !== undefined) {
        setIsVisible(newWidth >= minWidth && newWidth <= maxWidth);
      } else if (minWidth !== undefined) {
        setIsVisible(newWidth >= minWidth);
      } else if (maxWidth !== undefined) {
        setIsVisible(newWidth <= maxWidth);
      } else {
        setIsVisible(true);  // If neither min nor max is set, always show
      }
    };

    // Call handleResize immediately to set initial state
    handleResize();

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, [minWidth, maxWidth]);

  if (!isVisible) {
    return null;
  }


  return <>{children}</>;
}

export default MediaProvider