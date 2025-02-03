"use client"

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import BackButton from '@/components/Buttons/BackButton';
import { usePathsAndTitles } from "../MobileHeader/constants";
import { cn } from '@/lib/utils';
import Button from '@/components/Buttons/Button';
import Link from 'next/link';

interface HeaderProps {
  isSingleUnit: boolean;
}

const HeaderComponent: FC<HeaderProps> = ({ isSingleUnit }) => {
  const pathname = usePathname()
  const pathsAndTitles = usePathsAndTitles();


  const currentPath = pathsAndTitles.find((item) =>
    item.paths.some((path) => pathname === path)
  );

  const rightContent = currentPath?.rightContent;
  const isSubroute = currentPath?.isSubroute && currentPath?.backPaths;
  const subRoutes = currentPath?.backPaths && [...currentPath?.backPaths, { path: pathname, title: currentPath.title }]

  return (
    <div
      className={cn(
        "w-full flex gap-3 items-center max-w-[1440px] max-md:hidden px-8 pt-8 max-md:p-0",
        rightContent && "justify-between"
      )}
    >
      <div className="flex gap-2 items-center flex-row">
        <BackButton singleUnit={isSingleUnit} />
        {!isSubroute && (
          <h1 className="text-black dark:text-white font-semibold text-2xl">
            {currentPath?.title}
          </h1>
        )}
        {isSubroute && subRoutes?.map((item, index) => {
          const isPage = index === subRoutes.length - 1 

          if (isPage) {
            return <h1 className="text-black dark:text-white font-semibold text-2xl">{item.title}</h1>
          }

          return (
            <>
              <Link
                className="text-text-grey dark:text-text-grey font-medium text-2xl"
                href={item.path}
              >
                {item.title}
              </Link>
              <span className='text-text-grey dark:text-text-grey font-medium text-2xl'>/</span>
            </>
          );
        })}
      </div>
      {rightContent && (
        <>
          {rightContent.isButton && <Button {...rightContent.button} />}
          {rightContent.component && rightContent.component}
        </>
      )}
    </div>
  );
};

export default HeaderComponent