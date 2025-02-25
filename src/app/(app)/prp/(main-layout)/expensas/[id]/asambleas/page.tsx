import EmptySection from 'app/components/Messages/EmptySection';
import Section from 'app/components/Sections/Section';
import AssemblyScreen from 'app/features/Assembley/List';
import getParams from 'app/hooks/use-get-params';
import { getUnitAssembly } from "app/services/queries";
import React from 'react'

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const code = getParams({ params: id, type: "code" });

  if (!code) return null;

  const data = await getUnitAssembly({ code });

  if (data.ERRMSG || data.asambleasPorEdificio.length === 0) {
    return <EmptySection />
  }

  return (
    <Section className="w-full max-md:pb-0 mt-0">
      <AssemblyScreen 
        data={data.asambleasPorEdificio}
        param={id}
      />
    </Section>
  );
}

export default page