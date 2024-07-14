"use client"

import { caba1, desktopAdminPreview, mobileAdminPreviewIphone } from "@/lib/images";
import { IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion"
import { useRef } from "react";
import Image from "next/image";
import main from '@/lib/contents/main.json'
import services from '@/lib/contents/services'
import Link from "next/link";
import Bento from "./components/bento/Bento";
import HoverPopover from "@/components/button/HoverPopover";
import { Separator } from "@/components/ui/separator";
import AnimatedCounter from "./components/AnimatedCounter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Section from "./components/Section";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function Home() {
  const mainSection = useRef(null);
  const isMainSectionInView = useInView(mainSection, { once: true });

  return (
    <main className="flex flex-col items-center justify-between scroll-smooth">
      <article
        className="flex flex-col items-center bg-black w-full px-8 max-md:px-4"
        ref={mainSection}
      >
        <section className="items-center h-screen-main-h h-full max-w-[1000px] w-full justify-center flex">
          <div className="absolute top-0 left-0 w-full h-screen h-screen-main  select-none">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-radial-gradient opacity-60"></div>
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
                "text-white text-6xl text-center tracking-tight font-geist font-black max-md:text-5xl max-sm:text-4xl max-[425px]:text-3xl transition-all duration-500",
                isMainSectionInView
                  ? "none opacity-100"
                  : "translate-y-16 opacity-0"
              )}
            >
              {main.main.title}
            </h1>
            <p
              className={cn(
                "text-white text-2xl text-center tracking-tight max-md:text-xl max-sm:text-lg max-[425px]:text-sm transition-all duration-500",
                isMainSectionInView
                  ? "none opacity-100"
                  : "translate-y-16 opacity-0"
              )}
            >
              {main.main.description}
            </p>
            <nav
              className={cn(
                "mt-4 transition-all duration-500 delay-75",
                isMainSectionInView
                  ? "none opacity-100"
                  : "translate-y-16 opacity-0"
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
                          route.type === "button-download" && "bg-blue"
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
        <section
          className={cn(
            "items-center h-full max-w-[1000px] w-full justify-center flex z-10 transition-all duration-500 delay-75",
            isMainSectionInView
              ? "none opacity-100"
              : "translate-y-16 opacity-0"
          )}
        >
          <div className="flex flex-col gap-2 items-end max-[425px]:items-center max-[425px]:px-4">
            <Image
              width={992}
              height={644}
              src={desktopAdminPreview}
              alt="Captura del panel de administrador"
              className="w-full h-auto rounded-xl border-4 border-outline/25 max-[425px]:hidden"
            />
            <Image
              width={582}
              height={1144}
              src={mobileAdminPreviewIphone}
              alt="Captura del panel de administrador"
              className="w-dvw h-auto max-[425px]:block hidden"
            />
            <p className="text-xs text-text-grey">
              {main.mainImage.description}
            </p>
          </div>
        </section>
        <Section data={main.experience} black>
          <p className="text-white text-lg max-md:text-center">
            {main.experience.content}
          </p>
        </Section>
      </article>
      <article className="flex flex-col items-center bg-white w-full px-8 max-md:px-4">
        <section className="items-center h-full max-w-[1000px] w-full justify-center flex pt-8 max-md:pt-0">
          <div className="flex flex-col gap-8 py-16 max-md:py-12">
            <h2 className="font-geist font-bold text-3xl text-black max-md:text-center tracking-tight">
              {services.title}
            </h2>
            <Bento services={services.bento} />
          </div>
        </section>
      </article>
      <article className="flex flex-col items-center bg-grey w-full px-8 max-md:px-4">
        <section className="items-center h-full max-w-[1000px] w-full justify-center flex">
          <div className="flex flex-col gap-12 py-16 max-md:py-12 w-full items-center">
            <div className="flex flex-col gap-4 items-center">
              <div className="px-2 py-[2px] rounded-lg bg-blue w-fit text-white font-medium text-sm">
                {main.metrics.pill}
              </div>
              <h2 className="font-geist font-bold text-4xl text-black text-center tracking-tight">
                {main.metrics.title}
              </h2>
            </div>
            <div className="flex justify-center gap-3 w-full max-md:flex-col max-md:gap-4">
              {main.metrics.content.map((metric, index) => {
                return (
                  <>
                    <div className="flex flex-col gap-2 w-full items-center" key={index}>
                      <AnimatedCounter
                        plus={true}
                        from={0}
                        to={parseInt(metric.content)}
                        className={cn(
                          "text-green font-semibold text-6xl font-geist text-center"
                        )}
                      />
                      <h3 className="font-bold text-2xl text-center">
                        {metric.title}
                      </h3>
                    </div>
                    <Separator orientation="vertical" />
                  </>
                );
              })}
            </div>
          </div>
        </section>
      </article>
      <article className="flex flex-col items-center bg-white w-full px-8 max-md:px-4">
        <Section data={main.videos}>
          <Carousel>
            <CarouselContent className="gap-4 pl-4">
              {main.videos.content.map((item) => {
                return (
                  <CarouselItem
                    key={item.title}
                    className="bg-grey max-w-[400px] min-h-[200px] rounded-md flex items-center p-0 justify-center"
                  >
                    <iframe
                      width="400"
                      height="100%"
                      src="https://www.youtube.com/embed/2dpUZT9hqIQ?si=IJjKj9N7DonjorJi"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="rounded-md"
                    ></iframe>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex gap-2 w-full justify-end">
              <CarouselPrevious className="relative -top-[50%] !right-0 !bottom-0 translate-y-1/2 !left-0 bg-black-sec text-grey-text border-outline rounded-md hover:bg-black-nav hover:text-grey-text/90" />
              <CarouselNext className="relative -top-[50%] !right-0 !bottom-0 translate-y-1/2 !left-0 bg-black-sec text-grey-text border-outline rounded-md hover:bg-black-nav hover:text-grey-text/90" />
            </div>
          </Carousel>
        </Section>
        <Section data={main.faq} className="pt-0">
          <Accordion
            type="multiple"
            className="grid gap-3 grid-cols-2 w-full max-md:grid-cols-1"
          >
            {main.faq.content.map((item) => {
              return (
                <AccordionItem
                  key={item.title}
                  value={item.title}
                  className="w-full bg-grey p-3 border-0 rounded-lg"
                >
                  <AccordionTrigger className="flex justify-between p-0 hover:no-underline">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="!border-0">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </Section>
      </article>
      <article className="flex flex-col items-center bg-black w-full px-8 max-md:px-4">
        <section className="items-center h-full max-w-[1000px] w-full justify-center flex">
          <div className="flex flex-col gap-8 py-16 max-md:py-12 w-full items-center max-w-[900px] max-md:gap-4">
            <h2 className="text-white text-6xl text-center tracking-tight font-geist font-black max-md:text-5xl max-sm:text-4xl max-[425px]:text-3xl">
              {main.appInstall.title}
            </h2>
            <div className="flex gap-3 justify-center items-center">
              {main.appInstall.content.map(item => {
                return (
                  <Link
                    key={item.page.path}
                    href={item.page.path}
                    className={cn(
                      item.page.className,
                      "group px-4 py-2 rounded-md text-2xl font-medium flex items-center max-md:text-xl max-md:py-1 max-md:px-2 max-sm:text-lg"
                    )}
                    title={item.page.title}
                  >
                    {item.page.button}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
