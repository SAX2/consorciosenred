import ReserveResourceCard from 'app/features/Reserves/Create/ReserveResourceCard';
import React, { FC, PropsWithChildren } from 'react'

interface ReserveListProps extends PropsWithChildren {
  className?: string;
  items: any[];
  params?: string;
}

const ReserveResourceList: FC<ReserveListProps> = ({ className, items, children, params }) => {
  return (
    <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1 max-md:grid-cols-2 max-sm:grid-cols-1">
      {items.map((item) => {
        return <ReserveResourceCard key={item.recuGrupo} item={item} param={params} />;
      })}
    </div>
  );
}

export default ReserveResourceList