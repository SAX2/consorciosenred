import JudgmentCard from '@/components/Cards/JudgementCard';
import React from 'react'

interface JudgmentsScreenProps {
  data: any[];
  param: string;
}

const JudgmentsScreen = ({ data, param }: JudgmentsScreenProps) => {
  return (
    <div className="flex flex-col gap-2">
      {data.map((item, index) => {
        return (
          <JudgmentCard
            item={item}
            index={index}
            pathParam={param}
            key={`payment_${item.Jui_id}`}
          />
        );
      })}
    </div>
  );
}

export default JudgmentsScreen