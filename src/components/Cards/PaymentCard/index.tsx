"use client"

import React, { FC, useEffect, PropsWithChildren } from 'react'
import Pill from '@/components/Pill';
import { cn } from '@/lib/utils';
import { IconCalendar, IconCopy, IconFile, IconFileBarcode, IconMessage, IconReceipt } from '@tabler/icons-react';
import useCurrencyFormat from '@/hooks/useCurrencyFormat';
import { AccordionContent, AccordionTrigger } from '@/components/ui/accordion';
import SemiSection from '@/components/Sections/AppSections/SemiSection';
import MediaQueryProvider from '@/context/MediaQueryProvider';
import useIsShortScreen from '@/hooks/useIsShortScreen';

import { motion } from 'framer-motion';

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
  value: number;
  desc: string;
  code?: string;
  files?: string[];
  isSelected?: boolean;
  createdAt?: string;
  className?: string;
}

const PaymentCardSection: FC<{ icon: React.ReactElement; } & PropsWithChildren> = ({ icon, children }) => {
  return <div className="p-3 rounded-xl text-black bg-white dark:bg-black-app-bg dark:text-white flex gap-3">
    <div
      className={cn(
        "p-1 rounded-lg flex items-center h-fit",
        "max-[425px]:p-[2px] max-[425px]:children:w-7 max-[425px]:children:h-auto",
        "bg-grey border-outline text-text-grey dark:bg-grey-dark dark:border-outline-dark"
      )}
    >
      {icon}
    </div>
    {children}
  </div>;
}

const Trigger = () => {
  return (
    <AccordionTrigger
      className={cn(
        "max-lg:w-full max-lg:justify-center max-lg:mt-2",
        "lg:max-w-fit",
        "flex items-center font-medium gap-1 px-2 py-1 rounded-md border border-outline bg-grey-sec dark:bg-grey-sec-dark dark:border-outline-dark hover:!no-underline"
      )}
    >
      <span className="truncate text-base">Ver más</span>
    </AccordionTrigger>
  );
};

const PaymentCard: FC<PaymentCardProps> = ({
  desc,
  value,
  files,
  code,
  createdAt,
  className,
  isSelected = false,
}) => {
  const { isShortScreen } = useIsShortScreen({ maxWidth: 768 })
  const [formattedValue, formatCurrency] = useCurrencyFormat()

  useEffect(() => {
    formatCurrency(value)
  }, [])

  return (
    <>
      <div
        className={cn(
          "p-3 bg-grey rounded-xl flex items-center gap-3 justify-between dark:bg-grey-dark max-lg:flex-col max-lg:items-start w-full",
          isSelected && "rounded-b-none",
          className
        )}
      >
        <div className="flex items-center gap-3 !w-full max-md:items-start">
          <div className="p-1 icon-green rounded-xl">
            <IconReceipt width={56} height={56} />
          </div>
          <div className="flex flex-col gap-[2px] !w-full">
            <p className="font-semibold text-lg md:truncate">
              {formattedValue}
            </p>
            <div className="flex items-center gap-1 flex-wrap">
              <Pill
                text={createdAt ?? ""}
                icon={
                  <IconCalendar
                    width={16}
                    height={16}
                    className="text-text-grey"
                  />
                }
                classNameText="text-sm text-text-grey"
              />
              {!isSelected && (
                <>
                  {files && files?.length > 0 && (
                    <Pill
                      isFile
                      fileId={files[0]}
                      text={"Comprobante"}
                      classNameText="text-sm"
                    />
                  )}

                  {files && files?.length > 1 && (
                    <Pill
                      isFile
                      fileId={files[files.length - 1]}
                      text={`+${files.length - 1}`}
                      classNameText="text-sm"
                      className="max-lg:hidden"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-fit max-lg:w-full">
          {!isShortScreen ? <Trigger /> : !isSelected && <Trigger />}
        </div>
      </div>
      <AccordionContent className="border-0 bg-grey rounded-b-xl p-3 flex flex-col gap-2 pt-0">
        <AnimatedAccordionContent isSelected={isSelected}>
          <motion.div variants={itemVariants}>
            <SemiSection
              titles={["Codigo de comprobante"]}
              className="bg-white dark:bg-black-app-bg"
              icon={<IconFileBarcode width={26} height={26} />}
            >
              <Pill
                text={code ?? ""}
                classNameText="text-sm"
                icon={
                  <button>
                    <IconCopy width={15} height={15} />
                  </button>
                }
                iconOrientation="right"
              />
            </SemiSection>
          </motion.div>
          {files && files?.length > 0 && (
            <motion.div variants={itemVariants}>
              <PaymentCardSection icon={<IconFile width={26} height={26} />}>
                <div className="flex items-center gap-2 flex-wrap">
                  {files?.map((file) => {
                    return (
                      <Pill
                        isFile
                        fileId={file}
                        text={file}
                        classNameText="text-sm"
                      />
                    );
                  })}
                </div>
              </PaymentCardSection>
            </motion.div>
          )}
          {desc && (
            <motion.div variants={itemVariants}>
              <PaymentCardSection icon={<IconMessage width={26} height={26} />}>
                <div className="flex flex-col gap-[2px]">
                  <p className="text-base font-medium">Comentarios:</p>
                  <p className="text-black/75">{desc}</p>
                </div>
              </PaymentCardSection>
            </motion.div>
          )}
          <div className="w-full hidden max-lg:block">
            <motion.div variants={itemVariants}>
              <MediaQueryProvider maxWidth={768}>
                {isSelected && <Trigger />}
              </MediaQueryProvider>
            </motion.div>
          </div>
        </AnimatedAccordionContent>
      </AccordionContent>
    </>
  );
};

export default PaymentCard