import { appInstall } from '@/lib/contents/services';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { FC } from 'react'
import ButtonArrow from '../buttons/button-arrow';

interface SectionAppsProps {
  isLightMode?: boolean;
}

const SectionApps: FC<SectionAppsProps> = ({ isLightMode = false }) => {
  return (
    <section className="items-center h-full max-w-[1000px] w-full justify-center flex py-16 gap-8 max-md:flex-col">
      <div className="w-full flex flex-col gap-8 max-md:max-w-[340px]">
        <h2 className={cn(isLightMode ? "text-black" : "text-white","font-semibold text-6xl max-md:text-4xl max-md:text-center")}>
          {appInstall.title}
        </h2>
        <ul className="flex flex-col gap-1 max-md:items-center w-full">
          {appInstall.content.map((route, index) => {
            return (
              <li key={route.page.path + index}>
                <ButtonArrow
                  title={route.page.button}
                  className={route.page.className}
                  href={route.page.path}
                  textSize='text-xl'
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-full bg-black-app-bg rounded-lg max-h-[420px] max-md:max-h-[400px] relative flex justify-center overflow-clip">
        <Image
          width={291}
          height={604}
          src={appInstall.image}
          alt={appInstall.title}
          className="h-fit pt-8 relative"
        />
      </div>
    </section>
  );
}

export default SectionApps