import React from 'react'
import SectionArticle from '../../components/section';
import { appInstallAdministrador } from 'app/assets/constants/services';
import Image from 'next/image';
import Button from 'app/components/Buttons/Button';
import { IconChevronRight } from '@tabler/icons-react';

const page = () => {
  return (
    <>
      <SectionArticle sectionClassName="gap-16 max-md:flex-col py-16 text-black">
        <div className="flex flex-col gap-8 flex-1 justify-center">
          <div className="flex flex-col gap-6">
            <h1 className="leading-none text-5xl font-bold font-geist tracking-tight text-black">
              {appInstallAdministrador.title}
            </h1>
            <p className="text-xl font-medium text-black/75">
              {appInstallAdministrador.description}
            </p>
          </div>
          <div className="flex gap-3">
            {appInstallAdministrador.links.map((link, index) => {
              return (
                <a href={link.url} className="inline-block" target="_blank">
                  <img
                    src={link.badge}
                    alt={link.title}
                    className="w-auto h-[50px] object-contain align-middle"
                  />
                </a>
              );
            })}
          </div>
        </div>
        <div className="flex-1  flex items-center">
          <div
            className={
              "bg-grey w-full rounded-lg max-h-[420px] max-md:max-h-[400px] relative flex justify-center overflow-clip"
            }
          >
            <Image
              width={291}
              height={604}
              src={appInstallAdministrador.Image}
              alt={appInstallAdministrador.title}
              className="h-fit pt-8 relative"
            />
          </div>
        </div>
      </SectionArticle>
    </>
  );
}

export default page