import React, { PropsWithChildren, FC, Suspense } from 'react'
import { Separator } from 'app/components/ui/separator';
import AsideSection from 'app/components/Aside';
import UserCard from 'app/features/MLayout/Aside/_UserCard';
import Header from 'app/features/MLayout/Headers/Header';
import MediaQueryProvider from 'app/contexts/MediaQueryProvider';
import MobileHeader from 'app/features/MLayout/Headers/MobileHeader';
import { Metadata } from 'next';
import Sidebar from 'app/features/Unit/Sidebar';
import SidebarUserLayout from 'app/features/User/Sidebar';
import { cn } from 'app/lib/utils';
import AsideUser from 'app/features/User/Details/_AsideUser';

interface LayoutProps extends PropsWithChildren {
  modal: React.ReactNode
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: "CER Propietarios",
  category: "website",
  generator: "Next.js",
};

const layout: FC<LayoutProps> = async ({ children, modal }) => {
  return (
    <main className="flex bg-white dark:bg-black-app-bg justify-center flex-col items-center">
      <div className="bg-white dark:bg-black-app-bg w-full max-h-dvh h-dvh overflow-y-scroll relative">
        <MediaQueryProvider maxWidth={768}>
          <MobileHeader />
        </MediaQueryProvider>
        <div className="flex flex-col gap-8 max-md:gap-4 w-full items-center">
          <MediaQueryProvider minWidth={768}>
            <Header />
          </MediaQueryProvider>
          <Separator className="max-md:hidden" />
          <div className="grid grid-cols-[1fr_auto] max-md:grid-cols-[1fr] w-full gap-8 px-8 max-md:p-0 max-w-[1440px]">
            <div
              className={cn(
                "grid grid-cols-[auto_1fr] gap-8 max-md:grid-cols-[1fr]",
                "w-full col-span-2 max-md:col-span-1"
              )}
            >
              <MediaQueryProvider minWidth={768}>
                <div className="relative">
                  <SidebarUserLayout />
                </div>
              </MediaQueryProvider>
              <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
            </div>
            <MediaQueryProvider minWidth={768}>
              <AsideSection>
                <AsideUser />
              </AsideSection>
            </MediaQueryProvider>
          </div>
        </div>
      </div>
      {modal}
    </main>
  );
};

export default layout