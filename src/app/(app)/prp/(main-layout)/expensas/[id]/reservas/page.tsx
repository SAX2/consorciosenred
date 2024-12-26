import Button from "@/components/Buttons/Button";
import Section from "@/components/Sections/AppSections/Section";
import getParams from "@/env/getParams";
import { getUnitReservations } from "@/lib/queries/queries";
import { IconChevronRight } from "@tabler/icons-react";

const page = ({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const unitId = getParams({ params: id, type: "id" });
  const unitCode = getParams({ params: id, type: "code" });

  if (!unitId) return null;

  console.log(searchParams);

  console.log({ id: unitId, code: unitCode });

  return (
    <Section className="w-full pb-8 max  -md:pb-0 mt-0" isFirst>
      <div className="flex flex-col h-screen-main-h gap-2 justify-center items-center">
        <p className="text-lg text-text-grey font-medium text-center">
          Listado de reservas no disponible
        </p>
        <Button
          href={`/prp/expensas/${id}/reservas/reservar`}
          classNameContainer="w-fit"
          title="Hacer una nueva reserva"
          textSize="text-lg"
          buttonBackground="bg-blue-button"
          classNameText="text-white"
          icon={<IconChevronRight size={24} className="text-white" />}
          iconOrientation="right"
        />
      </div>
      {/* <ReserveList items={data} /> */}
    </Section>
  );
};

export default page;
