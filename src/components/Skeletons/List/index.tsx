import React from 'react'

const ListSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="max-w-[250px] h-[25px] rounded-sm bg-grey-sec dark:bg-grey-sec-dark animate-pulse"></div>
      <div className="w-full flex gap-2">
        <div className="min-w-[42px] h-[42px] rounded-md bg-grey-sec dark:bg-grey-sec-dark animate-pulse"></div>
        <div className="w-full h-[42px] rounded-md bg-grey-sec dark:bg-grey-sec-dark animate-pulse"></div>
        <div className="min-w-[89px] h-[42px] rounded-md bg-grey-sec dark:bg-grey-sec-dark animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-[10px]">
        {Array.from({ length: 10 }, (_, index) => {
          return (
            <div
              className="p-3 rounded-xl flex items-center gap-3 justify-between max-lg:flex-col max-lg:items-start"
              key={index}
            >
              <div className="flex items-center gap-3 w-full max-md:items-start">
                <div className="min-w-[64px] h-[64px] rounded-xl bg-grey-sec dark:bg-grey-sec-dark animate-pulse"></div>

                <div className="flex flex-col gap-[6px] w-full max-xl:max-w-[200px] max-md:max-w-full">
                  <div className="max-w-[250px] h-[25px] rounded-sm bg-grey-sec dark:bg-grey-sec-dark animate-pulse"></div>
                  <div className="max-w-[150px] h-[25px] rounded-sm bg-grey-sec dark:bg-grey-sec-dark animate-pulse"></div>
                </div>
              </div>

              <div className="max-lg:w-full min-w-[100px] h-[34px] rounded-sm bg-grey-sec dark:bg-grey-sec-dark animate-pulse"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListSkeleton