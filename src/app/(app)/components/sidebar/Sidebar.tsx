"use client"

import Pill from '@/components/pill/Pill';
import useSidebar from '@/lib/hooks/useSIdebar';
import { userImage } from '@/lib/images';
import { roles } from '@/lib/types/data.types';
import { cn } from '@/lib/utils';
import { IconDots, IconLayoutSidebarLeftCollapse, IconLayoutSidebarRightCollapse } from "@tabler/icons-react";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react'

interface SidebarProps {
  type: roles;
  items: {
    top: any[];
    bottom: any[];
  };
  mainPath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ items, type }) => {
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
        !isOpen && "max-w-[50px] max-lg:max-w-[50px]"
      )}
    >
      <div className="flex flex-col gap-">
        <div className={cn("p-2", !isOpen && "p-2 mt-3")}>
          <div
            className={cn(
              "flex justify-between w-full p-3 gap-2 items-center",
              !isOpen && "flex-col p-0"
            )}
          >
            <div className="flex gap-3 items-center">
              <Image
                src={userImage}
                alt="user-image"
                width={40}
                height={40}
                className="object-fill rounded-md bg-white dark:bg-grey-sec-dark border border-outline dark:border-outline-dark"
              />
              <div
                className={cn(
                  "flex flex-col gap-1 w-full max-w-[80px]",
                  !isOpen && "hidden"
                )}
              >
                <p className="truncate w-full font-medium">00ASD0A</p>
                <Pill text="4 Unidades" />
              </div>
            </div>
            <div className={cn("flex", !isOpen && "flex-col")}>
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
          <ul className={cn("flex flex-col w-full p-2", !isOpen && "p-1")}>
            {items.top.map((item) => {
              return (
                <li className="flex w-full" key={item.url}>
                  <Link
                    href={item.url}
                    className={cn(
                      "rounded-md py-2 px-3 hover:bg-grey-sec hover:dark:bg-grey-sec-dark w-full font-medium flex items-center gap-3",
                      !isOpen && "p-2 flex-col"
                    )}
                  >
                    {item.iconoWeb}
                    <span className={cn(!isOpen && "hidden")}>
                      {item.descripcion}
                    </span>
                  </Link>
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