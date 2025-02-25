'use client'

import React from 'react'
import { ThemeProvider } from "app/contexts/ThemeProvider"
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'app/components/ui/sonner';
import { IconCircleCheckFilled } from '@tabler/icons-react';

interface layoutProps {
  children: React.ReactNode;
}

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange enableSystem>
      <NextTopLoader showSpinner={false} />
      {children}
      <Toaster
        duration={10000000}
        toastOptions={{
          className: "px-3 rounded-xl gap-6 border-outline dark:border-outline-dark dark:bg-black-app-bg",
          classNames: {
            description: "text-lg"
          }
        }}
        className="!rounded-full "
        icons={{
          success: (
            <div className="p-[6px] rounded-lg bg-green/15 relative">
              <IconCircleCheckFilled size={24} className="text-green" />
            </div>
          ),
        }}
      />
    </ThemeProvider>
  );
}

export default layout