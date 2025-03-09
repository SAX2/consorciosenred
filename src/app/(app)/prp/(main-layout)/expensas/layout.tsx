import React, { PropsWithChildren, FC, Suspense } from 'react'
import { Separator } from 'app/components/ui/separator';
import AsideSection from 'app/components/Aside';
import Header from 'app/features/MLayout/Headers/Header';
import MediaQueryProvider from 'app/contexts/MediaQueryProvider';
import MobileHeader from 'app/features/MLayout/Headers/MobileHeader';
import { Metadata } from 'next';
import { AsideUnit } from 'app/features/Unit/Details/_AsideSection';
import AsideHome from 'app/features/MLayout/Aside';
import AsideHomeContent from 'app/features/MLayout/Aside/content';
import UserCard from 'app/features/MLayout/Aside/_UserCard';

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
        <div className="max-md:p-3 flex flex-col gap-8 max-md:gap-4 w-full items-center">
          <MediaQueryProvider minWidth={768}>
            <Header />
          </MediaQueryProvider>
          <Separator className="max-md:hidden" />
          <div className="grid grid-cols-[1fr_auto] max-md:grid-cols-[1fr] w-full gap-8 px-8 max-md:p-0 max-w-[1440px]">
            <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
            <MediaQueryProvider minWidth={768}>
              <AsideSection >
                <UserCard />
                <AsideHome>
                  <AsideHomeContent />
                </AsideHome>
                <AsideUnit />
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