import Section from '@/components/Sections/AppSections/Section';
import getParams from '@/env/getParams';
import { getUnitReservations } from '@/lib/queries/queries';

const page = async ({ params: { id }, searchParams }: { params: { id: string }, searchParams: { [key: string]: string | string[] | undefined } }) => {
  const unitId = getParams({ params: id, type: "id" });
  const unitCode = getParams({ params: id, type: "code" });

  if (!unitId) return null;

  console.log(searchParams);

console.log({ id: unitId, code: unitCode })
  const data = await getUnitReservations({ id: unitId, code: unitCode });
  console.log(data);

  return (
    <Section
      pageTitle="Reclamos"
      className="w-full pb-8 max-md:pb-0 mt-0"
      isFirst
    >
        asd
      {/* <ReserveList items={data} /> */}
    </Section>
  );
}

export default page