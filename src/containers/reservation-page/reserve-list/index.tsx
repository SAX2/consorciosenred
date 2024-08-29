import React, { FC, PropsWithChildren } from 'react'

interface ReserveListProps extends PropsWithChildren {
  className?: string;
  items: any[];
  params?: string;
}

const ReserveList: FC<ReserveListProps> = ({ className, items, children, params }) => {
  return (
    <div>index</div>
  )
}

export default ReserveList