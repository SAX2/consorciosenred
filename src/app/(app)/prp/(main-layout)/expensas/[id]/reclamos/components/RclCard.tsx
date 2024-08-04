"use client"

import Pill from '@/components/pill/Pill';
import { cn } from '@/lib/utils';
import { IconAlertTriangle } from '@tabler/icons-react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import statuscolors from '@/lib/contents/(app)/statuscolors.json'

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
  const pathname = usePathname()
  const statusColor = statuscolors[status as StatusColor];

  return (
    <div
      className={cn(
        "p-3 bg-grey border border-outline rounded-xl flex items-center gap-3 justify-between dark:bg-grey-dark dark:border-outline-dark",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="p-1 icon-yellow rounded-xl border">
          <IconAlertTriangle width={56} height={56} />
        </div>
        <div className="flex flex-col gap-[2px]">
          <p className="font-medium">{title}</p>
          <p className="text-text-grey text-sm truncate w-full">{desc}</p>
          <div className="flex items-center gap-1">
            <Pill text={createdAt ?? ""} />
            <Pill text={status} className={statusColor} />
          </div>
        </div>
      </div>
      <Link
        href={pathname + "/" + id}
        className="flex items-center font-medium gap-1 px-2 py-1 rounded-md border border-outline bg-grey-sec dark:bg-grey-sec-dark dark:border-outline-dark"
      >
        Ver detalles <ChevronRight width={18} height={18}/>
      </Link>
    </div>
  );
};

export default RclCard