import { cn } from 'app/lib/utils';
import { ServicesStatic } from 'app/types/globals';
import Image from 'next/image';
import React from 'react'

interface ServicesProps {
  children?: React.ReactNode;
  service: ServicesStatic;
  className?: string;
  index?: number;
}

const Service: React.FC<ServicesProps> = ({ children, service, className, index }) => {
  return (
    <section className={cn("h-full max-w-[1000px] w-full justify-center flex py-8 max-md:py-8 gap-12 max-md:flex-col-reverse", className)}>
      <div className="w-full flex flex-col gap-4">
        <span className={cn("font-medium leading-tight", service.mainColor)}>
          {service.pill}
        </span>
        <h2 className="font-semibold font-geist text-3xl leading-tight tracking-tight">
          {service.title}
        </h2>
        <p className="text-lg leading-tight">{service.description}</p>
        <ul className={cn("grid grid-cols-2 gap-3 pt-3", service.mainColor)}>
          {service.items.map((item) => {
            return (
              <li className="font-medium text-lg flex gap-2" key={item.title}>
                <div className='w-[24px]'>{item.icon}</div>
                <span className='leading-snug'>{item.title}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-full bg-grey rounded-md max-h-[420px] relative flex justify-center overflow-clip">
        <Image
          width={291}
          height={604}
          src={service.image}
          alt={service.title}
          className="h-fit pt-8 relative"
        />
      </div>
    </section>
  );
}

export default Service