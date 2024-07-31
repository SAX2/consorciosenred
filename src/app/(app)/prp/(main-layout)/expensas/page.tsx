import { getAuthHeaders } from '@/app/actions';
import { urlControlPanel } from '@/lib/queries/urls'
import { Separator } from '@/components/ui/separator';
import React from 'react'
import TitleSection from '../../../components/sections/TitleSection';
import UnitGrid from '../../../components/sections/UnitGrid';
import ShortcutsGrid from '../../../components/sections/ShortcutsGrid';
import { shortcuts } from '@/lib/contents/(app)/shortcuts';
import { getAllUnits } from '@/lib/queries/queries';
import { redirect } from 'next/navigation';
import UserCard from '@/app/(app)/components/sidebar/UserCard';

const page = async () => {
  const data = await getAllUnits();

  if (data.length <= 1) {
    return redirect(`/prp/expensas/${data[0].uf_id}&unique=true`);
  }

  return (
    <TitleSection
      pageTitle="Mis expensas"
      className="w-full col-span-2 max-md:col-span-1 pb-8 max-md:pb-0"
      title="Unidades"
      pills={[{ text: data.length }]}
      isFirst
      // backUrl={true}
      // link={{ href: "/expensas", title: "Ver todos los edificios" }}
    >
      <UnitGrid data={data} />
    </TitleSection>
  );
}

export default page