"use client";

import { cn } from "app/lib/utils";
import { usePathname } from "next/navigation";
import { getSidebarRoutes } from "app/hooks/permissions/useUnitPermissions";
import AddUnitDialog from "app/features/Unit/Create/AddUnitDialog";
import Button, { ButtonProps } from "app/components/Buttons/Button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "app/components/ui/tooltip";
import MediaQueryProvider from "app/contexts/MediaQueryProvider";
import React, { PropsWithChildren } from "react";

const NavButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      classNameText="text-black dark:text-white max-xl:hidden"
      buttonJustifyContent="justify-start max-xl:justify-center"
    />
  );
}

const TooltipComponent = ({ trigger, children }: { trigger: React.ReactNode } & PropsWithChildren) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent
          align="center"
          side="right"
          className={cn(
            "p-1 px-2 border-outline dark:border-outline-dark bg-white dark:bg-black-app-bg rounded-md z-[200]"
          )}
        >
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

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
        const href = item.path.startsWith("/prp")
          ? item.path
          : pathname.split("/").slice(0, 4).join("/") + item.path;

        return (
          <React.Fragment key={item.path}>
            <MediaQueryProvider minWidth={1280} key={item.path + "-1280"}>
              <NavButton title={item.description} href={href} icon={item.icon}/>
            </MediaQueryProvider>
            <MediaQueryProvider maxWidth={1280} key={item.path + "+1280"}>
              <TooltipComponent trigger={<NavButton title={item.description} href={href} icon={item.icon}/>}>
                <p className="font-medium">{item.description}</p>
              </TooltipComponent>
            </MediaQueryProvider>
          </React.Fragment>
        );
      })}
      <AddUnitDialog isSidebar={true} key={"add-unit"}/>
    </div>
  );
};

export default Sidebar;
