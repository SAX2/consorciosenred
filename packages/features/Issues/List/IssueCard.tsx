"use client"

import React from 'react'
import Pill from 'app/components/Pill';
import Link from 'next/link';
import statuscolors from 'app/assets/constants//(app)/statuscolors.json'
import { cn } from 'app/lib/utils';
import { IconAlertTriangle, IconChevronRight } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import CardIcon from 'app/components/Icons/IconCard';
import { getStatusType } from 'app/hooks/use-status';

interface RclCardProps {
  item: any;
  className?: string;
}

const IssueCard: React.FC<RclCardProps> = ({
  item,
  className,
}) => {
  const pathname = usePathname();

  return (
    <Link href={pathname + "/" + item.Rcl_id}>
      <div
        className={cn(
          "p-3 bg-grey rounded-2xl flex items-center gap-3 justify-between dark:bg-grey-dark",
          className
        )}
      >
        <div className="flex items-center gap-3 w-full max-md:items-start">
          <CardIcon className="bg-orange-icon/10">
            <IconAlertTriangle size={48} className="text-orange-icon" />
          </CardIcon>
          <div className="flex flex-col gap-1 w-full max-xl:max-w-[200px] max-md:max-w-full">
            <p className="font-medium md:truncate">{item.Rcl_Subject}</p>
            <div className="flex items-center gap-1">
              <Pill text={item.Rcl_DateTime} classNameText="text-sm" />
              <Pill
                text={item.Rcl_Status}
                variant={getStatusType("reclamos", item.Rcl_Status)}
                classNameText="text-sm"
              />
            </div>
          </div>
        </div>
        <IconChevronRight size={24} className="text-text-grey" />
      </div>
    </Link>
  );
};

export default IssueCard