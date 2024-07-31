"use client"

import React from 'react';
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { IconChevronLeft } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { getPathsAndTitles } from '@/lib/contents/(app)/pathTitles';

// Las rutas donde no se debe permitir retroceder
const NO_BACK_ROUTES = ['/prp/expensas', '/', '/ingresar'];

interface MainTitleProps {
  title?: string;
}

interface BackButtonProps {
  className?: string;
  icon?: {
    width: number;
    height: number;
  }
}

export const BackButton = ({ className, icon }: BackButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()

  const isUniqueUnit = searchParams.get("unique")

  const onClick = () => {
    if (!NO_BACK_ROUTES.includes(pathname)) {
      router.back();
    }
  };

  const showBackButton = !NO_BACK_ROUTES.includes(pathname);

  if (isUniqueUnit) return null;

  return showBackButton && (
    <button onClick={onClick} className={cn('flex items-center', className)}>
      <IconChevronLeft height={icon?.height} width={icon?.width}/>
    </button>
  )
}

const MainTitle: React.FC<MainTitleProps> = () => {

  const pathname = usePathname()
  const pathsAndTitles = getPathsAndTitles()

  const currentTitle = pathsAndTitles.find(item => 
    item.paths.some(path => pathname === path)
  )?.title || "Mis Expensas"


  return (
    <div className="w-full flex gap-3 items-center max-w-[1440px] max-md:hidden px-8 pt-8 max-md:p-0">
      <BackButton icon={{ height: 24, width: 24 }} />
      <h1 className="text-black dark:text-white font-semibold text-2xl">
        {currentTitle}
      </h1>
    </div>
  );
};

export default MainTitle;