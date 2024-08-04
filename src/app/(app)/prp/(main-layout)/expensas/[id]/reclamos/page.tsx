import TitleSection from '@/app/(app)/components/sections/TitleSection';
import getParams from '@/lib/hooks/getParams';
import { getUnitIssues } from '@/lib/queries/queries';
import React from 'react'
import RclCard from './components/RclCard';
import ListRcl from './components/ListRcl';

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const unitCode = getParams({ params: id, type: "code" });

  const data = await getUnitIssues({ code: unitCode })

  return (
    <div className='flex flex-col gap-4'>
      <TitleSection
        pageTitle="Reclamos"
        className="w-full col-span-1 pb-8 max-md:pb-0 mt-0"
        backUrl={true}
        isFirst={true}
        unitPage
      >
        <ListRcl items={data.rclDpto} max={5} buttonMore='Ver todos los reclamos' buttonLess='Mostrar menos'/>
      </TitleSection>
      <TitleSection
        title='Reclamos del edificio'
        className="w-full col-span-1 pb-8 max-md:pb-0 mt-0"
      >
        <ListRcl items={data.rclEdif} max={5} buttonMore='Ver todos los reclamos' buttonLess='Mostrar menos'/>
      </TitleSection>
    </div>
  );
}

export default page