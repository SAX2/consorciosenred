import { getColor } from "app/hooks/useRandomColor";
import { cn } from "app/lib/utils";

interface UserIconProps {
  name: string;
  color: string;
  rounded?: string;
  textSize?: string
  dimensions?: string;
}

const UserIcon = ({
  color = 'none',
  name,
  rounded = 'rounded-full',
  textSize = 'text-xl',
  dimensions = 'h-9 w-9',
}: UserIconProps) => {
  return (
    <div
      className={cn(dimensions, `flex items-center justify-center`, rounded)}
      style={{
        backgroundColor: getColor(color ?? '')?.background,
      }}
    >
      <p
        className={cn(`font-extrabold`, textSize)}
        style={{ color: getColor(color ?? '')?.color }}
      >
        {name?.charAt(0).toUpperCase()}
      </p>
    </div>
  )
}

export default UserIcon