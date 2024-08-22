import React from 'react'
import getParams from '@/env/getParams';
import Section from '@/components/Sections/AppSections/Section';
import UnitInfoSection from '@/containers/unit-page/info-section';
import { getUnit } from '@/lib/queries/queries';
import { DataTable } from '@/components/Tables/LiquidationsUnit';
import { columns } from '@/components/Tables/LiquidationsUnit/columns';

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const unitId = getParams({ params: id, type: "id" });
  
  const data = await getUnit({ id: unitId });

  if (data.length <= 0) return <div>Not found</div>;

  function convertDate(date: string) {
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    const [month, year] = date.split(" - ");
    const monthName = months[parseInt(month) - 1];
    
    return `${year} - ${monthName}`;
}

  const formatExpensas = (data: any) => {
    const sortedData = data.sort((a: any, b: any) => b.orden - a.orden);

    return sortedData.map((item: any) => ({
      id: item.id,
      period: item.titulo,
      title: convertDate(item.titulo),
      adj: item.nombreAdjunto
    }));
  };

  const expensas = formatExpensas(data[0].uf_liquidaciones);

  return (
    <div className="flex flex-col gap-8">
      <Section
        pageTitle="Mis expensas"
        className="w-full pb-8 max-md:pb-0 mt-0"
        backUrl={true}
        isFirst={true}
      >
        <UnitInfoSection unit={data[0]} key={data[0].uf_id} />
      </Section>
      <Section
        title="Histórico de Expensas"
        className="w-full pb-8 max-md:pb-0 mt-0 mb-8"
        pills={[{ text: data[0].uf_liquidaciones.length }]}
      >
        <DataTable
          columns={columns}
          data={expensas}
          className="bg-grey dark:bg-grey-dark"
          classNameBody="bg-white dark:bg-black-app-bg"
        />
      </Section>
    </div>
  );
};

export default page