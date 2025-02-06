import { ShortcutProps } from "@/types/globals";
import { IconAlertTriangle, IconBell, IconBellRinging, IconBook, IconCalendar, IconCreditCard, IconGavel, IconPackages, IconUsers, IconWallet, IconCalendarFilled } from "@tabler/icons-react";

export interface ShortcutPropsMapping {
  simpleShortcut?: ShortcutProps;
  descriptionShortcut?: ShortcutProps;
  backgroundShortcut?: ShortcutProps;
}

export type ActionsProps = Record<string, ShortcutPropsMapping>;

export const ACTIONS: ActionsProps = {
  ver_rcl: {
    simpleShortcut: {
      title: "Reclamar",
      description: "Reclamar",
      icon: <IconAlertTriangle width={32} height={32} className="text-black" />,
      path: "/reclamos/reclamar",
    },
    descriptionShortcut: {
      title: "Hacer un reclamo",
      description: "Encuentra soluciones",
      icon: (
        <IconAlertTriangle width={36} height={36} className="text-[#F66600]" />
      ),
      display: "icon-bg-description",
      style: {
        background: "#F6660015",
        color: "#F66600",
      },
      path: "/reclamos/nuevo",
    },
  },
  ver_res: {
    simpleShortcut: {
      title: "Reservar",
      description: "Reservar",
      icon: <IconCalendar width={32} height={32} className="text-black" />,
      path: "/reservas/reservar",
    },
    descriptionShortcut: {
      title: "Hacer una reserva",
      description: "Planifica tu próxima reserva",
      icon: <IconCalendarFilled width={36} height={36} className="fill-[#A87EFF]" strokeWidth={0} />,
      path: "/reservas/reservar",
      display: "icon-bg-description",
      style: {
        background: "#A87EFF15",
        color: "#A87EFF",
      },
    },
  },
  ver_pagarHomeBanking: {
    simpleShortcut: {
      title: "Reservar",
      description: "Reservar",
      icon: <IconWallet width={32} height={32} className="text-black" />,
      path: "/pagos/pagar",
    },
    descriptionShortcut: {
      title: "Pagar expensa",
      description: "Abonar expensa de la unidad",
      icon: <IconWallet width={36} height={36} className="text-[#1F9163]" />,
      path: "/pagos/pagar",
      display: "icon-bg-description",
      style: {
        background: "#1F916315",
        color: "#1F9163",
      },
      isBottomSheet: true,
    },
    backgroundShortcut: {
      title: "Pagar expensa",
      description: "Pagar expensa",
      icon: <IconWallet width={24} height={24} className="text-white" />,
      path: "/",
      display: "icon-bg",
      style: {
        background: "#1F9163",
        color: "#1F9163",
      },
      isBottomSheet: true,
    },
  },
  ver_pagarMercadoPago: {
    simpleShortcut: {
      title: "Reservar",
      description: "Reservar",
      icon: <IconWallet width={32} height={32} className="text-black" />,
      path: "/pagos/pagar",
    },
    descriptionShortcut: {
      title: "Pagar expensa",
      description: "Abonar expensa de la unidad",
      icon: <IconWallet width={36} height={36} className="text-[#1F9163]" />,
      path: "/pagos/pagar",
      display: "icon-bg-description",
      style: {
        background: "#1F916315",
        color: "#1F9163",
      },
      isBottomSheet: true,
    },
    backgroundShortcut: {
      title: "Pagar expensa",
      description: "Pagar expensa",
      icon: <IconWallet width={24} height={24} className="text-white" />,
      path: "/",
      display: "icon-bg",
      style: {
        background: "#1F9163",
        color: "#1F9163",
      },
      isBottomSheet: true,
    },
  },
  ver_notificarPago: {
    simpleShortcut: {
      title: "Notificar pago",
      description: "Notificar pago",
      icon: <IconBellRinging width={32} height={32} className="text-black" />,
      path: "/pagos/nuevo",
    },
    descriptionShortcut: {
      title: "Notificar pago",
      description: "Rápido y fácil",
      icon: (
        <IconBellRinging width={36} height={36} className="text-[#3FA4EA]" />
      ),
      path: "/pagos/nuevo",
      display: "icon-bg-description",
      style: {
        background: "#3FA4EA15",
        color: "#3FA4EA",
      },
    },
    backgroundShortcut: {
      title: "Notificar pago",
      description: "Notificar pago",
      icon: <IconWallet width={24} height={24} className="text-white" />,
      path: "/pagos/nuevo",
      display: "icon-bg",
      style: {
        background: "#008AEA",
        color: "#086FB7",
      },
    }
  },
};

