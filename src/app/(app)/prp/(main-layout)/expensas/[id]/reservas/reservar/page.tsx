import EmptySection from 'app/components/Messages/EmptySection';
import Section from 'app/components/Sections/Section';
import ReserveResourceList from 'app/features/Reserves/Create/ReserveResourceList';
import getParams from 'app/hooks/use-get-params';
import { getUnitReservations } from "app/services/queries";

const page = async ({ params: { id }, searchParams }: { params: { id: string }, searchParams: { [key: string]: string | string[] | undefined } }) => {
  const unitId = getParams({ params: id, type: "id" });
  const unitCode = getParams({ params: id, type: "code" });

  if (!unitId) return null;

  const data = await getUnitReservations({ id: unitId, code: unitCode });

  return (
    <Section className="w-full pb-8 max-md:pb-0 mt-0">
      {data.recursosPorEdificio.length === 0 && <EmptySection title='Este edificio no tiene amenities'/>}
      <ReserveResourceList items={data?.recursosPorEdificio ?? []} params={`prp/expensas/${id}`} />
    </Section>
  );
}

export default page