import Button from "@/components/Buttons/Button";
import EmptySection from "@/components/Sections/AppSections/Errors/EmptySection";
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
      <EmptySection />
    </Section>
  );
};

export default page;
