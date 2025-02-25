import React from 'react'
import getParams from 'app/hooks/use-get-params';
import Section from 'app/components/Sections/Section';
import UnitInfoSection from 'app/features/Unit/Details';
import { getUnit } from "app/services/queries";
import { DataTable } from 'app/features/Unit/Details/_TableLiquidations';
import { columns } from 'app/features/Unit/Details/_TableLiquidations/columns';
import { notFound } from 'next/navigation';

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const unitId = getParams({ params: id, type: "id" });
  
  const data = await getUnit({ id: unitId });

  if (data.length <= 0) return notFound();

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
      nombreAdjunto: item.nombreAdjunto,
      period: convertDate(item.titulo),
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