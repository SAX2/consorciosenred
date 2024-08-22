"use client"

import React from 'react'
import Pill from '@/components/Pill';
import Link from 'next/link';
import statuscolors from '@/lib/contents/(app)/statuscolors.json'
import { cn } from '@/lib/utils';
import { IconAlertTriangle } from '@tabler/icons-react';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

type StatusColor = "En proceso" | "Cancelado";

interface RclCardProps {
  id: string;
  title: string;
  desc: string;
  status: string;
  createdAt?: string;
  className?: string;
}

const RclCard: React.FC<RclCardProps> = ({
  id,
  status,
  desc,
  title,
  createdAt,
  className,
}) => {
  const pathname = usePathname();
  const statusColor = statuscolors[status as StatusColor];

  return (
    <div
      className={cn(
        "p-3 bg-grey rounded-xl flex items-center gap-3 justify-between dark:bg-grey-dark max-lg:flex-col max-lg:items-start",
        className
      )}
    >
      <div className="flex items-center gap-3 w-full max-md:items-start">
        <div className="p-1 icon-yellow rounded-xl">
          <IconAlertTriangle width={56} height={56} />
        </div>
        <div className="flex flex-col gap-[2px] w-full max-xl:max-w-[200px] max-md:max-w-full">
          <p className="font-medium md:truncate">{title}</p>
          <p className="text-text-grey text-sm md:truncate">{desc}</p>
          <div className="flex items-center gap-1">
            <Pill text={createdAt ?? ""} />
            <Pill text={status} className={statusColor} />
          </div>
        </div>
      </div>
      <Link
        href={pathname + "/" + id}
        className="flex items-center font-medium gap-1 px-2 py-1 rounded-md border border-outline bg-grey-sec dark:bg-grey-sec-dark dark:border-outline-dark truncate max-lg:w-full max-lg:justify-center"
      >
        Ver detalles <ChevronRight width={18} height={18} />
      </Link>
    </div>
  );
};

export default RclCard