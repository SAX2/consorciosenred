import { IconBell, IconPlus, IconStar, IconWallet } from "@tabler/icons-react";

export const shortcuts = [
  {
    color: "icon-green",
    title: "Pagar expensas",
    icon: <IconWallet width={20} height={20} />,
    isActive: true,
  },
  {
    color: "icon-yellow",
    title: "Hacer reclamo",
    icon: <IconPlus width={20} height={20} />,
    isActive: true,
  },
  {
    color: "icon-purple",
    title: "Reservar",
    icon: <IconStar width={20} height={20} />,
    isActive: true,
  },
  {
    color: "icon-blue",
    title: "Notificar pago",
    icon: <IconWallet width={20} height={20} />,
    isActive: true,
  },
];