export const DEFAULT_ROUTES = [
  {
    "[id]/asambleas/index": {
      unitMenuItem: {
        title: "Asambleas",
        icon: <IconUsers size={36} className="text-black" />,
        path: "/asambleas",
        display: "icon-bg-description",
        style: {
          background: "#F9F9F9",
          color: "#0a0a0a",
        },
        isBottomSheet: true,
        classNameTitleMainIconBgDesc: "!text-xl font-semibold",
      },
    },
  },
  {
    "[id]/novedades/index": {
      unitMenuItem: {
        title: "Novedades",
        icon: <IconBell size={36} className="text-black" />,
        path: "/novedades",
        display: "icon-bg-description",
        style: {
          background: "#F9F9F9",
          color: "#0a0a0a",
        },
        classNameTitleMainIconBgDesc: "!text-xl font-semibold",
      },
    },
  },
  {
    "[id]/reglamento/index": {
      unitMenuItem: {
        title: "Reglamento",
        icon: <IconBook size={36} className="text-black" />,
        path: "/reglamento",
        display: "icon-bg-description",
        style: {
          background: "#F9F9F9",
          color: "#0a0a0a",
        },
        isBottomSheet: true,
        classNameTitleMainIconBgDesc: "!text-xl font-semibold",
      },
    },
  },
  {
    "/": {
      unitMenuItem: {
        title: "Todas las unidades",
        icon: <IconPackages size={36} className="text-black" />,
        display: "icon-bg-description",
        path: "",
        style: {
          background: "#F9F9F9",
          color: "#0a0a0a",
        },
        // handlePress: popToTop,
        isBottomSheet: true,
        classNameTitleMainIconBgDesc: "!text-xl font-semibold",
      },
    },
  },
];

export const NAVIGATION_TABS = {
  ver_jui: {
    route: {
      name: "[id]/juicios",
    },
    unitMenuItem: {
      title: "Juicios",
      icon: <IconGavel size={36} className="text-black" />,
      path: "/juicios",
      display: "icon-bg-description",
      style: {
        background: "#F9F9F9",
        color: "#0a0a0a",
      },
      isBottomSheet: true,
      classNameTitleMainIconBgDesc: "!text-xl font-semibold",
    },
  },
  ver_rcl: {
    route: {
      name: "[id]/reclamos",
    },
    unitMenuItem: {
      title: "Reclamos",
      icon: <IconAlertTriangle size={36} className="text-black" />,
      display: "icon-bg-description",
      style: {
        background: "#F9F9F9",
        color: "#0a0a0a",
      },
      path: "/reclamos",
      classNameTitleMainIconBgDesc: "!text-xl font-semibold",
    },
  },
  ver_res: {
    route: {
      name: "[id]/reservas",
    },
    unitMenuItem: {
      title: "Reservas",
      icon: <IconCalendar size={36} className="text-black" />,
      path: "/reservas",
      display: "icon-bg-description",
      style: {
        background: "#F9F9F9",
        color: "#0a0a0a",
      },
      classNameTitleMainIconBgDesc: "!text-xl font-semibold",
    },
  },
  ver_cob: {
    route: {
      name: "[id]/pagos",
    },
    unitMenuItem: {
      title: "Pagos",
      icon: <IconCreditCard size={36} className="text-black" />,
      path: "/pagos",
      display: "icon-bg-description",
      style: {
        background: "#F9F9F9",
        color: "#0a0a0a",
      },
      classNameTitleMainIconBgDesc: "!text-xl font-semibold",
    },
  },
};