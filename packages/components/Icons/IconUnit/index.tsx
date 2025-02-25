import { cn } from "app/lib/utils";
import { IconCube } from "@tabler/icons-react";
import Image from "next/image";
import { FC } from "react";

interface IconUnitProps {
  size?: number;
  iconSize?: number
  padding?: string;
  rounded?: string;
  id: string;
  name: string;
}

const IconUnit: FC<IconUnitProps> = ({ id, name, padding = "p-1", rounded = "rounded-md", size = 40, iconSize = 32 }) => {
  if (id && name) {
    return (
      <Image
        alt={id}
        src={`/file/edf_img/${id}/${name}`}
        width={size}
        height={size}
      />
    );
  } 

  return (
    <div
      className={cn(
        "border",
        "border-outline dark:border-outline-dark bg-white dark:bg-grey-sec-dark",
        padding, rounded
      )}
    >
      <IconCube size={iconSize} className="text-outline" />
    </div>
  );
}

export default IconUnit