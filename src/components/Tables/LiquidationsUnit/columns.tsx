"use client"

import Pill from "@/components/Pill";
import { AcrobatLogo } from "@/lib/icons";
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link";

export type Expensa = {
  id: string;
  period: string;
  title: string;
  adj: string;
};

export const columns: ColumnDef<Expensa>[] = [
  {
    id: "select",
    header: ({ table }) => (
      
      <Checkbox
        className="rounded-sm border-text-grey/50 w-fit min-w-4"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="rounded-sm border-text-grey/50 w-fit min-w-4"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "title",
    header: "Periodo",
    minSize: 125,
    cell: ({ row }) => {
      return (
        <Link
          href={`/file/uf_liquidaciones/${row.getValue("id")}/${row.getValue(
            "adj"
          )}`}
          target="_blank"
          className="w-fit flex"
        >
          <Pill
            icon={<AcrobatLogo width={15} height={15} />}
            text={row.getValue('title')}
            classNameText="text-sm text-black/75 dark:text-white/75 !font-medium w-full"
          />
        </Link>
      );
    }
  },
  {
    accessorKey: "adj",
    header: "Adjunto",
    cell: ({ row }) => {
      return (
        <Link
          href={`/file/uf_liquidaciones/${row.getValue("id")}/${row.getValue(
            "adj"
          )}`}
          target="_blank"
          className="w-fit flex"
        >
          <Pill
            icon={<AcrobatLogo width={15} height={15} />}
            text={"Comprobante"}
            classNameText="text-sm text-black/75 dark:text-white/75 !font-medium w-full"
          />
        </Link>
      );
    }
  },
]
