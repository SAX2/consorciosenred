import { getColor } from '@/hooks/useRandomColor';
import { FC } from 'react'

interface UserIconProps {
  name: string;
  color: string;
}

const UserIcon: FC<UserIconProps> = ({ color, name}) => {
  return (
    <div>
      <div
        className="w-9 h-9 items-center justify-center rounded-full flex"
        style={{
          backgroundColor: getColor(color ?? "")?.background,
        }}
      >
        <p
          className={`text-xl font-extrabold`}
          style={{ color: getColor(color ?? "")?.color }}
        >
          {name?.charAt(0).toUpperCase()}
        </p>
      </div>
    </div>
  );
}

export default UserIcon