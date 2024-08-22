import { userImage2 } from '@/lib/images';
import Image from 'next/image';

const UserImage = () => {
  return (
    <Image
      src={userImage2}
      className="object-cover rounded-full"
      width={24}
      height={24}
      alt="Imagen del usuario"
    />
  );
}

export default UserImage