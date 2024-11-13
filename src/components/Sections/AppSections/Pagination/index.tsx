import React from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  handleNextPage,
  handlePreviousPage
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className="flex items-center justify-between space-x-2 py-2">
      {totalItems > itemsPerPage && (
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="rounded-md bg-grey border border-outline dark:bg-grey-dark dark:border-outline-dark p-1 text-text-grey"
        >
          <IconChevronLeft width={20} height={20} />
        </button>
      )}

      <p className="text-center text-text-grey text-sm w-full">
        Mostrando del {startIndex + 1} al {Math.min(endIndex, totalItems)} de {totalItems.toLocaleString()} registros
      </p>

      {totalItems > itemsPerPage && (
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="rounded-md bg-grey border border-outline dark:bg-grey-dark dark:border-outline-dark p-1 text-text-grey"
        >
          <IconChevronRight width={20} height={20} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
