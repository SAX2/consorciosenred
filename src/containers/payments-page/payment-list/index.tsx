"use client"

import PaymentCard from '@/components/Cards/PaymentCard';
import Input from '@/components/Form/Input';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { IconBellRinging, IconSearch } from '@tabler/icons-react';
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
  const [filter, setFilter] = useState<string>("Mas reciente");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const itemsPerPage = 7;

  const handleValueChange = (value: string) => {
    setIsSelected(value);
  };

  const sortedItems = [...items].sort((a, b) => {
    const dateA = new Date(a.fecha.split("/").reverse().join("-")).getTime();
    const dateB = new Date(b.fecha.split("/").reverse().join("-")).getTime();
    
    if (filter === "Mas reciente") {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  const filteredItems = sortedItems.filter((item) =>
    item.fecha.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

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
          href={`/prp/expensas/${params}/pagos/nuevo`}
          className="icon-blue p-2 flex items-center justify-center rounded-lg"
        >
          <span>
            <IconBellRinging width={26} height={26} />{" "}
          </span>
        </Link>
        <Input
          icon={<IconSearch className="text-text-grey" width={18} height={18} />}
          type="text"
          placeholder="Buscar por fecha (dd/mm/yyyy)"
          orientation="icon-left"
          className="bg-grey dark:bg-grey-dark w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Input
          type="select"
          placeholder="Filtrar"
          selectDefaultValue={filter}
          selectValues={[{ arr: ["Mas viejo", "Mas reciente"] }]}
          className="!bg-grey dark:!bg-grey-dark truncate gap-2"
          classNameContainer="w-fit"
          selectOnChange={setFilter}
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
        {filteredItems.length > itemsPerPage && (
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="rounded-md bg-grey border border-outline dark:bg-grey-dark dark:border-outline-dark p-1 text-text-grey"
          >
            <ChevronLeft width={20} height={20} />
          </button>
        )}

        <p className="text-center text-text-grey text-sm w-full">
          Mostrando del {startIndex + 1} al {Math.min(endIndex, filteredItems.length)} de{" "}
          {filteredItems.length.toLocaleString()} registros
        </p>

        {filteredItems.length > itemsPerPage && (
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

export default PaymentList;
