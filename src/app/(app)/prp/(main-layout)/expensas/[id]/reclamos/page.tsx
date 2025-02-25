import getParams from "@/env/getParams";
import { getUnitIssues } from "@/lib/queries/queries";
import RclList, { BottomSectionRcl } from "app/features/Issues/List";
import EmptySection from "@/components/Sections/AppSections/Errors/EmptySection";

const page = async ({ params }: {  params: Promise<{ group: string; id: string }> }) => {
  const { id } = await params
  const unitCode = getParams({ params: id, type: "code" });

  if (!unitCode) return null;

  const data = await getUnitIssues({ code: unitCode });

  return (
    <div className="flex flex-col gap-4">
      {!data ||
        (data.rclDpto.length === 0 && data.rclEdif.length === 0 && (
          <EmptySection />
        ))}
      {(data.rclDpto.length > 0 || data.rclEdif.length > 0) && (
        <RclList
          items={data}
          buttonMore="Ver todos los reclamos"
          buttonLess="Mostrar menos"
        />
      )}
      <BottomSectionRcl param={id} />
    </div>
  );
};

export default page;
