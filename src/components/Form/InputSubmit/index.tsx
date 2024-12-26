"use client"

import { cn } from "@/lib/utils";
import { IconLoader } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

interface InputSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  status?: 'idle' | 'loading' | 'success' | 'error';
  idleText?: string;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  idleIcon?: React.ReactNode;
  loadingIcon?: React.ReactNode;
  successIcon?: React.ReactNode;
  errorIcon?: React.ReactNode;
}

const InputSubmit = ({ 
  className, 
  status = 'idle', 
  idleText, 
  loadingText, 
  successText, 
  errorText, 
  idleIcon,
  loadingIcon = <IconLoader className="animate-spin" width={16} height={16} />,
  successIcon,
  errorIcon,
  ...props 
}: InputSubmitProps) => {
  const getContent = () => {
    const content = {
      idle: { text: idleText, icon: idleIcon },
      loading: { text: loadingText, icon: loadingIcon },
      success: { text: successText, icon: successIcon },
      error: { text: errorText, icon: errorIcon },
    }[status];

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center gap-2"
        >
          {content.icon && <span>{content.icon}</span>}
          {content.text && content.text}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <motion.button
      type="submit"
      disabled={status === 'loading'}
      className={cn(
        "w-full p-2 px-3 rounded-lg outline-none border outline-offset-0 flex items-center justify-center",
        status === 'loading' && "opacity-75 cursor-not-allowed",
        status === 'success' && "!bg-green-500/15",
        status === 'error' && "!bg-red-500/15 dark:!bg-red-500/15 !text-red-600 dark:!text-red-400",
        className
      )}
      animate={{
        backgroundColor: status === 'error' ? 'rgba(239, 68, 68, 0.15)' : status === 'success' ? 'rgba(16, 185, 129, 0.15)' : '',
        color: status === 'error' ? '#dc2626' : status === 'success' ? '#10b981' : '',
      }}
      transition={{ duration: 0.150 }}
    >
      {getContent()}
    </motion.button>
  );
};

export default InputSubmit;