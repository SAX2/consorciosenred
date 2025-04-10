import { appInstall } from 'app/assets/constants/services';
import { cn } from 'app/lib/utils';
import Image from 'next/image';
import React, { FC } from 'react'
import ButtonArrow from '../buttons/button-arrow';

const SectionApps = () => {
  return (
    <section
      id="descargar"
      className={cn("w-full justify-center items-center flex bg-grey p-8 max-md:p-4")}
    >
      <div className="items-center h-full w-full justify-center flex py-16 gap-8 max-md:flex-col max-w-[1000px]">
        <div className="w-full flex flex-col gap-8">
          <h2
            className={cn(
              "font-semibold text-6xl font-geist tracking-tight leading-none max-md:text-5xl"
            )}
          >
            {appInstall.title}
          </h2>
          <ul className="flex flex-col gap-3 max-md:items-center w-full max-md:flex-row max-md:flex-wrap">
            {appInstall.content.map((route, index) => {
              return (
                <li key={route.page.path + index}>
                  <ButtonArrow
                    title={route.page.button}
                    className={route.page.className}
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
            "w-full rounded-lg max-h-[420px] max-md:max-h-[400px] relative flex justify-center overflow-clip bg-grey-sec"
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