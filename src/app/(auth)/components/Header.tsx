import { logoBackgroundBlue } from '@/lib/images';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className='flex justify-between w-full items-center max-md:pb-4'>
      <Link
        aria-label="Consorcios en red logo"
        href={"/"}
        className="flex items-center gap-2 transition-transform"
      >
        <Image
          src={logoBackgroundBlue}
          alt="Logo"
          width={38}
          height={38}
          className="w-[40px] max-md:w-[36px]"
        />
        <span
          className={"text-blue italic font-bold text-lg max-md:!block"}>
          Consorcios<span className="text-green">en</span>red
        </span>
      </Link>
      {children}
    </header>
  );
}

export default Header