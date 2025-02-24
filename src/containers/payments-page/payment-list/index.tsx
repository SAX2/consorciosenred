"use client"

import PaymentCard from '@/components/Cards/PaymentCard';
import Input from '@/components/Form/Input';
import BottomSection from '@/components/Sections/AppSections/BottomSection';
import Pagination from '@/components/Sections/AppSections/Pagination';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import usePagination from '@/hooks/use-pagination';
import { IconBellRinging, IconSearch } from '@tabler/icons-react';
import React, { FC, PropsWithChildren, useState } from 'react'
import Button from '../../../../packages/components/Buttons/Button';
import { usePathname } from 'next/navigation';
import useIsLargeScreen from '@/hooks/useIsLargeScreen';

interface PaymentListProps extends PropsWithChildren {
  className?: string;
  items: any[];
}

const PaymentList: FC<PaymentListProps> = ({ className, items }) => {
  const pathname = usePathname()
  const [isSelected, setIsSelected] = useState<string>("");
  const [filter, setFilter] = useState<string>("Mas reciente");
  const [searchTerm, setSearchTerm] = useState<string>("");

  let itemsPerPage = 7;

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

  const {
    currentPage,
    totalPages,
    currentItems,
    handleNextPage,
    handlePreviousPage,
    startIndex, 
    endIndex
  } = usePagination({ items: filteredItems, itemsPerPage });

  return (
    <>
      <div className="flex items-center gap-2 w-full">
        <Input
          icon={<IconSearch className="text-text-grey" size={20} />}
          type="text"
          placeholder="Buscar por fecha (dd/mm/yyyy)"
          orientation="icon-left"
          className="bg-transparent border-0"
          classNameContainerInput="bg-grey dark:bg-grey-dark w-full border-0"
          classNameContainer="border-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Input
          type="select"
          placeholder="Filtrar"
          selectDefaultValue={filter}
          selectValues={[{ arr: ["Mas viejo", "Mas reciente"] }]}
          className="bg-transparent border-0 truncate !bg-grey dark:!bg-grey-dark"
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
              item={item}
            />
          </AccordionItem>
        ))}
      </Accordion>

      <Pagination
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredItems.length}
        totalPages={totalPages}
      />
    </>
  );
}


export const BottomSectionPayments = ({ param }: { param: string }) => {
  const { isLargeScreen } = useIsLargeScreen({ minWidth: 768 });

  return (
    <>
      {!isLargeScreen && (
        <BottomSection>
          <Button
            href={`/prp/expensas/${param}/pagos/nuevo`}
            title="Notificar pago"
            classNameContainer="w-full"
            buttonBackground="bg-blue-button"
            classNameText="text-white"
            icon={<IconBellRinging size={24} className="text-white" />}
          />
        </BottomSection>
      )}
    </>
  );
}

export default PaymentList;
