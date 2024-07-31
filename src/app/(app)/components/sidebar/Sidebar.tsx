"use client"

import { roles } from '@/lib/types/data.types';
import { cn } from '@/lib/utils';
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarRightCollapse, IconUserFilled } from "@tabler/icons-react";
import { userImage2 } from '@/lib/images';
import Pill from '@/components/pill/Pill';
import useSidebar from '@/lib/hooks/useSIdebar';
import React, { useEffect } from 'react'
import NavLink from './NavLink';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  type: roles;
  items: {
    top: any[];
    bottom: any[];
  };
  mainPath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ items, type, mainPath }) => {
  const { toggle, isOpen, setOpen } = useSidebar()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storage = localStorage.getItem("sidebarOpen");
      if (storage !== null) {
        setOpen(storage === "true");
      }
    }
  }, [setOpen]);


  return (
    <aside
      className={cn(
        "flex flex-col justify-between max-w-[225px] w-full bg-grey dark:bg-grey-dark text-black dark:text-white border-r border-outline dark:border-outline-dark transition-all duration-300 max-lg:max-w-[50px] max-md:hidden",
        !isOpen && "max-w-[50px]"
      )}
    >
      <div className="flex flex-col gap-2 max-lg:p-0 max-lg:mt-3">
        <div className={cn("p-2", !isOpen && "p-2")}>
          <div
            className={cn(
              "flex justify-between w-full p-2 gap-2 items-center max-lg:flex-col max-lg:p-0  border border-outline dark:border-outline-dark rounded-xl dark:bg-grey-sec-dark max-lg:bg-none",
              !isOpen && "flex-col p-0 border-0 !bg-transparent"
            )}
          >
            <div className="flex gap-3 items-center">
              <Image
                src={userImage2}
                alt="user-image"
                width={40}
                height={40}
                className="object-fill rounded-md bg-white dark:bg-grey-sec-dark border border-outline dark:border-outline-dark"
              />
              <div
                className={cn(
                  "flex flex-col gap-0 w-full max-w-[80px] max-lg:hidden",
                  !isOpen && "hidden"
                )}
              >
                <p className="truncate w-full font-medium text-sm">00ASD0A</p>
                <Pill text="4 Unidades" />
              </div>
            </div>
            <div className={cn("flex max-lg:hidden", !isOpen && "flex-col")}>
              <button
                onClick={toggle}
                className="p-2 rounded-md hover:bg-grey-sec hover:dark:bg-grey-sec-dark text-text-grey"
              >
                {isOpen ? (
                  <IconLayoutSidebarLeftCollapse width={22} height={22} />
                ) : (
                  <IconLayoutSidebarRightCollapse width={22} height={22} />
                )}
              </button>
            </div>
          </div>
        </div>
        <nav>
          <ul
            className={cn(
              "flex flex-col w-full p-2 max-lg:p-1",
              !isOpen && "p-1"
            )}
          >
            {items.top.map((item) => {
              return (
                <li className="flex w-full" key={item.url}>
                  <NavLink
                    href={item.url !== "/" ? mainPath + item.url : mainPath}
                    className={cn(
                      "max-lg:p-2 max-lg:flex-col rounded-md py-2 px-3 hover:bg-grey-sec hover:dark:bg-grey-sec-dark w-full font-medium flex items-center gap-3",
                      !isOpen && "p-2 flex-col"
                    )}
                    activeClassName="bg-grey-sec dark:bg-grey-sec-dark"
                  >
                    {item.iconoWeb}
                    <span className={cn("max-lg:hidden", !isOpen && "hidden")}>
                      {item.descripcion}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar