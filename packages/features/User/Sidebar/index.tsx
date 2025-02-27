"use client";

import { cn } from "app/lib/utils";
import Button from "app/components/Buttons/Button";
import { sidebar } from "./content";
import { IconLogout, IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import { logoutHandler } from "app/services/auth";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const SidebarUserLayout = () => {
  const { theme, setTheme, themes} = useTheme()

  const IconTheme = theme === "dark" ? IconSunFilled : IconMoonFilled;
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "sticky top-8",
        "flex flex-col gap-[6px] max-w-[275px] w-full max-xl:max-w-fit"
      )}
    >
      {sidebar.map((item) => {
        return (
          <Button
            {...item}
            buttonBackground={cn(pathname === item.href && "bg-grey/65 dark:bg-grey-dark/65")}
            buttonJustifyContent="justify-start"
            classNameContainer="border border-outline dark:border-outline-dark"
            classNameText="text-black dark:text-white max-xl:hidden"
            key={item.title}
          />
        );
      })}
      <Button
        classNameText="text-black dark:text-white max-xl:hidden"
        title={`Cambiar a modo ${theme === "dark" ? "claro" : "obscuro"}`}
        icon={<IconTheme size={22} />}
        onClick={() => setTheme(() => themes.filter((t) => t != theme)[0])}
        key={"theme"}
      />
      <Button
        title="Cerrar sesión"
        buttonBackground="bg-red dark:bg-red-dark"
        classNameText="text-white max-xl:hidden"
        icon={<IconLogout size={22} className="text-white" />}
        onClick={logoutHandler}
        key={"logout"}
      />
    </div>
  );
};

export default SidebarUserLayout;
