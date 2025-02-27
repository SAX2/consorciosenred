"use client"

import { FC } from 'react'

interface AsideSectionProps {
  children?: React.ReactNode;
  aside?: React.ReactNode;
  permissions?: any;
}

const AsideSection: FC<AsideSectionProps> = ({ children, aside }) => {
  return (
    <aside className="w-full col-start-3 min-w-[400px] max-xl:min-w-[300px] max-lg:min-w-[250px] max-md:min-w-fit max-md:col-start-1 relative max-md:hidden">
      <div className="sticky top-8 flex flex-col gap-8">
        {children}
      </div>
    </aside>
  );
}

export default AsideSection