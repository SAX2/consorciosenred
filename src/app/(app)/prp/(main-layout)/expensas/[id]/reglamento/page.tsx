import EmptySection from 'app/components/Messages/EmptySection';
import Section from 'app/components/Sections/Section';
import RegulationScreen from 'app/features/Regulation/List';
import getParams from 'app/hooks/use-get-params';
import { getUnitRegulation } from "app/services/queries";
import React from 'react'

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const code = getParams({ params: id, type: "code" });
  const pin = getParams({ params: id, type: "id" });

  if (!code) return null;

  const data = await getUnitRegulation({ code, pin });

  if (data.ERRMSG || data.reglamentoPorEdificio.length === 0) {
    return <EmptySection />
  }

  return (
    <Section className="w-full max-md:pb-0 mt-0">
      <RegulationScreen
        unitData={data.depto}
        data={data.reglamentoPorEdificio}
        param={id}
      />
    </Section>
  );
}

export default page