"use client"

import PaymentCard from '@/components/Cards/PaymentCard';
import Input from '@/components/Form/Input';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { IconBellRinging, IconSearch, IconSquareRoundedPlus } from '@tabler/icons-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React, { FC, PropsWithChildren, useState } from 'react'

interface PaymentListProps extends PropsWithChildren {
  className?: string;
  items: any[];
  params?: string;
}

const PaymentList: FC<PaymentListProps> = ({ className, items, children, params }) => {

  const [isSelected, setIsSelected] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleValueChange = (value: string) => {
    setIsSelected(value)
  }


  const sortedItems = items.sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedItems.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  return (
    <>
      <div className="flex items-center gap-2 w-full">
        <Link
          href={`/prp/expensas/${params}/reclamos/nuevo`}
          className="icon-blue p-2 flex items-center justify-center rounded-lg"
        >
          <span>
            <IconBellRinging width={26} height={26} />{" "}
          </span>
        </Link>
        <Input
          icon={
            <IconSearch className="text-text-grey" width={18} height={18} />
          }
          type="text"
          placeholder="Buscar"
          orientation="icon-left"
          className="bg-grey dark:bg-grey-dark w-full"
        />
        <Input
          type="select"
          placeholder="Filtrar"
          selectValues={[{ arr: ["Mas viejo"] }]}
          className="!bg-grey dark:!bg-grey-dark w-fit gap-2"
          classNameContainer="w-fit"
        />
      </div>
      <Accordion
        type="single"
        collapsible
        className="flex flex-col gap-[10px]"
        onValueChange={handleValueChange}
      >
        {currentItems.map((item, index) => (
          <AccordionItem
            key={item.idNotificacion}
            value={item.idNotificacion}
            className="!border-0"
          >
            <PaymentCard
              isSelected={isSelected === item.idNotificacion}
              desc={item.comentario}
              files={item.adjuntos}
              value={item.importe}
              createdAt={item.fecha}
              code={item.codComprobante}
            />
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex items-center justify-between space-x-2 py-2">
        {items.length > itemsPerPage && (
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="rounded-md bg-grey border border-outline dark:bg-grey-dark dark:border-outline-dark p-1 text-text-grey"
          >
            <ChevronLeft width={20} height={20} />
          </button>
        )}

        <p className="text-center text-text-grey text-sm w-full">
          Mostrando del {startIndex + 1} al {Math.min(endIndex, items.length)} de{" "}
          {items.length.toLocaleString()} registros
        </p>

        {items.length > itemsPerPage && (
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="rounded-md bg-grey border border-outline dark:bg-grey-dark dark:border-outline-dark p-1 text-text-grey"
          >
            <ChevronRight width={20} height={20} />
          </button>
        )}
      </div>
    </>
  );
}

export default PaymentList