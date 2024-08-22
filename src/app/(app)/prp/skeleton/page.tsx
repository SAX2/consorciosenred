import React from 'react'
import Loading from '../(main-layout)/expensas/[id]/loading'

const page = () => {
  return (
    <div className="w-full min-h-dvh bg-white justify-center flex py-16">
      <div className="max-w-[750px] w-full">
        <Loading />
      </div>
    </div>
  );
}

export default page