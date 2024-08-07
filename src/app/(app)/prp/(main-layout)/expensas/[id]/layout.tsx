import React from 'react'
import Sidebar from './components/sidebar/Sidebar';
import { cn } from '@/lib/utils';
import MediaProvider from '@/lib/context/MediaProvider';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr] gap-8 max-md:grid-cols-[1fr]",
        "w-full col-span-2 max-md:col-span-1"
      )}
    >
      {/* <MediaProvider></MediaProvider> */}
      <MediaProvider minWidth={768}>
        <Sidebar />
      </MediaProvider>
      {children}
    </div>
  );
};

export default layout