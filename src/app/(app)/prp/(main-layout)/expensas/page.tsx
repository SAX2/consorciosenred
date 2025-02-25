import React from 'react'
import Section from '@/components/Sections/AppSections/Section';
import { getUnits } from '@/lib/queries/queries';
import { redirect } from 'next/navigation';
import UnitList from 'app/features/Unit/List';

const page = async () => {
  const data = await getUnits();

  if (data.length === 1) {
    return redirect('/prp/expensas/' + data[0].uf_id + '_' + data[0].uf_codEdificio);
  }

  return (
    <Section className="w-full col-span-2 max-md:col-span-1 pb-8 max-md:pb-0">
      <UnitList data={data}/>
    </Section>
  );
}

export default page