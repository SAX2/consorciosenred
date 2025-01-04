import React, { FC } from 'react'
import { toast } from 'sonner';
import IconToast from './icon';

interface ToastProps {
  title: string;
  t: string | number;
}

const Toast: FC<ToastProps> = ({ title, t }) => {
  return (
    <div className="w-max bg-white p-2 rounded-xl border border-outline shadow-shortcut max-w-[340px]">
      <IconToast />
      <h1 className="">{title}</h1>
    </div>
  );
}

export default Toast