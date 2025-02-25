import { appInstall } from 'app/assets/constants/services';
import { cn } from 'app/lib/utils';
import Image from 'next/image';
import React, { FC } from 'react'
import ButtonArrow from '../buttons/button-arrow';

interface SectionAppsProps {
  isLightMode?: boolean;
}

const SectionApps: FC<SectionAppsProps> = ({ isLightMode = false }) => {
  return (
    <section
      id='descargar'
      className={cn(
        isLightMode && "bg-grey",
        "w-full justify-center items-center flex p-4"
      )}
    >
      <div className="items-center h-full w-full justify-center flex py-16 gap-8 max-md:flex-col max-w-[1000px]">
        <div className="w-full flex flex-col gap-8 max-md:max-w-[340px]">
          <h2
            className={cn(
              isLightMode ? "text-black" : "text-white",
              "font-semibold text-6xl max-md:text-4xl max-md:text-center"
            )}
          >
            {appInstall.title}
          </h2>
          <ul className="flex flex-col gap-1 max-md:items-center w-full">
            {appInstall.content.map((route, index) => {
              return (
                <li key={route.page.path + index}>
                  <ButtonArrow
                    title={route.page.button}
                    className={isLightMode ? route.page.classNameDark ?? route.page.className : route.page.className}
                    href={route.page.path}
                    textSize="text-xl"
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={cn(
            isLightMode ? "bg-grey-sec" : "bg-black-app-bg",
            "w-full rounded-lg max-h-[420px] max-md:max-h-[400px] relative flex justify-center overflow-clip"
          )}
        >
          <Image
            width={291}
            height={604}
            src={appInstall.image}
            alt={appInstall.title}
            className="h-fit pt-8 relative"
          />
        </div>
      </div>
    </section>
  );
}

export default SectionApps