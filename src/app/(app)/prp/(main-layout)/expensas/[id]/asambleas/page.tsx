import EmptySection from '@/components/Sections/AppSections/Errors/EmptySection';
import Section from '@/components/Sections/AppSections/Section';
import AssemblyScreen from '@/containers/asambley-page/assembly-screen';
import getParams from '@/env/getParams';
import { getUnitAssembly } from '@/lib/queries/queries';
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