import React from 'react'
import { ThemeProvider } from "@/lib/context/ThemeProvider"

interface layoutProps {
  children: React.ReactNode;
}

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

export default layout