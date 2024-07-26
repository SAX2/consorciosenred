import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import { verticalPrp } from '@/lib/contents/(app)/sidebar'

interface layoutProps {
  children: React.ReactNode;
}

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <main className="flex">
      <Sidebar items={verticalPrp} type="[Propietario]" mainPath="/prp" />
      <div className="bg-white dark:bg-black-app-bg w-full max-h-dvh h-dvh overflow-y-auto">
        {children}
      </div>
    </main>
  );
};

export default layout