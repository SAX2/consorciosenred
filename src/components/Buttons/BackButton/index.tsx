"use client"

import { cn } from "@/lib/utils";
import { IconChevronLeft } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface BackButtonProps {
  className?: string;
}

const NO_BACK_ROUTES = ['/prp/expensas', '/', '/ingresar'];

const BackButton: FC<BackButtonProps> = ({ className }) => {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    if (!NO_BACK_ROUTES.includes(pathname)) {
      const segments = pathname.split('/').filter(Boolean);
      const parentPath = `/${segments.slice(0, -1).join('/')}`;
      router.push(parentPath);
    }
  };

  const showBackButton = !NO_BACK_ROUTES.includes(pathname);

  return showBackButton ? (
    <button onClick={onClick} className={cn('flex items-center', className)}>
      <IconChevronLeft width={24} height={24} />
    </button>
  ) : null;
}

export default BackButton;
