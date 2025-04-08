import React, { PropsWithChildren } from 'react'
import Main from '../components/Main'
import SectionApps from '../components/hero-sections/SectionApps'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Main className='bg-white'>
      {children}
      <SectionApps />
    </Main>
  )
}

export default Layout