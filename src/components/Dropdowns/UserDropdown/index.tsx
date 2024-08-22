"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { userOptions } from './constants'
import React, { FC, PropsWithChildren } from 'react'
import NavLinkButton from '@/components/Buttons/NavLinkButton'

interface UserDropdownProps extends PropsWithChildren {}

const UserDropdown: FC<UserDropdownProps> = ({ children }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-4 rounded-lg flex flex-col gap-1 max-md:drop-shadow-xl drop-shadow-sm border-outline dark:border-outline-dark dark:bg-black-app-bg'>
        {userOptions().map(item => {
          return <NavLinkButton key={item.url + item.title} href={item.url} className='flex items-center p-2 gap-2 justify-start rounded-md md:hover:bg-grey md:hover:dark:bg-grey-dark' onClick={item.onclick}>
            <span>{item.iconoWeb}</span>
            <span>{item.description}</span>
          </NavLinkButton>
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown