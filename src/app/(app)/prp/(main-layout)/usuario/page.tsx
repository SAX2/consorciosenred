import UserPanel from 'app/features/User/Details';
import { getUser } from 'app/services/queries'
import React from 'react'

const page = async () => {
  const user = await getUser();

  return (
    <UserPanel user={user} />
  );
}

export default page