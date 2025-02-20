import React from 'react'
import { getUnits } from '@/lib/queries/queries';
import Section from '@/components/Sections/AppSections/Section';
import Grid from '@/components/Sections/AppSections/Grid';
import UnitCard from '@/components/Cards/UnitCard';
import NewUnitDialog from '@/components/Dialogs/NewUnit';
import { redirect } from 'next/navigation';

const page = async () => {
  const data = await getUnits();

  if (data.length === 1) {
    return redirect('/prp/expensas/' + data[0].uf_id + '_' + data[0].uf_codEdificio);
  }

  return (
    <Section
      pageTitle="Mis expensas"
      className="w-full col-span-2 max-md:col-span-1 pb-8 max-md:pb-0"
      title="Unidades"
      pills={[{ text: data.length }]}
      isFirst
    >
      <Grid className='max-md:pb-6'>
        {data.map((unit: any) => {
          return <UnitCard unit={unit} key={unit.uf_id} />;
        })}
        <div
          className={"border border-outline dark:border-outline-dark border-dashed rounded-lg flex items-center justify-center max-lg:border-0 py-28 max-lg:py-0"}>
          <NewUnitDialog />
        </div>
      </Grid>
    </Section>
  );
}

export default page