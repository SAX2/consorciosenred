"use client"

import { usePathname } from 'next/navigation'
import React from 'react'
import AsideUnit from './AsideUnit'
import AsideMain from './AsideMain'

interface AsideProps {
  children?: React.ReactNode;
}

const Aside: React.FC<AsideProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col gap-8 w-full col-start-3 min-w-[400px] max-xl:min-w-[300px] max-lg:min-w-[250px] max-md:min-w-fit max-md:col-start-1 sticky top-60">
      {children}
      {pathname === `/prp/expensas` ? <AsideMain /> : <AsideUnit />}
    </aside>
  );
}

export default Aside