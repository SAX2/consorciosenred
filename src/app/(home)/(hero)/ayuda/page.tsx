import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Accordion } from '@radix-ui/react-accordion';
import React from 'react'
import SectionArticle from '../../components/section';
import faq from 'app/assets/constants//faq.json'

const page = () => {
  return (
    <SectionArticle sectionClassName="flex flex-col gap-12 py-16">
      <h1 className="font-bold text-4xl font-geist max-w-[450px] max-md:text-3xl">
        {faq.title}
      </h1>
      <div className="w-full flex flex-col gap-8">
        <Accordion type="multiple" className="grid grid-cols-1 gap-8">
          {faq.content.map((item, index) => {
            return (
              <AccordionItem
                key={item.title + index}
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
      </div>
    </SectionArticle>
  );
}

export default page