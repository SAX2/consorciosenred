import getParams from "@/env/getParams";
import { getUnitIssues } from "@/lib/queries/queries";
import Section from "@/components/Sections/AppSections/Section";
import RclList from "@/containers/rcl-page/rcl-list";
import NoResult from "@/containers/errors/no-result";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const unitCode = getParams({ params: id, type: "code" });

  if (!unitCode) return null;

  const data = await getUnitIssues({ code: unitCode });

  if (data.rclDpto.length === 0 && data.rclEdif.length === 0) {
    return <NoResult message={'No se han encontrado reclamos'}/>
  }

  return (
    <div className="flex flex-col gap-4">
      {data.rclDpto.length > 0 && (
        <Section
          title="Reclamos de la Unidad"
          pageTitle="Reclamos"
          className="w-full pb-8 max-md:pb-0 mt-0"
          isFirst
        >
          <RclList
            items={data.rclDpto}
            max={5}
            buttonMore="Ver todos los reclamos"
            buttonLess="Mostrar menos"
            params={id}
          />
        </Section>
      )}
      {data.rclEdif.length > 0 && (
        <Section
          title="Reclamos del edificio"
          className="w-full pb-8 max-md:pb-0 mt-0"
        >
          <RclList
            items={data.rclEdif}
            max={5}
            buttonMore="Ver todos los reclamos"
            buttonLess="Mostrar menos"
            params={id}
          />
        </Section>
      )}
    </div>
  );
};

export default page;
