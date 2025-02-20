import EmptySection from '@/components/Sections/AppSections/Errors/EmptySection';
import Section from '@/components/Sections/AppSections/Section';
import ReserveList from '@/containers/reservation-page/reserve-list';
import getParams from '@/env/getParams';
import { getUnitReservations } from '@/lib/queries/queries';

const page = async ({ params: { id }, searchParams }: { params: { id: string }, searchParams: { [key: string]: string | string[] | undefined } }) => {
  const unitId = getParams({ params: id, type: "id" });
  const unitCode = getParams({ params: id, type: "code" });

  if (!unitId) return null;

  const data = await getUnitReservations({ id: unitId, code: unitCode });

  return (
    <Section className="w-full pb-8 max-md:pb-0 mt-0">
      {data.recursosPorEdificio.length === 0 && <EmptySection title='Este edificio no tiene amenities'/>}
      <ReserveList items={data?.recursosPorEdificio ?? []} params={`prp/expensas/${id}`} />
    </Section>
  );
}

export default page