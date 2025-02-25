"use client"

import { classNameButton, classNameButtonText } from "app/components/Buttons/Button";
import { cn } from "app/lib/utils";
import { IconCircleCheckFilled, IconCircleXFilled, IconLoader } from "@tabler/icons-react";
import { motion, AnimatePresence,HTMLMotionProps } from "framer-motion";

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
  loadingText = "Cargando", 
  successText = "Exito", 
  errorText = "Error", 
  idleIcon,
  loadingIcon = <IconLoader className="animate-spin" size={24} />,
  successIcon = <IconCircleCheckFilled className="text-white" size={24} />,
  errorIcon = <IconCircleXFilled className="text-white" size={24}/>,
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
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          {content.icon && <span>{content.icon}</span>}
          {content.text && <span className={classNameButtonText}>{content.text}</span>}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <motion.button
      type="submit"
      disabled={status === 'loading'}
      className={cn(
        classNameButton,
        "w-full p-2 outline-none border outline-offset-0 flex items-center justify-center",
        status === 'loading' && "!bg-grey dark:!bg-grey-dark !text-text-grey cursor-not-allowed",
        status === 'success' && "!bg-green",
        status === 'error' && "!bg-red dark:!bg-red-dark !text-white",
        className
      )}
      animate={{
        backgroundColor: status === 'error' ? 'rgba(239, 68, 68, 0.15)' : status === 'success' ? 'rgba(16, 185, 129, 0.15)' : '',
        color: status === 'error' ? '#fff' : status === 'success' ? '#fff' : '',
      }}
      transition={{ duration: 0.150 }}
    >
      {getContent()}
    </motion.button>
  );
};

export default InputSubmit;