"use client"

import { cn } from '@/lib/utils';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import React, { InputHTMLAttributes, useState } from 'react'

interface InputProps {
  icon?: React.ReactElement;
  label?: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps > = (props) => {
  const [enabled, setEnabled] = useState<boolean>(false);

  const onClickPassword = () => {
    setEnabled((prevState) => !prevState);
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-black/75 px-2 dark:text-white/75">
        {props.label}
      </label>
      <div className="flex w-full rounded-md bg-black-sec items-center relative">
        <input
          {...props}
          type={(props.type === 'password') && enabled ? "text" : props.type}
          className={cn(
            "w-full p-2 px-3 rounded-md placeholder:text-grey-text text-black outline-none border border-outline dark:text-white dark:border-outline-dark",
            props.className
          )}
        />
        {props.icon && props.type !== "password" && (
          <span className="pr-2 py-1">{props.icon}</span>
        )}
        {props.type === "password" && (
          <button onClick={onClickPassword} type='button' className='absolute right-0 h-full flex items-center'>
            <span className="pr-2 py-1 text-text-grey">
              {enabled ? <IconEye /> : <IconEyeOff /> }
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Input