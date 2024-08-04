import Pill from '@/components/pill/Pill';
import { userImage2 } from '@/lib/images';
import { cn } from '@/lib/utils';
import { IconLogout, IconSettings } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react'
import ButtonLogout from './ButtonLogout';
import { getUser } from '@/lib/queries/queries';

interface UserCardProps {
  className?: string;
}

const UserCard: React.FC<UserCardProps> = async ({ className }) => {
  const data = await getUser();

  return (
    <div
      className={cn(
        "flex justify-between w-full p-2 gap-2 items-center border border-outline bg-grey dark:border-outline-dark rounded-xl dark:bg-grey-sec-dark text-black dark:text-white",
        className
      )}
    >
      <div className="flex gap-3 items-center">
        <Image
          src={userImage2}
          alt="user-image"
          width={40}
          height={40}
          className="object-fill rounded-md bg-white dark:bg-grey-sec-dark border border-outline dark:border-outline-dark"
        />
        <div className={cn("flex flex-col gap-0 w-full max-w-[80px]")}>
          <p className="truncate w-full font-medium text-sm">{data.nombre + " " + data.apellido}</p>
          <Pill text={`${data.total_unidades} Unidad${data.total_unidades > 1 ? "es" : ""}`} />
        </div>
      </div>
      <div className={cn("flex")}>
        <button className="p-2 rounded-md hover:bg-grey-sec hover:dark:bg-grey-sec-dark text-text-grey">
          <IconSettings width={22} height={22} />
        </button>
        <ButtonLogout />
      </div>
    </div>
  );
}

export default UserCard