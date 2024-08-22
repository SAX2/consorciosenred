import dynamic from "next/dynamic";
import { IconAlertTriangle, IconBellRinging, IconStar, IconWallet } from "@tabler/icons-react";

const NewRcl = dynamic(() => import("@/containers/rcl-page/new-rcl"), { ssr: false, });

export const shortcutsPayemnt = [
  {
    path: "#",
    color: "icon-green",
    title: "Pagar expensa",
    icon: <IconWallet width={32} height={32} className="max-md:h-[28px] max-md:w-[28px]"/>,
    isActive: true,
  },
  {
    path: "#",
    color: "icon-blue",
    title: "Notificar pago",
    icon: <IconBellRinging  width={32} height={32} className="max-md:h-[28px] max-md:w-[28px]"/>,
    isActive: true,
  },
];

export const shortcuts = [
  {
    path: "#",
    color: "icon-purple",
    title: "Reservar",
    icon: <IconStar width={32} height={32} className="max-md:h-[28px] max-md:w-[28px]"/>,
    isActive: true,
  },
  {
    path: "/reclamos/nuevo",
    color: "icon-yellow",
    title: "Hacer reclamo",
    icon: <IconAlertTriangle width={32} height={32} className="max-md:h-[28px] max-md:w-[28px]"/>,
    isActive: true,
    isModal: true,
    modalContent: <NewRcl />
  },
]