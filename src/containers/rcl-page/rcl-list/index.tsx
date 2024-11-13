"use client";

import React, { FC, PropsWithChildren, useState } from 'react';
import RclCard from '@/components/Cards/RclCard';
import Input from '@/components/Form/Input';
import { cn } from '@/lib/utils';
import { IconAlertTriangle, IconSearch } from '@tabler/icons-react';
import usePagination from '@/hooks/use-pagination';
import Pagination from '@/components/Sections/AppSections/Pagination';
import Section from '@/components/Sections/AppSections/Section';
import Button from '@/components/Buttons/Button';
import { usePathname } from 'next/navigation';
import BottomSection from '@/components/Sections/AppSections/BottomSection';

interface RclListProps extends PropsWithChildren {
  className?: string;
  buttonMore?: string;
  buttonLess?: string;
  items: any;
}

const RclList: FC<RclListProps> = ({ className, items }) => {
  const pathname = usePathname()
  const [filter, setFilter] = useState<string>("rclDpto"); // Default to "Departamento"
  const [searchTerm, setSearchTerm] = useState<string>("");
  const itemsPerPage = 7;

  const selectedItems = filter === "rclDpto" ? items.rclDpto : items.rclEdif;

  const filteredItems = selectedItems.filter((item: any) =>
    item.Rcl_DateTime.includes(searchTerm)
  );

  const {
    currentPage,
    totalPages,
    currentItems,
    handleNextPage,
    handlePreviousPage,
  } = usePagination({ items: filteredItems, itemsPerPage });

  return (
    <>
      <Section title={filter}>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 w-auto">
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
              selectValues={[{ arr: ["rclDpto", "rclEdif"] }]} // Cambiar opciones de filtro
              className="bg-transparent border-0 truncate !bg-grey dark:!bg-grey-dark"
              classNameContainer="w-fit"
              selectOnChange={setFilter}
            />
          </div>
        </div>
        <div className={cn(className, "flex flex-col gap-[10px] w-auto")}>
          {currentItems.map((item: any) => (
            <div key={item.Rcl_id} className="relative">
              <RclCard item={item} />
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredItems.length}
          totalPages={totalPages}
        />
      </Section>
      <BottomSection>
        <Button
          // icon={<IconAlertTriangle size={20} className="text-white" />}
          title="Reclamar"
          buttonBackground="bg-orange-icon"
          classNameText="text-white"
          href={`${pathname}/nuevo`}
        />
      </BottomSection>
    </>
  );
};

export default RclList;
