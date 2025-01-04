import ReserveGroupCard from '@/components/Cards/ReserveGroupCard';
import React, { FC, PropsWithChildren } from 'react'

interface ReserveListProps extends PropsWithChildren {
  className?: string;
  items: any[];
  params?: string;
}

const ReserveList: FC<ReserveListProps> = ({ className, items, children, params }) => {
  return (
    <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1 max-md:grid-cols-2 max-sm:grid-cols-1">
      {items.map((item) => {
        return <ReserveGroupCard key={item.id} item={item} param={params} />;
      })}
    </div>
  );
}

export default ReserveList