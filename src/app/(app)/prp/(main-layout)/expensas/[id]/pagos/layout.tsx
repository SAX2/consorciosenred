import { FC, PropsWithChildren, Suspense } from 'react'
import Loading from './loading'

interface LayoutProps extends PropsWithChildren {}

const layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  )
}

export default layout