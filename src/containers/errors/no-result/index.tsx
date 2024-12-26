import { IconSquareRoundedX } from '@tabler/icons-react';
import { FC } from "react";

interface NoResultProps {
  message?: string;
  iconShown?: boolean;
  icon?: React.ReactNode;
}

const NoResult: FC<NoResultProps> = ({
  message,
  iconShown = true,
  icon = (
    <IconSquareRoundedX className="text-text-grey" width={44} height={44} />
  ),
}) => {
  return (
    <div className="w-full flex items-center justify-center flex-col gap-2">
      <div className="bg-grey dark:bg-grey-dark p-1 rounded-xl">
        {iconShown && icon}
      </div>
      <p className="text-lg font-medium text-text-grey">{message}</p>
    </div>
  );
};

export default NoResult