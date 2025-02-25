import EmptySection from "app/components/Messages/EmptySection";
import Section from "app/components/Sections/Section";
import ReservationsScreen, { BottomSectionReserve } from "app/features/Reserves/List";
import getParams from "app/hooks/use-get-params";
import { getUnitReservationsList } from "app/services/queries";

const page = async ({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const unitId = getParams({ params: id, type: "id" });

  if (!unitId) return null;

  const data = await getUnitReservationsList({ id: unitId, orden: "ascendente" })

  return (
    <Section className="w-full pb-8 max-md:pb-0 mt-0 max-md:h-[calc(100dvh-100px)] relative max-md:max-h-[calc(100dvh-76px)]" isFirst>
      {!data ||
        !data.Reservas ||
        (data.Reservas.length === 0 && <EmptySection reload />)}
      {data.Reservas.length > 0 && (
        <ReservationsScreen data={data.Reservas} param={id} />
      )}
      <BottomSectionReserve param={id} />
    </Section>
  );
};

export default page;
