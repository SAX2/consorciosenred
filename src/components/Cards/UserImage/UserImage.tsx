
import UserIcon from '@/components/Icons/UserIcon';
import { getUser } from '@/lib/queries/queries';

const UserImage = async () => {
  const data = await getUser();

  return <UserIcon color="blue" name={data.nombre} />;
}

export default UserImage