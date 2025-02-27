import UserEdit from 'app/features/User/Edit'
import { getUser } from 'app/services/queries';
import React from 'react'

const page = async () => {
  const user = await getUser();

  return (
    <UserEdit user={user} />
  )
}

export default page