"use client"

import Pill from 'app/components/Pill';
import useCurrencyFormat from 'app/hooks/useCurrencyFormat';
import SemiSectionData from 'app/components/Sections/SemiSection';
import React, { FC, useEffect, PropsWithChildren } from 'react'
import { cn } from 'app/lib/utils';
import { IconCalendar, IconChevronRight, IconCopy, IconFile, IconFileBarcode, IconMessage, IconReceipt, IconReceipt2 } from '@tabler/icons-react';
import { AccordionContent, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { format, parse } from 'date-fns'
import { es } from 'date-fns/locale'
import CardIcon from 'app/components/Icons/IconCard';
import { DropdownFiles } from 'app/components/Dropdowns/DropdownFiles';

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const AnimatedAccordionContent = ({
  isSelected,
  children,
}: { isSelected: boolean } & PropsWithChildren) => (
  <motion.div
    initial="hidden"
    animate={isSelected ? "visible" : "hidden"}
    exit="exit"
    className="flex flex-col gap-2 pb-0"
  >
    {children}
  </motion.div>
);

interface PaymentCardProps {
  item: any;
  isSelected: boolean;
  className?: string;
}

const PaymentCard: FC<PaymentCardProps> = ({
  item,
  className,
  isSelected = false,
}) => {
  const [formattedValue, formatCurrency] = useCurrencyFormat()

  useEffect(() => {
    formatCurrency(item.importe)
  }, [item, formatCurrency])

  const parsedDate = parse(item.fecha ?? "", 'dd/MM/yyyy', new Date());
  const formattedDate = format(parsedDate, "d MMM 'de' yyyy", { locale: es });

  return (
    <>
      <AccordionTrigger
        className="p-0 no-underline hover:no-underline"
        iconHidden={true}
      >
        <div
          className={cn(
            "p-3 bg-grey rounded-xl flex items-center gap-3 justify-between dark:bg-grey-dark max-lg:flex-col max-lg:items-start w-full",
            isSelected && "rounded-b-none",
            className
          )}
        >
          <div className="flex items-center gap-3 w-full">
            <CardIcon className="bg-icon-blue/10">
              <IconReceipt2 size={48} className="text-icon-blue" />
            </CardIcon>
            <div className="flex flex-col gap-[2px] !w-full">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <IconCalendar size={18} className="text-text-grey" />
                  <p className="text-text-grey font-medium">{formattedDate}</p>
                </div>
                <p className="font-semibold text-lg md:truncate font-geist">
                  {formattedValue}
                </p>
              </div>
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-1 flex-wrap">
                  {!isSelected && (
                    <>
                      {item.adjuntosMobile &&
                        item.adjuntosMobile?.length === 0 && (
                          <Pill
                            text={"No hay adjuntos"}
                            classNameText="text-sm"
                          />
                        )}

                      {item.adjuntosMobile &&
                        item.adjuntosMobile?.length > 0 && (
                          <Pill
                            isFile
                            fileId={item.adjuntosMobile[0].id}
                            fileName={item.adjuntosMobile[0].nombre}
                            fileType={item.adjuntosMobile[0].tipo}
                            text={"Comprobante"}
                            classNameText="text-sm"
                          />
                        )}

                      {item.adjuntosMobile &&
                        item.adjuntosMobile?.length > 1 && (
                          <Pill
                            isFile
                            fileId={
                              item.adjuntos[item.adjuntosMobile.length - 1].id
                            }
                            fileName={
                              item.adjuntos[item.adjuntosMobile.length - 1]
                                .nombre
                            }
                            fileType={
                              item.adjuntos[item.adjuntosMobile.length - 1].tipo
                            }
                            text={`+${item.adjuntos.length - 1}`}
                            classNameText="text-sm"
                            className="max-lg:hidden"
                          />
                        )}
                    </>
                  )}
                </div>
                <IconChevronRight size={24} className="text-text-grey" />
              </div>
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="border-0 bg-grey dark:bg-grey-dark rounded-b-xl p-3 flex flex-col gap-2 pt-0">
        <AnimatedAccordionContent isSelected={isSelected}>
          <motion.div variants={itemVariants}>
            <SemiSectionData
              type="simple"
              title={"Codigo de comprobante"}
              background="bg-white dark:bg-grey-sec-dark"
              icon={
                <div
                  className={cn(
                    "p-1 rounded-lg flex items-center h-fit",
                    "max-[425px]:p-[2px] max-[425px]:children:w-7 max-[425px]:children:h-auto",
                    "bg-grey border-outline text-text-grey dark:bg-grey-dark dark:border-outline-dark"
                  )}
                >
                  <IconFileBarcode width={26} height={26} />
                </div>
              }
            >
              <Pill
                text={item.codComprobante}
                classNameText="text-sm"
                icon={
                  <button>
                    <IconCopy width={15} height={15} />
                  </button>
                }
                iconOrientation="right"
              />
            </SemiSectionData>
          </motion.div>
          {item.adjuntos && item.adjuntos?.length > 0 && (
            <motion.div variants={itemVariants}>
              <SemiSectionData
                type="custom"
                title={"Files"}
                background="bg-white dark:bg-grey-sec-dark"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "p-1 rounded-lg flex items-center h-fit",
                      "max-[425px]:p-[2px] max-[425px]:children:w-7 max-[425px]:children:h-auto",
                      "bg-grey border-outline text-text-grey dark:bg-grey-dark dark:border-outline-dark"
                    )}
                  >
                    <IconFile width={26} height={26} />
                  </div>
                  <DropdownFiles
                    files={item.adjuntosMobile}
                    totalLength={item.adjuntosMobile.length}
                  />
                </div>
              </SemiSectionData>
            </motion.div>
          )}
          {item.comentario && (
            <motion.div variants={itemVariants}>
              <SemiSectionData
                title="comments"
                type="custom"
                background="bg-white dark:bg-grey-sec-dark"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "p-1 rounded-lg flex items-center h-fit",
                        "max-[425px]:p-[2px] max-[425px]:children:w-7 max-[425px]:children:h-auto",
                        "bg-grey border-outline text-text-grey dark:bg-grey-dark dark:border-outline-dark"
                      )}
                    >
                      <IconMessage width={26} height={26} />
                    </div>
                    <p className="text-base font-semibold">Mensaje</p>
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-black/75 dark:text-white/75 text-base">
                      {item.comentario}
                    </p>
                  </div>
                </div>
              </SemiSectionData>
            </motion.div>
          )}
        </AnimatedAccordionContent>
      </AccordionContent>
    </>
  );
};

export default PaymentCard