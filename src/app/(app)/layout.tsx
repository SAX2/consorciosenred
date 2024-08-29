'use client'

import React from 'react'
import { ThemeProvider } from "@/context/ThemeProvider"

interface layoutProps {
  children: React.ReactNode;
}

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
}

export default layout