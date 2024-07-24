"use client"

import { pattern } from '@/lib/images';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface NewsCardProps {
  mainPath: string,
  content: {
    title: string;
    createdAt: string;
    mainColor: string;
    content: {
      title: string;
      description: string;
    };
  };
}

const NewsCard = ({ content,mainPath }: NewsCardProps) => {
  
  const date = new Date('2024-07-14');
  date.setDate(date.getDate() + 1);
  const formattedDate = date.toLocaleDateString('es-ES', { day: "numeric", month: "long", year: "numeric" });

  return (
    <Link
      href={mainPath + "/" +  encodeURIComponent(content.title.toLowerCase().split(" ").join("-"))}
      title={content.title}
      className="flex flex-col gap-6 w-full h-fit"
    >
      <div
        className={cn(
          "w-full p-6 h-[275px] rounded-xl flex items-end relative group select-none",
          content.mainColor
        )}
      >
        <Image
          src={pattern}
          alt="pattern"
          className="absolute right-0 -translate-y-2/4 top-2/4 opacity-75 group-hover:scale-110 transition-transform"
        />
        <h3 className="font-medium text-4xl text-white font-geist leading-none tracking-tight">
          {content.title}
        </h3>
      </div>
      <div className="flex flex-col gap-4 h-fit">
        <span className="text-black/75">Publicado el {formattedDate}</span>
        <h4 className="font-medium text-3xl line-clamp-2 leading-tight tracking-tight font-geist">
          {content.content.title}
        </h4>
        <p className='line-clamp-2'>{content.content.description}</p>
      </div>
    </Link>
  );
}

export default NewsCard