"use client"

import Link from "next/link";
import Pill from "@/components/Pill";
import { AcrobatLogo } from "@/lib/icons";
import { ColumnDef } from "@tanstack/react-table"
import { IconArrowsDown, IconArrowsUpDown, IconChevronRight } from "@tabler/icons-react";

export type Expensa = {
  id: string;
  period: string;
  comprobantes: string[];
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
          PERIODO / COMPROBANTE
          {column.getIsSorted() === "asc" ? (
            <IconArrowsUpDown className="h-4 w-4" />
          ) : (
            <IconArrowsDown className="h-4 w-4" />
          )}
        </button>
      );
    },
    cell: ({ row }) => {
      const period = row.getValue("period") as string;
      const comprobantes = row.original.comprobantes;
      return (
        <div className="flex flex-col gap-[6px]">
          <div className="flex items-center">
            <span className="font-medium text-base">{period}</span>
            <IconChevronRight className="h-4 w-4 text-text-grey" />
          </div>
          <div className="flex flex-wrap gap-2">
            {comprobantes.length > 0 ? (
              comprobantes.map((comprobante, index) => (
                <Link
                  key={index}
                  href={`/file/uf_liquidaciones/${row.original.id}/${comprobante}`}
                  target="_blank"
                >
                  <Pill
                    icon={<AcrobatLogo width={15} height={15} />}
                    text="Comprobante"
                    classNameText="text-sm text-black/75 dark:text-white/75 !font-medium"
                  />
                </Link>
              ))
            ) : (
              <span className="text-sm text-text-grey">Sin comprobantes</span>
            )}
          </div>
        </div>
      );
    },
  },
];