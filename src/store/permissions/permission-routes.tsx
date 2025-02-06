import { ShortcutProps } from "@/types/globals";
import { IconAlertTriangle, IconBell, IconBellRinging, IconBook, IconCalendar, IconCreditCard, IconGavel, IconPackages, IconUsers, IconWallet, IconCalendarFilled, IconBox } from "@tabler/icons-react";

export interface ShortcutPropsMapping {
  simpleShortcut?: ShortcutProps;
  descriptionShortcut?: ShortcutProps;
  backgroundShortcut?: ShortcutProps;
}

export interface ActionsProps {
  [key: string]: {
    simpleShortcut?: ShortcutProps;
    descriptionShortcut?: ShortcutProps;
    backgroundShortcut?: ShortcutProps;
  }
}

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

export const DEFAULT_ROUTES = ({ size = 22 }: {size?: number}) => ([
  {
    "/[id]": {
      unitMenuItem: {
        descripcion: "Unidad",
        posicion: 1,
        colorFondo: "",
        titulo: "UNIDAD",
        iconoWeb: <IconBox size={size} />,
        url: "",
      }
    }
  },
  {
    "/asambleas": {
      unitMenuItem: {
        descripcion: "Asambleas",
        posicion: 1,
        colorFondo: "",
        titulo: "ASAMBLEAS",
        iconoWeb: <IconUsers size={size} />,
        url: "/asambleas",
      },
    },
  },
  {
    "/novedades": {
      unitMenuItem: {
        descripcion: "Novedades",
        posicion: 1,
        colorFondo: "",
        titulo: "NOVEDADES",
        iconoWeb: <IconBell size={size} />,
        url: "/novedades",
      },
    },
  },
  {
    "/reglamento": {
      unitMenuItem: {
        descripcion: "Reglamento",
        posicion: 1,
        colorFondo: "",
        titulo: "REGLAMENTO",
        iconoWeb: <IconBook size={size} />,
        url: "/reglamento",
      },
    },
  },
  {
    "/": {
      unitMenuItem: {
        descripcion: "Todas las unidades",
        posicion: 1,
        colorFondo: "",
        titulo: "TODAS LAS UNIDADES",
        iconoWeb: <IconPackages size={size} />,
        url: "/prp/expensas",
      },
    },
  },
])

export const NAVIGATION_TABS = ({ size = 22 }: {size?: number}) => ({
  ver_jui: {
    route: {
      name: "/juicios",
    },
    unitMenuItem: {
      descripcion: "Juicios",
      posicion: 1,
      colorFondo: "",
      titulo: "JUICIOS",
      iconoWeb: <IconGavel size={size}/>,
      url: "/juicios",
    },
  },
  ver_rcl: {
    route: {
      name: "/reclamos",
    },
    unitMenuItem: {
      descripcion: "Reclamos",
      posicion: 1,
      colorFondo: "",
      titulo: "RECLAMOS",
      iconoWeb: <IconAlertTriangle size={size} />,
      url: "/reclamos",
    },
  },
  ver_res: {
    route: {
      name: "/reservas",
    },
    unitMenuItem: {
      descripcion: "Reservas",
      posicion: 1,
      colorFondo: "",
      titulo: "RESERVAS",
      iconoWeb: <IconCalendar size={size}/>,
      url: "/reservas",
    },
  },
  ver_cob: {
    route: {
      name: "/pagos",
    },
    unitMenuItem: {
      descripcion: "Pagos",
      posicion: 1,
      colorFondo: "",
      titulo: "PAGOS",
      iconoWeb: <IconCreditCard size={size} />,
      url: "/pagos",
    },
  },
});