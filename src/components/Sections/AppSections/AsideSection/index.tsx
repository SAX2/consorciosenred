"use client"

import { FC } from 'react'
import { useParams } from 'next/navigation';
import AsideSectionUnit from '@/containers/unit-page/aside-section';
import AsideSectionMain from '@/containers/expenses-page/aside-section';

interface AsideSectionProps {
  children?: React.ReactNode;
}

const AsideSection: FC<AsideSectionProps> = ({ children }) => {
  const params = useParams();

  const unitId = params.id as string;

  return (
    <aside className="w-full col-start-3 min-w-[400px] max-xl:min-w-[300px] max-lg:min-w-[250px] max-md:min-w-fit max-md:col-start-1 relative max-md:hidden">
      <div className="sticky top-8 flex flex-col gap-8">
        {children}
        {params.id ? <AsideSectionUnit id={unitId} /> : <AsideSectionMain />}
      </div>
    </aside>
  );
}

export default AsideSection