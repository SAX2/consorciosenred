import React from 'react'
import about from '@/lib/contents/about.json'
import Main from '../components/Main';
import Pill from '@/components/pill/Pill';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';


const SemiSection = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex flex-col gap-6'>
    {children}
  </div>
}

const page = () => {
  return (
    <Main>
      <article className="flex flex-col items-center bg-white w-full px-8 max-md:px-4">
        <section className="flex flex-col gap-11 max-md:gap-8 max-w-[1000px] py-16">
          <SemiSection>
            {about.pill && (
              <Pill
                text={about.pill}
                className={about.mainColor}
                classNameText={about.mainColor.split(" ")[0]}
              />
            )}
            <h1 className="font-bold text-4xl font-geist max-w-[450px] max-md:text-3xl">
              {about.about.titulo}
            </h1>
            <p className="text-xl">{about.about.descripcion}</p>
          </SemiSection>

          <SemiSection>
            <h2 className="font-semibold font-geist text-2xl">
              {about.about.mision.titulo}
            </h2>
            <p className="text-xl">{about.about.mision.descripcion}</p>
          </SemiSection>

          <SemiSection>
            <h2 className="font-semibold font-geist text-2xl">
              ¿Por Qué Elegirnos?
            </h2>
            <ul className={cn('list-disc ml-4', about.mainColor.split(" ")[1])}>
              {about.about.porQueElegirnos.map((razon, index) => (
                <li key={razon.titulo + index} className='py-1'>
                  <p className='text-xl'>
                    <b className='font-semibold'>{razon.titulo}: </b>{' '}
                    {razon.descripcion}
                  </p>
                </li>
              ))}
            </ul>
          </SemiSection>

          <SemiSection>
            <h2 className="font-semibold font-geist text-2xl">{about.about.nuestroEquipo.titulo}</h2>
            <p className="text-xl">{about.about.nuestroEquipo.descripcion}</p>
          </SemiSection>
        </section>
      </article>
      <Separator />
    </Main>
  );
}

export default page