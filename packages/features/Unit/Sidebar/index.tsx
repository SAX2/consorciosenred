"use client";

import { cn } from "app/lib/utils";
import { usePathname } from "next/navigation";
import NavLinkButton from "app/components/Buttons/ButtonNavLink";
import { getSidebarRoutes } from "app/hooks/permissions/useUnitPermissions";
import AddUnitDialog from "app/features/Unit/Create/AddUnitDialog";

const Sidebar = ({ permissions }: { permissions: any }) => {
  const pathname = usePathname();

  const sidebar = getSidebarRoutes(permissions)

  return (
    <div
      className={cn(
        "sticky top-8", // Sticky sidebar
        "flex flex-col gap-[6px] max-w-[275px] w-full max-xl:max-w-fit",
        "max-md:hidden"
      )}
    >
      {sidebar.map((item) => {
        return (
          <NavLinkButton
            href={
              item.url.startsWith("/prp")
                ? item.url
                : pathname.split("/").slice(0, 4).join("/") + item.url
            }
            className={
              "max-xl:p-2 max-xl:flex-col rounded-md py-[6px] px-3 bg-grey dark:bg-grey-dark hover:bg-grey-sec hover:dark:bg-grey-sec-dark w-full font-medium flex items-center gap-3"
            }
            activeClassName="bg-grey-sec dark:bg-grey-sec-dark"
            key={item.url}
            title={item.titulo}
          >
            {item.iconoWeb}
            <span className={"max-xl:hidden"}>{item.descripcion}</span>
          </NavLinkButton>
        );
      })}
      <AddUnitDialog />
    </div>
  );
};

export default Sidebar;
