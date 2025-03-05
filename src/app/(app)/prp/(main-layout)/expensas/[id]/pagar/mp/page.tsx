import Section from 'app/components/Sections/Section';
import PayMpScreen from 'app/features/Payments/Pay/Mp';
import getParams from 'app/hooks/use-get-params';
import { getUnit } from 'app/services/queries';
import { notFound } from 'next/navigation';
import React from 'react'

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const unitId = getParams({ params: id, type: "id" });
  
  const data = await getUnit({ id: unitId });

  if (data.length <= 0 && data[0].CPE) return notFound();

  return (
    <>
      {data && data[0].CPE && (
        <Section>
          <PayMpScreen
            data={data[0].CPE.filter((item: any) => item.codigo === "CKO_MP")[0]}
            unit={data[0]}
            id={id}
          />
        </Section>
      )}
    </>
  );
}

export default page