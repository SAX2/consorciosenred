import EmptySection from "@/components/Sections/AppSections/Errors/EmptySection";
import Section from "@/components/Sections/AppSections/Section";
import ReservationsScreen, { BottomSectionReserve } from "@/containers/reservation-page/reservations-list";
import getParams from "@/env/getParams";
import { getUnitReservationsList } from "@/lib/queries/queries";

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
