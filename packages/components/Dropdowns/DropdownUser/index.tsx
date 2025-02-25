"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from 'app/components/ui/dropdown-menu'
import { useUserOptions } from './constants'
import React, { FC, PropsWithChildren } from 'react'
import NavLinkButton from 'app/components/Buttons/ButtonNavLink'

interface UserDropdownProps extends PropsWithChildren {}

const UserDropdown: FC<UserDropdownProps> = ({ children }) => {
  const options = useUserOptions()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='mr-4 rounded-lg flex flex-col gap-1 max-md:drop-shadow-xl drop-shadow-sm border-outline dark:border-outline-dark dark:bg-black-app-bg'>
        {options.map(item => {
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