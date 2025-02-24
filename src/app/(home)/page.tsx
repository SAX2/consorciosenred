"use client"

import services, { appInstall } from '@/lib/contents/services'
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { caba1, desktopAdminPreview, mobileUnit } from "@/lib/images";
import { IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import main from '@/lib/contents/main.json'
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
            <Service
              service={service}
              className={cn(
                (index + 1) % 2 == 0 ? "flex-row-reverse" : "flex-row"
              )}
            />
            <div className="max-w-[1000px] w-full py-8">
              {index + 1 !== services.length && <Separator />}
            </div>
          </React.Fragment>
        );
      })}
      <Button
        title="Conoce mas instalando la App"
        buttonBackground="bg-[#32A071] border border-green/25"
        classNameText="text-white !font-medium"
        textSize="text-2xl max-md:text-lg"
        classNameContainer="mb-16 group"
        buttonPadding="p-2 px-4 pr-3 max-md:py-1 max-md:px-3 max-md:pr-1"
        icon={
          <>
            <HoverPopover className="!ml-1 duration-150 !mr-0 max-md:hidden">
              <IconChevronRight size={32} className="text-white" strokeWidth={3} />
            </HoverPopover>
            <div className="hidden max-md:block">
              <IconChevronRight size={26} className="text-white" />
            </div>
          </>
        }
        iconOrientation="right"
      />
    </article>
  );
}

const MainSection = () => {
  return (
    <section className="items-center h-screen-main-h h-full max-w-[1000px] w-full justify-center flex max-sm:items-end max-sm:pb-28">
      <div className="absolute top-0 left-0 w-full h-screen h-screen-main  select-none">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-radial-gradient"></div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-linear"></div>
        <Image
          src={caba1}
          alt=""
          className="w-full h-screen-main h-full object-cover"
          width={1920}
          height={1080}
          priority
        />
      </div>
      <div className="z-10 relative w-full max-w-[655px] flex flex-col gap-2 max-md:max-w-[500px]">
        <h1
          className={cn(
            "text-white text-6xl text-center tracking-tight font-geist font-black max-md:text-5xl max-sm:text-4xl max-[425px]:text-3xl transition-all duration-500 animate-fade-in-up"
          )}
        >
          {main.main.title}
        </h1>
        <p
          className={cn(
            "text-white text-2xl text-center tracking-tight max-md:text-xl max-sm:text-lg max-[425px]:text-sm max-[425px]:leading-snug transition-all duration-500 animate-fade-in-up delay-75"
          )}
        >
          {main.main.description}
        </p>
        <nav
          className={cn(
            "mt-4 transition-all duration-500 delay-100 animate-fade-in-up"
          )}
        >
          <ul className="flex gap-3 justify-center items-center">
            {main.main.content.map((route) => {
              return (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    className={cn(
                      "group px-4 py-2 text-white rounded-md text-2xl font-medium flex items-center max-md:text-xl max-md:py-1 max-md:px-2 max-sm:text-lg",
                      route.type === "button-ingress" &&
                        "bg-white/15 backdrop-blur-md",
                      route.type === "button-download" && "bg-blue-button"
                    )}
                  >
                    {route.title}
                    {route.type === "button-ingress" && (
                      <HoverPopover className="!ml-1 duration-150 !mr-0 max-sm:hidden">
                        <IconChevronRight width={32} height={32} />
                      </HoverPopover>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
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
      <div className="flex flex-col gap-2 items-end max-[425px]:items-center max-[425px]:px-4">
        <Image
          width={992}
          height={644}
          src={desktopAdminPreview}
          alt="Captura del panel de administrador"
          className="w-dvh h-auto rounded-xl border-4 border-outline/25 max-[425px]:hidden"
        />
        <Image
          width={582}
          height={1144}
          src={mobileUnit}
          alt="Captura del panel de administrador"
          className="w-dvw h-auto max-[425px]:block hidden"
        />
        <p className="text-xs text-text-grey">{main.mainImage.description}</p>
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
      <article className="flex flex-col items-center bg-black w-full px-8 max-md:px-4">
        <MainSection />
        <ProductImageSection />
        <Section data={main.experience} black>
          <p className="text-white text-lg">{main.experience.content}</p>
        </Section>
      </article>
      <ServicesSection />
      <SectionMetrics />
      <article className="flex flex-col items-center bg-white w-full px-8 max-md:px-4">
        <BlogSection />
        <FaQSection />
      </article>
      <article className="flex flex-col items-center bg-black w-full px-8 max-md:px-4">
        <SectionApps />
      </article>
    </Main>
  );
}
