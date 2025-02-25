import React from 'react'

const FormSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 w-full p-4">
      <div className="overflow-y-auto flex-col flex gap-6">
        <div className="h-[36px] w-full bg-grey-sec dark:bg-grey-sec-dark animate-pulse rounded-md"></div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4 w-full">
          <div className="w-1/2 h-[42px] bg-grey-sec dark:bg-grey-sec-dark animate-pulse rounded-md"></div>
          <div className="w-1/2 h-[42px] bg-grey-sec dark:bg-grey-sec-dark animate-pulse rounded-md"></div>
        </div>
        <div className="w-full h-[42px] bg-grey-sec dark:bg-grey-sec-dark animate-pulse rounded-md"></div>
        <div className="w-full h-[150px] bg-grey-sec dark:bg-grey-sec-dark animate-pulse rounded-md"></div>
        <div className="flex flex-col gap-1 w-full">
          <div className="h-[20px] w-full bg-grey-sec dark:bg-grey-sec-dark animate-pulse rounded-sm"></div>
          <div className="w-full h-[100px] bg-grey-sec dark:bg-grey-sec-dark animate-pulse rounded-md"></div>
        </div>
        <div className="w-full h-[42px] bg-grey-sec dark:bg-grey-sec-dark animate-pulse rounded-md"></div>
      </div>
    </div>
  )
}

export default FormSkeleton