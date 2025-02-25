import { cn } from "app/lib/utils";
import Sidebar from "app/features/Unit/Sidebar";
import MediaQueryProvider from "app/contexts/MediaQueryProvider";
import getParams from "app/hooks/use-get-params";
import { getUnitPermissions } from "app/hooks/permissions/unit-permissions";

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
