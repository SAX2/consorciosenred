import Pill from "app/components/Pill";
import { FC } from "react";
import { cn } from "app/lib/utils";
import { IconHelp, IconSettings } from "@tabler/icons-react";
import { getUser } from "app/services/queries";
import UserIcon from "app/components/Icons/IconUser";
import Link from "next/link";

interface UserCardProps {
  className?: string;
}

const UserCard: FC<UserCardProps> = async ({ className }) => {
  const data = await getUser();
  
  return (
    <div
      className={cn(
        "flex justify-between w-full py-2 px-3 gap-2 items-center border border-outline dark:border-outline-dark rounded-xl text-black dark:text-white",
        className
      )}
    >
      <div className="flex gap-3 items-center">
        <UserIcon color="blue" name={data.nombre} dimensions="min-w-9 h-9" />
        <div className={cn("flex flex-col gap-0 w-full")}>
          <p className="truncate w-full font-medium text-sm">
            {data.nombre.charAt(0).toUpperCase() + data.nombre.slice(1) + " " + data.apellido}
          </p>
          <Pill
            text={`${data.total_unidades} Unidad${
              data.total_unidades > 1 ? "es" : ""
            }`}
          />
        </div>
      </div>
      <div className={cn("flex")}>
        <Link href={'/prp/usuario'} className="p-2 rounded-md hover:bg-grey-sec hover:dark:bg-grey-dark">
          <IconSettings size={24} className="text-text-grey" />
        </Link>
        <Link href={'/ayuda'} className="p-2 rounded-md hover:bg-grey-sec hover:dark:bg-grey-dark">
          <IconHelp size={24} className="text-text-grey" />
        </Link>
      </div>
    </div>
  );
}

export default UserCard