import { getUser } from 'app/services/queries';
import React from 'react'
import AsideUser from 'app/features/User/Details/_AsideUser';
import UserOptions from './_UserOptions';

const AsideHomeContent = async () => {
  const data = await getUser();

  return (
    <>
      <AsideUser userData={data} />
      <UserOptions data={data} />
    </>
  );
}

export default AsideHomeContent