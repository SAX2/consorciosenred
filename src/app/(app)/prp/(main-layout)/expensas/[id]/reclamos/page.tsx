import TitleSection from '@/app/(app)/components/sections/TitleSection';
import React from 'react'

const page = ({ params: { id } }: { params: { id: string } }) => {
  console.log(id)

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