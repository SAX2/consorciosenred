import NavLinkButton from 'app/components/Buttons/ButtonNavLink';
import NewUnitDialog from '@/components/Dialogs/NewUnit';
import getParams from '@/env/getParams';
import { cn } from '@/lib/utils';
import { getUnitPermissions } from '@/store/permissions/unit-permissions';
import { getSidebarRoutes } from '@/store/permissions/useUnitPermissions';
import { useParams } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'

interface MobileMenuProps {
  pathname: string;
  isOpen: boolean;
  setClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, setClose, pathname }) => {
  const params = useParams()
  const unitId = getParams({ params: params.id as string, type: "id" })
  const [permissions, setPermissions] = useState<any | null>(null)
  
  useEffect(() => {
    const getPermissions = async () => {
      const data = await getUnitPermissions(unitId)
      if (data) {
        setPermissions(data)
      }
    }
    
    getPermissions();
  }, [unitId])

  const sidebarMobile = getSidebarRoutes(permissions, 28)

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
      {sidebarMobile.length > 0 && sidebarMobile.map((item) => {
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
      <NewUnitDialog />
    </div>
  );
}

export default MobileMenu