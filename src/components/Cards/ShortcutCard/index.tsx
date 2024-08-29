import Link from "next/link";
import Modal, { ModalTrigger } from "@/components/Modal";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface ShortcutCardProps {
  className?: string;
  color?: string;
  description?: string;
  path: string;
  title: string;
  icon: React.ReactElement;
  isModal?: boolean;
  modalContent?: React.ReactNode;
}

const ShortcutCard: FC<ShortcutCardProps> = ({
  color,
  icon,
  title,
  description,
  className,
  path,
  modalContent,
  isModal = false,
}) => {

  const classNameProp = cn(
    "w-full p-[10px] rounded-xl border border-outline dark:border-outline-dark flex items-center gap-[10px] cursor-pointer shadow-shortcut max-lg:gap-2 max-lg:p-2 max-md:p-[6px] max-md:gap-[6px]",
    className
  )
  
  const content = (
    <>
      <div className={cn("p-[3px] rounded-lg", color)}>{icon}</div>
      <div className="flex flex-col gap-[2px]">
        <span
          className={cn(
            "font-medium truncate leading-none !bg-transparent text-base",
            color
          )}
        >
          {title}
        </span>
        <span className="text-text-grey leading-none text-xs">
          {description}
        </span>
      </div>
    </>
  );
  
  return <Link href={path} className={classNameProp}>{content}</Link>
};

export default ShortcutCard;