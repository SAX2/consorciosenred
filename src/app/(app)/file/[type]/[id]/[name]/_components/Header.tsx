"use client"

import Button from 'app/components/Buttons/Button';
import { IconChevronLeft, IconShare } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const Header = () => {
  const router = useRouter()

  return (
    <div className="p-8 max-md:px-4 flex justify-between">
      <Button
        onClick={() => router.back()}
        buttonPadding="p-2 px-0"
        buttonBackground=""
        classNameText="text-text-grey"
        title="Volver atras"
        icon={<IconChevronLeft size={24} className="text-text-grey" />}
      />
      <Button
        buttonPadding="p-2"
        buttonBackground="hover:bg-grey-dark"
        icon={<IconShare size={24} className="text-text-grey" />}
      />
    </div>
  );
}

export default Header