"use client"

import { logoBackgroundWhite } from '@/lib/images'
import { useMotionValueEvent, useScroll, useInView } from "framer-motion"
import { cn } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState, useRef } from 'react'
import navigation from '@/lib/contents/nav.json'
import Burger from './Burger';

const Navbar = () => {
  const header = useRef(null)
  const isHeaderInView = useInView(header, { once: true })
  const { scrollY } = useScroll()
  const [scroll, setScroll] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScroll(latest)
  })

  let scrollTo = 250;
  let isScrolled = scroll > scrollTo;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      ref={header}
      className={cn(
        "w-full flex justify-center sticky top-0 px-8 max-md:px-4 z-20 transition-all duration-300",
        scroll > scrollTo && "bg-black",
        isHeaderInView ? "opacity-100" : "opacity-0",
        isMenuOpen && "bg-black"
      )}
    >
      <nav
        className={cn(
          "max-w-[1000px] w-full py-8 max-md:py-4 flex justify-between gap-3"
        )}
      >
        <ul>
          <li>
            <Link
              href={"/"}
              className="flex items-center gap-2 transition-transform"
            >
              <Image
                src={logoBackgroundWhite}
                alt="Logo"
                width={40}
                height={40}
                className="w-[40px] max-md:w-[36px]"
              />
              <span
                className={cn(
                  "text-white italic font-bold text-lg max-md:!block",
                  scroll > scrollTo && "hidden"
                )}
              >
                Consorcios<span className="text-green">en</span>red
              </span>
            </Link>
          </li>
        </ul>
        <div className="max-md:flex hidden items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none w-6 h-2 relative"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <Burger isMenuOpen={isMenuOpen} />
          </button>
        </div>
        <div
          className={cn(
            "flex items-center gap-3 max-md:flex-col max-md:items-start z-50 max-md:gap-8",
            scroll > scrollTo && "w-full justify-between max-md:!justify-start",
            "max-md:absolute max-md:top-full max-md:left-0 max-md:w-full max-md:bg-black max-md:p-8 max-md:transition-all max-md:duration-300 max-md:ease-in-out max-md:h-dvh",
            isMenuOpen
              ? "max-md:opacity-100 max-md:translate-y-0 "
              : "max-md:opacity-0 max-md:translate-y-[-20px] max-md:pointer-events-none"
          )}
        >
          <ul
            className={cn(
              "text-white flex items-center gap-3 font-medium max-md:flex-col max-md:items-start max-md:text-4xl max-md:gap-8"
            )}
          >
            {navigation.routes.map((route) => {
              if (route.type === "link")
                return (
                  <li key={route.path}>
                    <Link href={route.path}>{route.title}</Link>
                  </li>
                );
              return null;
            })}
          </ul>
          {(isScrolled || isMenuOpen) && (
            <ul
              className={cn(
                "hidden items-center gap-3 font-medium text-white text-lg max-md:flex max-md:items-start max-md:text-4xl max-md:gap-8 max-md:w-full max-md:flex-col-reverse",
                isScrolled && "flex"
              )}
            >
              {navigation.routes.map((route) => {
                if (route.type === "button-download")
                  return (
                    <li key={route.path} className="max-md:w-full">
                      <Link
                        href={route.path}
                        className="border border-white rounded-sm px-2 py-1 max-md:bg-white max-md:text-black max-md:flex max-md:justify-center"
                      >
                        {route.title}
                      </Link>
                    </li>
                  );
                if (route.type === "button-ingress")
                  return (
                    <li key={route.path} className="max-md:w-full">
                      <Link
                        href={route.path}
                        className="text-black bg-white rounded-sm px-2 py-1 border border-white max-md:bg-transparent max-md:text-white max-md:flex max-md:justify-center "
                      >
                        {route.title}
                      </Link>
                    </li>
                  );
                return null;
              })}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar