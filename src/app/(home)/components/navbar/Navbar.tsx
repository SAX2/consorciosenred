"use client"

import { logoBackgroundWhite } from 'app/assets/images'
import { useMotionValueEvent, useScroll, useInView } from "framer-motion"
import { cn } from 'app/lib/utils';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState, useRef } from 'react'
import navigation from 'app/assets/constants//nav.json'
import { usePathname } from 'next/navigation';
import Burger from 'app/components/Icons/IconBurger';

const Navbar = () => {
  const pathname = usePathname();
  const header = useRef(null)
  const { scrollY } = useScroll()
  const [scroll, setScroll] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isMain = pathname === '/'; 

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
        "w-full flex justify-center sticky top-0 px-8 max-md:px-4 z-20 transition-all duration-300 animate-appear bg-white",
        isMenuOpen && "bg-black"
      )}
    >
      <nav
        className={cn(
          "max-w-[1000px] w-full py-8 max-md:py-4 flex justify-between gap-3"
        )}
      >
        <Link
          href={"/"}
          aria-label="Consorcios en red logo"
          className="flex items-center gap-[6px] transition-transform"
        >
          <Image src={logoBackgroundWhite} alt="Logo" width={26} height={26} />
          <span
            className={cn(
              "text-blue italic font-extrabold text-xl max-md:!block",
              isScrolled && "hidden",
              !isMain && "hidden"
            )}
          >
            Consorcios<span className="text-green">en</span>red
          </span>
        </Link>
        <div className="max-md:flex hidden items-center">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none w-6 h-2 relative"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <Burger isMenuOpen={isMenuOpen} />
          </button>
        </div>
        <div
          className={cn(
            "flex items-center gap-3 max-md:flex-col max-md:items-start z-50 max-md:gap-8",
            isScrolled && "w-full justify-between max-md:!justify-start",
            !isMain && "w-full justify-between max-md:!justify-start",
            "max-md:absolute max-md:top-full max-md:left-0 max-md:w-full max-md:bg-black max-md:p-8 max-md:transition-all max-md:duration-300 max-md:ease-in-out max-md:h-dvh",
            isMenuOpen
              ? "max-md:opacity-100 max-md:translate-y-0 "
              : "max-md:opacity-0 max-md:translate-y-[-20px] max-md:pointer-events-none"
          )}
        >
          <ul
            className={cn(
              "text-black flex items-center gap-3 font-medium max-md:flex-col max-md:items-start max-md:text-4xl max-md:gap-8",
              isMenuOpen && "text-white"
            )}
          >
            {navigation.routes.map((route) => {
              if (route.type === "link")
                return (
                  <li key={route.path} onClick={() => setIsMenuOpen(false)}>
                    <Link href={route.path}>{route.title}</Link>
                  </li>
                );
              return null;
            })}
          </ul>
          {(isScrolled || isMenuOpen || !isMain) && (
            <ul
              className={cn(
                "hidden items-center gap-3 font-medium text-white text-lg max-md:flex max-md:items-start max-md:text-4xl max-md:gap-8 max-md:w-full max-md:flex-col-reverse",
                isScrolled && "flex",
                !isMain && "flex"
              )}
            >
              {navigation.routes.map((route) => {
                if (route.type === "button-download")
                  return (
                    <li
                      key={route.path}
                      className="max-md:w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link
                        href={route.path}
                        className={cn(
                          "rounded-sm px-2 py-1 max-md:bg-white max-md:text-black max-md:flex max-md:justify-center",
                          route.className
                        )}
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
                        className={cn(
                          "rounded-sm px-2 py-1 max-md:bg-transparent max-md:text-white max-md:border-2 max-md:border-white max-md:flex max-md:justify-center ",
                          route.className
                        )}
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