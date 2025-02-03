import React, { PropsWithChildren, FC, Suspense } from 'react'
import { Separator } from '@/components/ui/separator';
import AsideSection from '@/components/Sections/AppSections/AsideSection';
import UserCard from '@/components/Cards/UserCard';
import Header from '@/components/Header/AppHeaders/Header';
import MediaQueryProvider from '@/context/MediaQueryProvider';
import MobileHeader from '@/components/Header/AppHeaders/MobileHeader';
import { Metadata } from 'next';

interface LayoutProps extends PropsWithChildren {
  modal: React.ReactNode
}

export const metadata: Metadata = {
  title: "CER Propietarios",
  category: "website",
  generator: "Next.js",
};

const layout: FC<LayoutProps> = ({ children, modal }) => {
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
              <AsideSection>
                <UserCard />
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