import { cn } from '@/lib/utils';
import React, { InputHTMLAttributes } from 'react'

interface InputProps {
  icon?: React.ReactNode;
  label?: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps > = (props) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-black/75 px-2">
        {props.label}
      </label>
      <div className="flex w-full rounded-md bg-black-sec items-center">
        <input
          {...props}
          className={cn(
            "w-full p-2 px-3 rounded-md placeholder:text-grey-text text-black outline-none border border-outline", props.className
          )}
        />
        {props.icon && <span className="pr-2 py-1">{props.icon}</span>}
      </div>
    </div>
  );
}

export default Input