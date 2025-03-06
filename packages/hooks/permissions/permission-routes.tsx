import { ShortcutProps } from "app/types/globals";
import { IconAlertTriangle, IconBell, IconBellRinging, IconBook, IconCalendar, IconCreditCard, IconGavel, IconPackages, IconUsers, IconWallet, IconCalendarFilled, IconBox } from "@tabler/icons-react";
import Image from "next/image";
import Mp from 'app/assets/images/mp.png'
import Siro from 'app/assets/images/siro.png'

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
      icon: <IconAlertTriangle width={32} height={32}  />,
      path: "/reclamos/nuevo",
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
      icon: <IconCalendar width={32} height={32}  />,
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
    descriptionShortcut: {
      title: "Siro Online",
      description: "El Servicio Integral del Banco Roela ",
      icon: <Image src={Siro} style={{ width: 36, height: 36 }} alt="Siro"/>,
      path: "/pagar/hb",
      display: "icon-bg-description",
      style: {
        background: "#fff",
        color: "#1F9163",
      },
      isBottomSheet: false,
    },
    backgroundShortcut: {
      title: "Pagar expensa",
      description: "Pagar expensa",
      icon: <IconWallet width={24} height={24} className="text-white" />,
      path: "/pagar",
      display: "icon-bg",
      style: {
        background: "#1F9163",
        color: "#1F9163",
      },
      isBottomSheet: true,
    },
  },
  ver_pagarMercadoPago: {
    descriptionShortcut: {
      title: "Mercado pago",
      description: "Pagar con la plataforma digital",
      icon: <Image src={Mp} style={{ width: 36, height: 36 }} alt="Mp" />,
      path: "/pagar/mp",
      display: "icon-bg-description",
      style: {
        background: "#9CE0FF",
        color: "#1F9163",
      },
      isBottomSheet: false,
    },
    backgroundShortcut: {
      title: 'Notificar pago',
      description: 'Notificar pago',
      icon: <IconBellRinging width={24} height={24} className="text-white" />,
      path: '/pagar',
      display: "icon-bg",
      style: {
        background: "#008AEA",
        color: "#086FB7",
      },
    },
  },
  ver_notificarPago: {
    simpleShortcut: {
      title: "Notificar pago",
      description: "Notificar pago",
      icon: <IconBellRinging width={32} height={32}  />,
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
        color: "#008AEA",
      },
    }
  },
};

export const DEFAULT_ROUTES = ({ size = 22 }: {size?: number}) => ([
  {
    "/[id]": {
      unitMenuItem: {
        description: "Unidad",
        position: 1,
        title: "UNIDAD",
        icon: <IconBox size={size} />,
        path: "",
      }
    }
  },
  {
    "/asambleas": {
      unitMenuItem: {
        description: "Asambleas",
        position: 1,
        title: "ASAMBLEAS",
        icon: <IconUsers size={size} />,
        path: "/asambleas",
      },
    },
  },
  {
    "/novedades": {
      unitMenuItem: {
        description: "Novedades",
        position: 1,
        title: "NOVEDADES",
        icon: <IconBell size={size} />,
        path: "/novedades",
      },
    },
  },
  {
    "/reglamento": {
      unitMenuItem: {
        description: "Reglamento",
        position: 1,
        title: "REGLAMENTO",
        icon: <IconBook size={size} />,
        path: "/reglamento",
      },
    },
  },
  {
    "/": {
      unitMenuItem: {
        description: "Todas las unidades",
        position: 1,
        title: "TODAS LAS UNIDADES",
        icon: <IconPackages size={size} />,
        path: "/prp/expensas",
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
      description: "Juicios",
      postition: 1,
      title: "JUICIOS",
      icon: <IconGavel size={size}/>,
      path: "/juicios",
    },
  },
  ver_rcl: {
    route: {
      name: "/reclamos",
    },
    unitMenuItem: {
      description: "Reclamos",
      position: 1,
      title: "RECLAMOS",
      icon: <IconAlertTriangle size={size} />,
      path: "/reclamos",
    },
  },
  ver_res: {
    route: {
      name: "/reservas",
    },
    unitMenuItem: {
      description: "Reservas",
      position: 1,
      title: "RESERVAS",
      icon: <IconCalendar size={size}/>,
      path: "/reservas",
    },
  },
  ver_cob: {
    route: {
      name: "/pagos",
    },
    unitMenuItem: {
      description: "Pagos",
      position: 1,
      title: "PAGOS",
      icon: <IconCreditCard size={size} />,
      path: "/pagos",
    },
  },
});