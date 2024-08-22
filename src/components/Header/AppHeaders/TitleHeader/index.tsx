"use client"

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import BackButton from '@/components/Buttons/BackButton';
import { getPathsAndTitles } from '../MobileHeader/constants';

interface TitleHeaderProps {}

const TitleHeader: FC<TitleHeaderProps> = () => {
  const pathname = usePathname()
  const pathsAndTitles = getPathsAndTitles()

  const currentTitle =
    pathsAndTitles.find((item) => item.paths.some((path) => pathname === path))
      ?.title || "Mis Expensas";


  return (
    <div className="w-full flex gap-3 items-center max-w-[1440px] max-md:hidden px-8 pt-8 max-md:p-0">
      <BackButton />
      <h1 className="text-black dark:text-white font-semibold text-2xl">
        {currentTitle}
      </h1>
    </div>
  );
};

export default TitleHeader;