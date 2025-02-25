"use client"

import React, { FC, PropsWithChildren, useEffect, useState } from 'react'
import BackButton from 'app/components/Buttons/BackButton';
// import { useLayoutStore } from '@/store/useLayoutStore';
import { usePathsAndTitles } from '../constants';
import { useParams, usePathname } from 'next/navigation';
import { IconBell, IconMenu2, IconX } from '@tabler/icons-react';
import { useMobileMenuStore } from '@/store/useMobileMenuStore';
import MobileMenu from 'app/features/Unit/Details/_SidebarMenuMobile';
import UserIcon from '@/components/Icons/UserIcon';
import UserDropdown from '@/components/Dropdowns/UserDropdown';
import { getUser } from '@/lib/queries/queries';

interface MobileHeaderProps extends PropsWithChildren {
  isSingleUnit: boolean;
}

const MobileHeaderComponent: FC<MobileHeaderProps> = ({ children, isSingleUnit }) => {
  //  const { hasBuilding, isInView } = useLayoutStore()
  const { isOpen, toggle, setClose } = useMobileMenuStore()
  const [user, setUser] = useState<{
    atajos: any[];
    roles: string[];
    apellido: string;
    total_unidades: number;
    nombre: string;
  } | null>(null);

  const params = useParams();
  const pathname = usePathname();
  const pathsAndTitles = usePathsAndTitles();

  const currentTitle =
    pathsAndTitles.find((item) => item.paths.some((path) => pathname === path))
      ?.title || "Mis Expensas";

  const isUnitPage = params.id;

  const isMainPath = pathname === '/prp/expensas'

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser();
      setUser(res)
    }

    if (!user) {
      fetchUser();
    }
  }, [])

  const segments = pathname.split('/').filter(Boolean);
  const showUserButton = params.id && params.id.length > 0 && isSingleUnit && segments.length <= 3

  return (
    <div className="sticky top-0 w-full px-3 py-6 bg-white dark:bg-black-app-bg z-50 md:hidden text-black dark:text-white">
      <div className="flex justify-between items-center gap-2">
        <div className="flex gap-2 items-center">
          {isMainPath || showUserButton ? (
            <UserDropdown>
              <button>
                <UserIcon color="blue" name={user?.nombre ?? "0"} dimensions='h-7 w-7' textSize='text-md' />
              </button>
            </UserDropdown>
          ) : (
            <BackButton singleUnit={isSingleUnit} />
          )}
          <span className="font-semibold text-xl">{currentTitle}</span>
        </div>
        <div className="flex items-center gap-3">
          {!isUnitPage && <IconBell width={24} height={24} />}
          {isUnitPage && (
            <button onClick={toggle}>
              {isOpen ? (
                <IconX width={24} height={24} />
              ) : (
                <IconMenu2 width={24} height={24} />
              )}
            </button>
          )}
        </div>
      </div>
      <MobileMenu isOpen={isOpen} setClose={setClose} pathname={pathname} />
    </div>
  );
}

export default MobileHeaderComponent