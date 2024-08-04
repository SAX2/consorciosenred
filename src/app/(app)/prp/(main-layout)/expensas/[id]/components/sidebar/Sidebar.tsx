"use client";

import NewUnitKeyDialog from "@/app/(app)/components/dialogs/NewUnitKeyDialog";
import NavLink from "@/app/(app)/components/sidebar/NavLink";
import { sidebar } from "@/lib/contents/(app)/sidebar";
import useSidebar from "@/lib/hooks/useSIdebar";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const { isOpen, setOpen } = useSidebar()

  return (
    <div
      className={cn(
        "flex flex-col gap-[6px] max-w-[275px] w-full max-xl:max-w-fit",
        "max-md:hidden max-md:max-w-full max-md:absolute max-md:top-16 max-md:left-0 max-md:p-4 max-md:h-full max-md:bg-white max-md:dark:bg-black-app-bg max-md:z-20 max-md:overflow-y-hidden",
        isOpen ? "flex max-md:flex" : "hidden md:flex",
      )}
    >
      {sidebar.top.map((item) => {
        return (
          <NavLink
            href={
              item.url.startsWith("/prp")
                ? item.url
                : pathname.split("/").slice(0, 4).join("/") + item.url 
            }
            className={
              "max-xl:p-2 max-xl:flex-col max-md:flex-row max-md:justify-center rounded-md py-[6px] px-3 bg-grey dark:bg-grey-dark hover:bg-grey-sec hover:dark:bg-grey-sec-dark w-full font-medium flex items-center gap-3"
            }
            activeClassName="bg-grey-sec dark:bg-grey-sec-dark"
            key={item.url}
            title={item.titulo}
          >
            {item.iconoWeb}
            <span className={"max-xl:hidden max-md:block"}>
              {item.descripcion}
            </span>
          </NavLink>
        );
      })}
      <NewUnitKeyDialog
        className="w-full justify-center py-[6px]"
        classSpan="max-xl:hidden max-md:block"
      />
    </div>
  );
};

export default Sidebar;
