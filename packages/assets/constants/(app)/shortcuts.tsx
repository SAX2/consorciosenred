import { IconAlertTriangle, IconBell, IconBellRinging, IconStar, IconWallet } from "@tabler/icons-react";

export const shortcuts = [
  {
    color: "icon-green",
    title: "Pagar expensa",
    icon: <IconWallet width={32} height={32} className="max-md:h-[28px] max-md:w-[28px]"/>,
    isActive: true,
  },
  {
    color: "icon-purple",
    title: "Reservar",
    icon: <IconStar width={32} height={32} className="max-md:h-[28px] max-md:w-[28px]"/>,
    isActive: true,
  },
  {
    color: "icon-yellow",
    title: "Hacer reclamo",
    icon: <IconAlertTriangle width={32} height={32} className="max-md:h-[28px] max-md:w-[28px]"/>,
    isActive: true,
  },
  {
    color: "icon-blue",
    title: "Notificar pago",
    icon: <IconBellRinging  width={32} height={32} className="max-md:h-[28px] max-md:w-[28px]"/>,
    isActive: true,
  },
];