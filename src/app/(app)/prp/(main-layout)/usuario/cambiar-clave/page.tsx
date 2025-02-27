import UserEditPassword from 'app/features/User/EditPassword';
import { getUser } from 'app/services/queries';
import React from 'react'

const page = async () => {
  const user = await getUser();

  return <UserEditPassword user={user}/>;
};

export default page