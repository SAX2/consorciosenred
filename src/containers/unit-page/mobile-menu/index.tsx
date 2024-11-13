import NavLinkButton from '@/components/Buttons/NavLinkButton';
import { sidebarMobile } from '@/components/Navbar/AppNavbars/UnitSidebar/content';
import { cn } from '@/lib/utils';
import React, { FC } from 'react'

interface MobileMenuProps {
  pathname: string;
  isOpen: boolean;
  setClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, setClose, pathname }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 bg-white dark:bg-black-app-bg overflow-y-auto h-[calc(100dvh-60px)]",
        "max-md:absolute max-md:top-full max-md:left-0 max-md:w-full max-md:p-8 max-md:transition-all max-md:duration-300 max-md:ease-in-out max-md:flex-col max-md:items-start z-50 max-md:gap-4",
        isOpen
          ? "max-md:opacity-100 max-md:translate-y-0"
          : "max-md:opacity-0 max-md:translate-y-[-20px] max-md:pointer-events-none"
      )}
    >
      {sidebarMobile.map((item) => {
        return (
          <NavLinkButton
            key={item.titulo}
            onClick={setClose}
            href={
              item.url.startsWith("/prp")
                ? item.url
                : pathname.split("/").slice(0, 4).join("/") + item.url
            }
            title={item.titulo}
            className="font-medium text-2xl px-4 py-3 rounded-xl bg-grey w-full flex items-center gap-3 border border-transparent dark:bg-grey-dark"
            activeClassName="border-outline dark:border-outline-dark"
          >
            <span>{item.iconoWeb}</span>
            <span>{item.descripcion}</span>
          </NavLinkButton>
        );
      })}
    </div>
  );
}

export default MobileMenu