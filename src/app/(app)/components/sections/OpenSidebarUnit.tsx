"use client"

import Burger from '@/components/navbar/Burger';
import useSidebar from '@/lib/hooks/useSIdebar'
import React from 'react'

const OpenSidebarUnit = () => {
  const { toggle, isOpen } = useSidebar();

  return (
    <button className="max-md:flex hidden w-6" onClick={toggle}>
      <Burger isMenuOpen={isOpen} size='sm'/>
    </button>
  );
}

export default OpenSidebarUnit