"use client"

import Link from "next/link";
import Pill from "@/components/Pill";
import { AcrobatLogo } from "@/lib/icons";
import { ColumnDef } from "@tanstack/react-table"
import { IconArrowsDown, IconArrowsUpDown, IconChevronDown, IconChevronRight, IconChevronUp, IconReceipt, IconReceipt2 } from "@tabler/icons-react";

export type Expensa = {
  id: string;
  nombreAdjunto: string;
  period: string;
};

export const columns: ColumnDef<Expensa>[] = [
  {
    accessorKey: "period",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          LIQUIDACIÓN PERIODO
          {column.getIsSorted() === "asc" ? (
            <IconChevronUp size={16} />
          ) : (
            <IconChevronDown size={16} />
          )}
        </button>
      );
    },
    cell: ({ row }) => {
      const period = row.getValue("period") as string;
      return (
        <Link
          target="_blank"
          href={`/file/uf_liquidaciones/${row.original.id}/${row.original.nombreAdjunto}`}
          className="flex flex-col gap-[6px]"
        >
          <div className="flex items-center">
            <span className="font-medium text-base">{period}</span>
            <IconChevronRight size={16} className="text-text-grey" />
          </div>
        </Link>
      );
    },
  },
];