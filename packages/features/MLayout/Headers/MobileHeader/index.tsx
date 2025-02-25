import { cookies } from "next/headers"
import { FC, PropsWithChildren } from "react"
import MobileHeaderComponent from "./component"

interface MobileHeaderProps extends PropsWithChildren {}

const MobileHeader: FC<MobileHeaderProps> = async ({ children }) => {
  const cookie = await cookies()
  const unit = cookie.get('unit')

  const isSingleUnit = unit && parseInt(unit.value) === 1 ? true : false

  return <MobileHeaderComponent isSingleUnit={isSingleUnit} >{children}</MobileHeaderComponent>
}

export default MobileHeader