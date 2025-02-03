import getParams from "@/env/getParams";
import { getUnitIssues } from "@/lib/queries/queries";
import RclList from "@/containers/rcl-page/rcl-list";
import EmptySection from "@/components/Sections/AppSections/Errors/EmptySection";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const unitCode = getParams({ params: id, type: "code" });

  if (!unitCode) return null;

  const data = await getUnitIssues({ code: unitCode });

  if (data.rclDpto.length === 0 && data.rclEdif.length === 0) {
    return <EmptySection />
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
