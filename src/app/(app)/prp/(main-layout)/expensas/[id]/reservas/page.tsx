import Button from "@/components/Buttons/Button";
import EmptySection from "@/components/Sections/AppSections/Errors/EmptySection";
import Section from "@/components/Sections/AppSections/Section";
import ListSkeleton from "@/components/Skeletons/List";
import ReservationsScreen from "@/containers/reservation-page/reservations-list";
import getParams from "@/env/getParams";
import { getUnitReservations, getUnitReservationsList } from "@/lib/queries/queries";
import { IconChevronRight } from "@tabler/icons-react";

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

  if (!data && !data.Reservas && data.Reservas.length === 0) return <EmptySection reload/>

  return (
    <Section className="w-full pb-8 max  -md:pb-0 mt-0" isFirst>
      <ReservationsScreen
        data={data.Reservas}
        param={id}
      />
    </Section>
  );
};

export default page;
