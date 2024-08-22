import { FC } from "react";
import { cn } from "@/lib/utils";
import { getUser } from "@/lib/queries/queries";
import { userImage2 } from "@/lib/images";
import { IconDots, IconSettings } from "@tabler/icons-react";
import Pill from "@/components/Pill";
import LogoutButton from "@/components/Buttons/LogoutButton";
import Image from "next/image";
import UserDropdown from "@/components/Dropdowns/UserDropdown";

interface UserCardProps {
  className?: string;
}

const UserCard: FC<UserCardProps> = async ({ className }) => {
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
        <div className={cn("flex flex-col gap-0 w-full")}>
          <p className="truncate w-full font-medium text-sm">
            {data.nombre + " " + data.apellido}
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
          <button className="p-2 rounded-md hover:bg-grey-sec hover:dark:bg-grey-dark text-text-grey">
            <IconDots width={22} height={22} />
          </button>
        </UserDropdown>
      </div>
    </div>
  );
}

export default UserCard