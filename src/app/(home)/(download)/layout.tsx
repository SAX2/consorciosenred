import React, { PropsWithChildren } from 'react'

interface layoutProps extends PropsWithChildren {}

const layout = ({ children }: layoutProps) => {
  return (
    <main className='bg-white min-h-[80dvh] border-b border-outline'>
      {children}
    </main>
  )
}

export default layout