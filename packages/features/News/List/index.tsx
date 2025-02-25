import React from 'react'
import NewCard from 'app/features/News/List/NewCard';

interface NewsScreenProps {
  data: any[];
  param?: string;
}

const NewsScreen = ({ data, param }: NewsScreenProps) => {
  return (
    <div className="flex flex-col gap-[10px]">
      {data.map((item, index) => {
        return <NewCard item={item} index={index} key={`new_${item.id}`} />;
      })}
    </div>
  );
}

export default NewsScreen