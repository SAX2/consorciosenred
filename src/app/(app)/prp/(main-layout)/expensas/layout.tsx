import React from 'react'
import { Separator } from '@/components/ui/separator';
import MainTitle from '@/components/title/MainTitle';
import UserCard from '@/app/(app)/components/sidebar/UserCard';
import Aside from '../components/aside/Aside';
import MediaProvider from '@/lib/context/MediaProvider';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex overflow-y-auto bg-white dark:bg-black-app-bg justify-center">
      <div className="bg-white dark:bg-black-app-bg w-full max-h-dvh h-dvh overflow-y-auto">
        <div className="max-md:p-3 flex flex-col gap-8 max-md:gap-4 w-full items-center">
          <MainTitle title="Mis expensas" />
          <Separator className="max-md:hidden" />
          <div className="grid grid-cols-[1fr_auto] max-md:grid-cols-[1fr] w-full gap-8 px-8 max-md:p-0 max-w-[1440px]">
            {children}
            <MediaProvider minWidth={768}>
              <Aside>
                <UserCard />
              </Aside>
            </MediaProvider>
          </div>
        </div>
      </div>
    </main>
  );
};

export default layout