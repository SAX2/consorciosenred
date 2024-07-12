import { cn } from '@/lib/utils';
import React from 'react'

interface BentoProps {
  services: {
    description: string;
    title: string;
    icon: React.ReactNode;
    page?: {
      path: string;
      name: string;
      button: string;
    };
    bento?: string;
  }[];
}

const Bento = ({ services }: BentoProps) => {
  return (
    <div className='grid grid-cols-3 grid-rows-5 h-auto w-full max-w-[1000px] template-bento gap-3 max-md:grid-rows-none max-md:grid-cols-1'>
      {services.map(bentoItem => {
        return (
          <div
            key={bentoItem.title}
            className={cn(bentoItem.bento, "rounded-md p-4 flex relative  overflow-hidden min-h-[175px]")}
          >
            {bentoItem.icon}
            <div className='flex flex-col gap-[2.5px]'>
              <h3 className="font-medium font-geist text-lg">
                {bentoItem.title}
              </h3>
              <p className="text-sm">{bentoItem.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Bento