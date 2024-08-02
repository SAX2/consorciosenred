import React from 'react'
import TitleSection from '../../../components/sections/TitleSection';
import UnitGrid from '../../../components/sections/UnitGrid';
import { getAllUnits } from '@/lib/queries/queries';

const page = async () => {
  const data = await getAllUnits();

  return (
    <TitleSection
      pageTitle="Mis expensas"
      className="w-full col-span-2 max-md:col-span-1 pb-8 max-md:pb-0"
      title="Unidades"
      pills={[{ text: data.length }]}
      isFirst
      // backUrl={true}
      // link={{ href: "/expensas", title: "Ver todos los edificios" }}
    >
      <UnitGrid data={data} />
    </TitleSection>
  );
}

export default page