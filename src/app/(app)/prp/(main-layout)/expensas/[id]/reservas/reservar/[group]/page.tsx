import React from 'react'
import Section from 'app/components/Sections/Section';
import { getUnitReservationsByGroupCalendar } from "app/services/queries";
import getParams from 'app/hooks/use-get-params';
import ReserveTurnList from 'app/features/Reserves/Create/ReserveTurnList';

type Props = {
  params: Promise<{ group: string; id: string }>;
  searchParams: Promise<{ [code: string]: string }>;
};

const page =  async ({ params, searchParams }: Props) => {
  const { id, group } = await params
  const search = await searchParams

  const unitId = getParams({ params: id, type: "id" });
  const unitCode = getParams({ params: id, type: "code" });
  
  const data = await getUnitReservationsByGroupCalendar({
    id: unitId,
    group: group,
    code: unitCode,
  });

  return (
    <Section className="w-full pb-8 max-md:pb-0 mt-0">
      <ReserveTurnList data={data as any[]} pathParams={id} group={group} resource={search['code'].toString() ?? ""}/>
    </Section>
  );
}

export default page