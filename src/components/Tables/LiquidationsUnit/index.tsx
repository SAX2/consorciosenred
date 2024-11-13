"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  PaginationState,
  ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table"
import { IconArrowsUpDown } from "@tabler/icons-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import Input from "@/components/Form/Input"
import React, { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { IconSearch } from "@tabler/icons-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  classNameBody?: string;
  className?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
  classNameBody
}: DataTableProps<TData, TValue>) {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
      sorting: [{ id: "period", desc: true }],
    },
  });

  const toggleRow = (rowId: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowId]: !prev[rowId]
    }));
  };

  return (
    <div className="flex flex-col gap-3">
      <Input
        icon={<IconSearch className="text-text-grey" size={20} />}
        type="text"
        placeholder="Buscar"
        orientation="icon-left"
        className="bg-transparent border-0"
        classNameContainerInput="bg-grey dark:bg-grey-dark w-full border-0"
        classNameContainer="border-0"
        value={globalFilter ?? ""}
        onChange={(event) => setGlobalFilter(event.target.value)}
      />
      <div className={cn("rounded-xl border border-outline dark:border-outline-dark overflow-hidden", className)}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-outline dark:border-outline-dark hover:bg-grey dark:hover:bg-grey-dark">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-text-grey dark:text-white/70 font-medium text-sm py-3">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className={classNameBody}>
            {table.getRowModel().rows.map((row) => (
              <TableRow 
                key={row.id}
                className="cursor-pointer hover:bg-grey/75 dark:hover:bg-grey-dark/75 border-outline dark:border-outline-dark"
                onClick={() => toggleRow(row.id)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className={`flex items-center ${table.getRowCount() > 5 ? 'justify-between' : 'justify-center'} space-x-2 py-2`}>
        {table.getRowCount() > 5 && (
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-md bg-grey border border-outline dark:bg-grey-dark dark:border-outline-dark p-1 text-text-grey"
          >
            <ChevronLeft width={20} height={20} />
          </button>
        )}
        <p className="text-center text-text-grey text-sm">
          Mostrando registros del {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}{" "}
          al {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getRowCount())}{" "}
          de un total de {table.getRowCount()} registros
        </p>
        {table.getRowCount() > 5 && (
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-md bg-grey border border-outline dark:bg-grey-dark dark:border-outline-dark p-1 text-text-grey"
          >
            <ChevronRight width={20} height={20} />
          </button>
        )}
      </div>
    </div>
  );
}