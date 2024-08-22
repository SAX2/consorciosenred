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
} from "@tanstack/react-table"

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
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({})


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      pagination,
      columnFilters,
      rowSelection,
    },
    initialState: {
      columnVisibility: {
        id: false,
        period: false
      }
    }
  })

  return (
    <div className="flex flex-col gap-3">
      <Input
        orientation="icon-left"
        icon={<IconSearch width={18} height={18} className="text-text-grey" />}
        placeholder="Buscar"
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("title")?.setFilterValue(event.target.value)
        }
        className="w-full bg-grey dark:bg-grey-dark"
      />
      <div
        className={cn(
          "rounded-xl rounded-b-none border-b border-outline dark:border-outline-dark bg-grey dark:bg-grey-sec-dark",
          className
        )}
      >
        <Table>
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="first:children:rounded-bl-xl last:children:rounded-bl-xl hover:bg-transparent data-[state=selected]:bg-transparent border-outline dark:border-outline-dark"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-black/70 dark:text-white/75 font-semibold text-base h-fit py-3 leading-tight font-geist tracking-tight first:max-md:hidden"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className={cn("bg-white", classNameBody)}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="hover:bg-grey-sec/50 data-[state=selected]:bg-grey/75 hover:dark:bg-grey-sec-dark/50 data-[state=selected]:dark:bg-grey-dark/75 border-outline dark:border-outline-dark"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="h-fit py-3 border-r last:border-0 border-outline dark:border-outline-dark first:max-md:hidden"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-base text-text-grey"
                >
                  Sin resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-2">
        {data.length > 5 && (
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-md bg-grey border border-outline dark:bg-grey-dark dark:border-outline-dark p-1 text-text-grey"
          >
            <ChevronLeft width={20} height={20} />
          </button>
        )}
        {table.getFilteredSelectedRowModel().rows.length >= 1 && (
          <p className="text-center text-text-grey text-sm w-full">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} filas seleccionadas
          </p>
        )}
        {table.getFilteredSelectedRowModel().rows.length <= 0 && (
          <p className="text-center text-text-grey text-sm w-full">
            Mostrando {table.getRowModel().rows.length.toLocaleString()} de{" "}
            {table.getRowCount().toLocaleString()} registros
          </p>
        )}
        {data.length > 5 && (
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