import React from 'react'

const UnitSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="w-full pb-8 max-md:pb-0 mt-0">
        <div className="p-4 rounded-xl">
          <div className="flex justify-start gap-3 items-start max-[425px]:flex-col max-[425px]:items-center w-full">
            <div className="w-[50px] h-[50px] rounded-xl bg-grey-sec dark:bg-grey-sec-dark animate-pulse"></div>
            <div className="flex flex-col gap-[6px] w-full max-[425px]:items-center">
              <div className="h-[20px] bg-grey-sec dark:bg-grey-sec-dark max-w-[100px] w-full rounded-sm animate-pulse"></div>
              <div className="flex flex-col gap-2 max-[425px]:items-center">
                <div className="h-[20px] max-w-[150px] w-full rounded-sm bg-grey-sec dark:bg-grey-sec-dark animate-pulse"></div>
                <div className="flex items-center gap-2 w-full">
                  <div className="h-[20px] min-w-[75px] max-w-[75px] w-full rounded-sm bg-grey-sec dark:bg-grey-sec-dark animate-pulse"></div>
                  <div className="h-[20px] min-w-[75px] max-w-[75px] w-full rounded-sm bg-grey-sec dark:bg-grey-sec-dark animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pb-8 max-md:pb-0 mt-0 mb-8">
        <div className="flex flex-col gap-2 py-1">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="p-3 rounded-xl flex items-center gap-1 justify-between">
              <div className="flex justify-between gap-3 items-center max-[425px]:flex-col max-[425px]:items-center w-full">
                <div className="flex items-center gap-3 w-full">
                  <div className="w-[50px] h-[50px] rounded-xl bg-grey-sec dark:bg-grey-sec-dark animate-pulse"></div>
                  <div className="flex flex-col gap-[6px] w-full max-[425px]:items-center">
                    <div className="h-[20px] bg-grey-sec dark:bg-grey-sec-dark max-w-[175px] w-full rounded-sm animate-pulse"></div>
                    <div className="h-[20px] bg-grey-sec dark:bg-grey-sec-dark max-w-[100px] w-full rounded-sm animate-pulse"></div>
                  </div>
                </div>
                <div className='flex flex-col min-w-[125px] gap-[6px] items-end'>
                  <div className="h-[20px] max-w-[75px] w-full rounded-sm bg-grey-sec dark:bg-grey-sec-dark animate-pulse"></div>
                  <div className="h-[20px] max-w-[100px] w-full rounded-sm bg-grey-sec dark:bg-grey-sec-dark animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UnitSkeleton