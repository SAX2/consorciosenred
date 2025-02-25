import { cn } from 'app/lib/utils';
import React, { PropsWithChildren } from 'react'

interface CardIconProps {
  className?: string;
}

const CardIcon = ({ className, children }: CardIconProps & PropsWithChildren) => {
  return (
    <div className={cn(className, "flex-shrink-0 self-start rounded-xl p-2")}>
      {children}
    </div>
  );
};

export default CardIcon