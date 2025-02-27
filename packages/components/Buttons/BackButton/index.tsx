"use client"

import { cn } from "app/lib/utils";
import { IconChevronLeft } from "@tabler/icons-react";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface BackButtonProps {
  className?: string;
  singleUnit: boolean;
}

const NO_BACK_ROUTES = ['/prp/expensas', '/', '/ingresar', '/prp/usuario'];

const BackButton: FC<BackButtonProps> = ({ className, singleUnit }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams()
  
  const segments = pathname.split('/').filter(Boolean);

  const onClick = () => {
    if (!NO_BACK_ROUTES.includes(pathname)) {
      const parentPath = `/${segments.slice(0, -1).join('/')}`;
      router.push(parentPath);
    }
  };

  const showBackButton = !NO_BACK_ROUTES.includes(pathname);

  if (params.id && params.id.length > 0 && singleUnit && segments.length <= 3) return null

  return showBackButton ? (
    <button onClick={onClick} className={cn('flex items-center', className)}>
      <IconChevronLeft size={26} />
    </button>
  ) : null;
}

export default BackButton;
