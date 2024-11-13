"use client"

import BackButton from '@/components/Buttons/BackButton';
import Pill from '@/components/Pill';
import { useLayoutStore } from '@/store/useLayoutStore';
import { usePathsAndTitles } from './constants';
import Image from 'next/image';
import React, { FC, PropsWithChildren } from 'react'
import { useParams, usePathname } from 'next/navigation';
import { IconBell, IconMenu2, IconX } from '@tabler/icons-react';
import { useMobileMenuStore } from '@/store/useMobileMenuStore';
import MobileMenu from '@/containers/unit-page/mobile-menu';

interface MobileHeaderProps extends PropsWithChildren {}

const MobileHeader: FC<MobileHeaderProps> = ({ children }) => {
   const { hasBuilding, isInView } = useLayoutStore()
  const { isOpen, toggle, setClose } = useMobileMenuStore()
  
  const params = useParams();
  const pathname = usePathname();
  const pathsAndTitles = usePathsAndTitles();

  const currentTitle =
    pathsAndTitles.find((item) => item.paths.some((path) => pathname === path))
      ?.title || "Mis Expensas";

  const isUnitPage = params.id;

  return (
    <div className="sticky top-0 w-full px-3 py-4 bg-white dark:bg-black-app-bg z-50 md:hidden text-black dark:text-white border-b border-outline dark:border-outline-dark">
      <div className="flex justify-between items-center gap-2">
        <div className="flex gap-2 items-center">
          <BackButton />
          {hasBuilding && !isInView && params.id && (
            <div className="inline-block w-full transition-all duration-150 ease-out animate-[slideInFromTop_0.3s_ease-out_forwards]">
              <div className="flex items-center gap-2">
                <Image
                  src={hasBuilding.image}
                  alt="Imagen edificio"
                  width={22}
                  height={22}
                  className="rounded-md"
                />
                <span className="font-semibold text-lg max-[425px]:truncate max-[425px]:max-w-[150px]">
                  {hasBuilding.direction}
                </span>
                <Pill text={hasBuilding.unit} classNameText="truncate" />
              </div>
            </div>
          )}
          {isInView && params.id && (
            <span className="font-semibold text-lg">{currentTitle}</span>
          )}
          {!params.id && (
            <span className="font-semibold text-lg">{currentTitle}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <IconBell width={24} height={24} />
          {children}
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

export default MobileHeader