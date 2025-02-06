import { cn } from "@/lib/utils";
import Sidebar from "@/components/navbar/AppNavbars/UnitSidebar";
import MediaQueryProvider from "@/context/MediaQueryProvider";
import getParams from "@/env/getParams";
import { getUnitPermissions } from "@/store/permissions/unit-permissions";

const layout = async ({ children, params }: { children: React.ReactNode, params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const unitId = getParams({ params: id, type: "id" })
  const permissions = await getUnitPermissions(unitId)

  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr] gap-8 max-md:grid-cols-[1fr]",
        "w-full col-span-2 max-md:col-span-1"
      )}
    >
      <MediaQueryProvider minWidth={768}>
        <div className="relative">
          <Sidebar permissions={permissions}/>
        </div>
      </MediaQueryProvider>
      {children}
    </div>
  );
};

export default layout;
