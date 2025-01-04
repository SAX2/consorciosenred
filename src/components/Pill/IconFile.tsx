import { AcrobatLogo } from '@/lib/icons'
import { IconPhoto } from '@tabler/icons-react'
import React from 'react'

const IconFile = ({ type }: { type: string }) => {
  if (type === 'png' || type === 'jpg' || type === 'svg') {
    return (
      <div className="w-[15px] h-[15px] bg-blue flex items-center justify-center rounded-sm">
        <IconPhoto width={13} height={13} className="text-white" />
      </div>
    );
  }

  if (type === 'pdf') {
    return <AcrobatLogo width={15} height={15}/>
  }
}

export default IconFile