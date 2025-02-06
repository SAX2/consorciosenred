"use client"

import { FC } from 'react'
import { useParams, usePathname } from 'next/navigation';
import AsideSectionMain from '@/containers/expenses-page/aside-section';
import AsideSectionUnit from '@/containers/unit-page/aside-section';
import getParams from '@/env/getParams';

interface AsideSectionProps {
  children?: React.ReactNode;
  aside?: React.ReactNode;
  permissions?: any;
}

const AsideSection: FC<AsideSectionProps> = ({ children, aside }) => {
  const params = useParams();

  const id = params.id as string;
  const unitId = getParams({ params: id, type: "id" })
  const pathname = usePathname()

  return (
    <aside className="w-full col-start-3 min-w-[400px] max-xl:min-w-[300px] max-lg:min-w-[250px] max-md:min-w-fit max-md:col-start-1 relative max-md:hidden">
      <div className="sticky top-8 flex flex-col gap-8">
        {children}
        {params.id ? (
          <AsideSectionUnit id={unitId}/>
        ) : (
          <AsideSectionMain />
        )}
      </div>
    </aside>
  );
}

export default AsideSection