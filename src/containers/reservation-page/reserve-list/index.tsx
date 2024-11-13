import ReserveGroupCard from '@/components/Cards/ReserveGroupCard';
import React, { FC, PropsWithChildren } from 'react'

interface ReserveListProps extends PropsWithChildren {
  className?: string;
  items: any[];
  params?: string;
}

const ReserveList: FC<ReserveListProps> = ({ className, items, children, params }) => {
  return (
    <div className='grid grid-cols-1 gap-4'>
      {items.map((item) => {
        return <ReserveGroupCard item={item} param={params} />;
      })}
    </div>
  );
}

export default ReserveList