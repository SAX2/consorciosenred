import TitleSection from '@/app/(app)/components/sections/TitleSection';
import getParams from '@/lib/hooks/getParams';
import React from 'react'

const page = ({ params: { id } }: { params: { id: string } }) => {
  const unitCode = getParams({ params: id, type: "code" });

  

  return (
    <TitleSection
      pageTitle="Reclamos"
      className="w-full col-span-1 pb-8 max-md:pb-0 mt-0"
      backUrl={true}
      isFirst={true}
      unitPage
      // link={{ href: "/expensas", title: "Ver todos los edificios" }}
    >
      Holaa
    </TitleSection>
  );
}

export default page