"use client"

import { IconLogout } from '@tabler/icons-react';
import { logout } from './actions';
import React, { useTransition } from 'react'

const ButtonLogout = () => {
  return (
    <button className="p-2 rounded-md hover:bg-grey-sec hover:dark:bg-grey-sec-dark text-text-grey" onClick={async () => logout()}>
      <IconLogout width={22} height={22} />
    </button>
  );
}

export default ButtonLogout