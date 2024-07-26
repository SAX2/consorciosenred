import { getAuthHeaders } from '@/app/actions';
import { urlControlPanel } from '@/lib/urls'
import React from 'react'
import TitleSection from '../components/sections/TitleSection';
import { Separator } from '@/components/ui/separator';
import { IconBuilding } from '@tabler/icons-react';
import Pill from '@/components/pill/Pill';
import UnitCard from '../components/cards/UnitCard';
import NewUnitKeyDialog from '../components/dialogs/NewUnitKeyDialog';
import UnitGrid from '../components/sections/UnitGrid';

const fetchControlPanel = async () => {

  const headers = await getAuthHeaders()

  const res = await fetch(urlControlPanel, {
    method: "POST",
    headers: { ...headers },
  });

  if (!res.ok) return;

  const data = await res.json();
  return data;
}

const page = async () => {
  const data = await fetchControlPanel();

  return (
    <div className="p-8 max-md:p-4 flex flex-col gap-8 max-md:gap-4 max-w-full">
      <div>
        <h1 className="text-black dark:text-white font-semibold text-2xl">
          Panel de control
        </h1>
      </div>
      <Separator />
      <div className="grid grid-cols-[1fr_auto] max-md:grid-cols-[1fr] w-full gap-16 max-md:gap-8">
        <TitleSection
          className="w-full col-span-2 max-md:col-span-1"
          title="Mis expensas"
          pills={[{ text: data.length }]}
          link={{ href: "/expensas", title: "Ver todos los edificios" }}
        >
          <UnitGrid data={data} />
        </TitleSection>
        <TitleSection className="w-full col-start-3 min-w-[350px] max-xl:min-w-[300px] max-lg:min-w-[250px] max-md:min-w-fit max-md:col-start-1" title="Atajos">
          asd
        </TitleSection>
      </div>
    </div>
  );
}

export default page