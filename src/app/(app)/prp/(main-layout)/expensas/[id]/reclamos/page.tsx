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
      <RclList
        items={data}
        buttonMore="Ver todos los reclamos"
        buttonLess="Mostrar menos"
      />
    </div>
  );
};

export default page;
