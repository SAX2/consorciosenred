import Pill from "@/components/Pill";
import UserDropdown from "@/components/Dropdowns/UserDropdown";
import { FC } from "react";
import { cn } from "@/lib/utils";
import { IconDotsVertical } from "@tabler/icons-react";
import { getUser } from "@/lib/queries/queries";
import UserIcon from "@/components/Icons/UserIcon";

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
        <UserIcon color="blue" name={data.nombre} />
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
        <UserDropdown>
          <button className="p-2 rounded-md hover:bg-grey-sec hover:dark:bg-grey-dark text-black">
            <IconDotsVertical width={22} height={22} />
          </button>
        </UserDropdown>
      </div>
    </div>
  );
}

export default UserCard