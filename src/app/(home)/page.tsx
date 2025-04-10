"use client"

import services from 'app/assets/constants/services'
import { Separator } from "app/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "app/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem } from "app/components/ui/carousel";
import { desktopAdminPreview } from "app/assets/images";
import { IconChevronRight, IconEyeFilled } from "@tabler/icons-react";
import { cn } from "app/lib/utils";
import Image from "next/image";
import main from 'app/assets/constants//main.json'
import Link from "next/link";
import HoverPopover from "@/app/(home)/components/HoverPopover";
import Section from "./components/hero-sections/Section";
import Service from "./components/hero-sections/Services";
import NewsCard from "./components/card/NewsCard";
import Main from './components/Main';
import React from 'react';
import ButtonArrow from './components/buttons/button-arrow';
import Button from 'app/components/Buttons/Button';
import SectionApps from './components/hero-sections/SectionApps';

const SectionMetrics = () => {
  return (
    <article className="flex flex-col items-center bg-grey w-full px-8 max-md:px-4">
      <section className="items-center h-full max-w-[1000px] w-full justify-center flex">
        <div className="flex flex-col gap-12 py-16 max-md:py-12 w-full">
          <div className="flex flex-col gap-6">
            <div className="p-2 rounded-lg bg-blue-button/10 flex w-fit">
              <p className="font-semibold text-2xl text-blue-button leading-none">
                {main.metrics.pill}
              </p>
            </div>
            <h3 className="leading-none text-5xl font-bold font-geist tracking-tight">
              {main.metrics.title}
            </h3>
            <p className='text-xl font-medium text-black/75'>{main.metrics.description}</p>
          </div>
          <div className='border-t border-outline flex flex-row max-md:flex-col max-md:gap-8 max-md:border-none'>
            {main.metrics.content.map((metric, index: number) => {
              return (
                <React.Fragment key={metric.content + index}>
                  <div className="flex flex-col gap-3 w-full items-center flex-1 py-8 max-md:py-0 max-md:items-start px-3 max-md:pl-8 max-md:border-l-4 border-blue-button/10">
                    <p className="text-6xl max-md:text-7xl font-bold font-geist tracking-tighter bg-gradient-to-t from-[#086FB7] to-[#008AEA] inline-block text-transparent bg-clip-text leading-none text-center">
                      {metric.content}
                    </p>
                    <h2 className="font-semibold text-2xl text-center text-text-grey max-md:text-start">
                      {metric.title}
                    </h2>
                  </div>
                  {main.metrics.content.length - 1 !== index && (
                    <div className="py-8 max-md:hidden">
                      <Separator orientation="vertical" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>
    </article>
  );
}

const ServicesSection = () => {
  return (
    <article className="flex flex-col items-center bg-white w-full px-8 max-md:px-4">
      {services.map((service, index) => {
        return (
          <React.Fragment key={service.title}>
            <Service service={service} />
            <div className="max-w-[1000px] w-full py-8">
              {index + 1 !== services.length && <Separator />}
            </div>
          </React.Fragment>
        );
      })}
      <div
        className={cn(
          "p-8 max-md:p-4 bg-grey rounded-xl mb-16 w-full max-w-[1000px] flex flex-row gap-4 items-center",
          "max-md:flex-col max-md:items-start"
        )}
      >
        <p className="flex-1 font-semibold font-geist leading-none tracking-tight text-4xl text-black/75">
          Instalá la app y empezá a gestionar más fácil hoy
        </p>
        <Button
          title="Conoce mas instalando la App"
          buttonBackground="bg-[#32A071] border border-green/25"
          classNameText="text-white !font-medium"
          textSize="text-2xl max-md:text-xl"
          classNameContainer="group max-md:w-full"
          buttonPadding="p-2 px-4 max-md:p-2"
          iconOrientation="right"
        />
      </div>
    </article>
  );
}

const MainSection = () => {
  return (
    <section className="max-w-[1000px] w-full justify-start flex flex-row py-8">
      <div className='lg:w-[70%] flex flex-col gap-4'>
        <div className="flex flex-col gap-3">
          <div className="p-2 rounded-lg bg-grey flex w-fit max-md:py-0 max-md:rounded-md">
            <p className="font-semibold text-xl max-md:text-lg text-text-grey leading-none">
              {main.main.pill}
            </p>
          </div>
          <h2 className="leading-none text-5xl font-semibold font-geist tracking-tight">
            {main.main.title}
          </h2>
          <p className="leading-none text-xl font-medium text-black/75">{main.main.description}</p>
        </div>
        <ul className="flex gap-3 items-center max-md:flex-col max-md:items-start w-full mt-4">
          {main.main.content.map((route) => {
            return (
              <li key={route.path} className="max-md:w-full">
                <Link
                  href={route.path}
                  className={cn(
                    "group px-4 py-2 rounded-md text-2xl font-semibold flex items-center",
                    "max-md:text-lg max-md:p-2 max-md:py-1 max-md:justify-center",
                    route.className
                  )}
                >
                  {route.title}
                  {route.type === "button-ingress" && (
                    <HoverPopover className="!ml-1 duration-150 !mr-0 max-sm:hidden">
                      <IconChevronRight size={32} />
                    </HoverPopover>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='flex-1 max-md:hidden'></div>
    </section>
  );
}

const ProductImageSection = () => {
  return (
    <section
      className={cn(
        "items-center h-full max-w-[1000px] w-full justify-center flex z-10 transition-all duration-500 delay-75 animate-fade-in-up"
      )}
    >
      <div className="flex flex-col gap-2 items-start">
        <Image
          width={992}
          height={644}
          src={desktopAdminPreview}
          alt="Captura del panel de administrador"
          className="w-dvh h-auto rounded-xl border-2 border-outline/25" 
        />
        <div className='flex flex-row items-center gap-1'>
          <IconEyeFilled size={14} className='text-text-grey'/>
          <p className="text-xs font-medium text-text-grey">{main.mainImage.description}</p>
        </div>
      </div>
    </section>
  );
}

const BlogSection = () => {
  return (
    <Section data={main.news}>
      <Carousel>
        <CarouselContent className="gap-11 max-md:gap-4">
          {main.news.content.map((item, index) => {
            return (
              <CarouselItem
                key={item.title}
                className={cn(
                  "h-fit max-w-[480px] w-full",
                  index === 1 && "!pl-0"
                )}
              >
                <NewsCard content={item} mainPath="/noticias" />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </Section>
  );
}

const FaQSection = () => {
  return (
    <section className="h-full max-w-[1000px] w-full justify-center flex flex-col py-8 max-md:py-8 gap-12 max-md:flex-col">
      <div className="w-[70%] max-md:w-full">
        <h2 className="font-semibold font-geist text-3xl leading-tight tracking-tight">
          {main.faq.title}
        </h2>
      </div>
      <div className="w-full flex flex-col gap-8">
        <Accordion
          type="multiple"
          className="grid grid-cols-2 gap-8 max-md:grid-cols-1"
        >
          {main.faq.content.map((item) => {
            return (
              <AccordionItem
                key={item.title}
                value={item.title}
                className="p-3"
              >
                <AccordionTrigger className="flex justify-between p-0 hover:no-underline [&>svg]:text-blue-button text-lg gap-4 text-start">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="!border-0 text-lg font-normal pt-4 leading-snug text-black/75">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        <ButtonArrow
          href={main.faq.page?.path}
          title={main.faq?.page.title}
          className="hover:bg-blue-button/15 text-blue-button"
        />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Main>
      <article className="flex flex-col items-center bg-white w-full px-8 max-md:px-4">
        <MainSection />
        <ProductImageSection />
        <Section data={main.experience}>
          <p className="text-black text-lg">{main.experience.content}</p>
        </Section>
      </article>
      <ServicesSection />
      <SectionMetrics />
      <article className="flex flex-col items-center bg-white w-full px-8 max-md:px-4">
        {/* <BlogSection /> */}
        <FaQSection />
      </article>
      <article className='w-full bg-grey'>
        <SectionApps />
      </article>
    </Main>
  );
}
