import { cn } from 'app/lib/utils';
import React, { FC } from 'react'

interface TimeLineTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const TimeLineTitle: FC<TimeLineTitleProps> = ({ children, className }) => {
  return <p className={cn("leading-none", className)}>{children}</p>;
}

interface  TimeLineItemProps {
  gap?: string;
  itemPadding?: string;
  linePadding?: string;
  circleDimensions?: string;
  classNameItemContainer?: string;
  classNameLine?: string;
  classNameCircle?: string;
}

interface TimeLineProps extends TimeLineItemProps {
  items: React.ReactNode[];
}

export const TimeLineItem: FC<TimeLineItemProps & { isLast: boolean, item: React.ReactNode }> = ({
  classNameCircle,
  classNameItemContainer,
  classNameLine,
  itemPadding,
  circleDimensions,
  linePadding,
  isLast,
  item,
  gap,
}) => {
  return (
    <div className={cn("flex flex-row", gap)}>
      <div className={cn("flex flex-col gap-[2px] items-center", linePadding)}>
        <div
          className={cn(
            circleDimensions,
            classNameCircle,
            "h-auto rounded-full border border-text-grey"
          )}
        ></div>
        {!isLast && <div className={cn(classNameLine, "flex-1 w-[1px] bg-outline dark:bg-outline-dark")}></div>}
      </div>
      <div className={cn(classNameItemContainer, !isLast && itemPadding)}>
        {item}
      </div>
    </div>
  );
};

const TimeLine: FC<TimeLineProps> = ({
  items,
  classNameCircle = "",
  classNameItemContainer,
  classNameLine = "!w-[2px]",
  itemPadding = "pb-6",
  circleDimensions = "w-[16px] min-h-[16px]",
  linePadding = "px-1",
  gap = "gap-1",
}) => {
  return (
    <div className='flex flex-col gap-[2px]'>
      {items.map((item, index) => {
        return (
          <TimeLineItem
            isLast={index + 1 === items.length}
            circleDimensions={circleDimensions}
            classNameCircle={classNameCircle}
            classNameItemContainer={classNameItemContainer}
            classNameLine={classNameLine}
            itemPadding={itemPadding}
            linePadding={linePadding}
            item={item}
            gap={gap}
            key={`timeline_item_${index}`}
          />
        );
      })}
    </div>
  );
};

export default TimeLine