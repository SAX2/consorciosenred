import { IconBox, IconAlertTriangle, IconStar, IconDots, IconCalendar, IconSoccerField, IconMeat, IconMicrophone2, IconBalloon, IconBallTennis, IconHomeUp, IconBallFootball, IconRipple, IconWallet, IconReceipt, IconBellRinging, IconPhone } from "@tabler/icons-react"
import { ShortcutProps } from "app/types/globals"
import { toast } from "sonner"
import Toast from "@/components/toast"
import { Popover, PopoverContent, PopoverTrigger } from "app/components/ui/popover"
import ActionsDropdown from "app/components/Buttons/ButtonShortcut/List/_ActionsDropdown"

export const unitCard = {
    liquidation: "Ver Liquidación",
    payment_notice: "Ver Aviso de Pago",
    import_to_pay: "Importe a pagar",
    expirations: {
        title: "Vencimientos",
        0: "Vencimiento 1",
        1: "Vencimiento 2"
    },
    debts: {
        title: "Deudas",
        0: "Expensas adeudadas",
        1: "Intereses acumulados"
    },
    expense: "Expensas del mes"
}

export const payment = {
  fecha: "Fecha de pago",
  comprobante: "Codigo de comprobante",
  mensaje: "Mensaje",
  sheetTitle: "Detalles del pago",
  importe: "Importe pagado",
  archivos: {
    title: "Adjuntos",
    comprobantes: "Comprobante",
  },
  notify: {
    importeTotal: "Importe total a pagar",
    intereses: "Intereses acumulados",
    deudas: "Deudas acumuladas",
    expensa: "Ultima expensa",
  },
};

export const details = {
  issue: {
    about: "Reclamo sobre",
    type: "Tipo de reclamo",
    description: "Descripcion"
  }
}

export const unitMenu = [
  {
    nameMobile: '[id]',
    path: '',
    drawerLabel: 'Mi unidad',
    icon: <IconBox width={28} height={28} className="-mr-5 text-black" />,
  },
  {
    nameMobile: '[id]/reservas/index',
    path: '/reservas',
    drawerLabel: 'Reservas',
    icon: <IconCalendar width={28} height={28} className="-mr-5 text-black" />,
  },
  {
    nameMobile: '[id]/reclamos/index',
    path: '/reclamos',
    drawerLabel: 'Reclamos',
    icon: (
      <IconAlertTriangle width={28} height={28} className="-mr-5 text-black" />
    ),
  },
  {
    nameMobile: '[id]/reservas/reservar',
    path: '/reservas/reservar',
    drawerLabel: 'Reservar',
    noShow: true
  },
  {
    nameMobile: '[id]/pagos/index',
    path: '/pagos',
    drawerLabel: 'Pagos',
    icon: (
      <IconReceipt width={28} height={28} className="-mr-5 text-black" />
    ),
  },
  {
    nameMobile: '[id]/pagos/nuevo',
    path: '/pagos/nuevo',
    drawerLabel: 'Notificar pago',
    noShow: true
  },
]

export const shortcutsUnit: ShortcutProps[] = [
  {
    title: 'Reclamar',
    description: 'Reclamar',
    icon: (
      <IconAlertTriangle width={32} height={32} className="text-black dark:text-white" />
    ),
    path: '/reclamos/nuevo',
    // isBottomSheet: true,
    // handlePress: () => toast.info('hola')
  },
  {
    title: 'Reservar',
    description: 'Reservar',
    icon: (
      <IconStar width={32} height={32} className="text-black dark:text-white" />
    ),
    path: '/reservas/reservar',
  },
  {
    title: 'Acciones',
    description: 'Acciones',
    icon: (
      <IconDots width={32} height={32} className="text-black dark:text-white" />
    ),
    path: '/',
    isBottomSheet: true,
    customComponent({ shortcut }) {
      return <ActionsDropdown shortcut={shortcut} />
    },
  },
]

export const shortcutsPaymentUnit: ShortcutProps[] = [
  {
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
    // handlePress: () =>
    //   toast.custom((t) => <Toast t={t} title={toastMessages.notAvailable} />),
  },
  {
    title: "Notificar pago",
    description: "Notificar pago",
    icon: <IconWallet width={24} height={24} className="text-white" />,
    path: "/pagos/nuevo",
    display: "icon-bg",
    style: {
      background: "#008AEA",
      color: "#086FB7",
    },
  },
];

export const reserveIcon = (group: string, size: number = 48) => {
  switch (group) {
    case 'futbolFUTBOL':
      return {
        background: "#2A8D5A",
        color: "#fff",
        icon: <IconBallFootball width={size} height={size} className="text-white" />
      }
    case 'parrillaPARRILLA':
      return {
        background: "#986A46",
        color: "#fff",
        icon: <IconMeat width={size} height={size} className="text-white" />
      }
    case 'piletaPILE':
    case 'sumPILE':
      return {
        background: '#FCD800',
        color: "#fff",
        icon: <IconRipple width={size} height={size} className="text-black" />,
      }
    case 'salaEnsayosSALA': 
      return {
        background: "#008AEA",
        color: "#fff",
        icon: <IconMicrophone2 width={size} height={size} className="text-white" />,
      }
    case 'sumSUM':
      return {
        background: "#6D45A9",
        color: "#fff",
        icon: <IconBalloon width={size} height={size} className="text-white" />
      }
    case 'tenisTENIS':
      return {
        background: "#DD3246",
        color: "#fff",
        icon: <IconBallTennis width={size} height={size} className="text-white" />
      }
    case 'terrazaTERRAZA':
      return {
        background: "#986A46",
        color: "#fff",
        icon: <IconHomeUp width={size} height={size} className="text-white" />
      }
    default:
      return {
        background: "#FCD800",
        color: "#FCD800",
        icon: <IconStar width={size} height={size} className="text-black" />
      }
  }
}

export const reserveTabs = ['dia', 'mes']
export const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export const toastMessages = {
  notAvailable: 'Esta acción todavía no está disponible',
  successSend: "Se ha enviado correctamente",
}


export const colorNames = ['red', 'blue', 'green', 'yellow', 'purple']

export const userColors = [
  {
    name: 'blue',
    background: '#3FA4EA20',
    color: '#3FA4EA', 
  },
  {
    name: 'red',
    background: '#FFBBC3',
    color: '#DD3246', 
  },
  {
    name: 'green',
    background: '#A3E2C9',
    color: '#1F9163', 
  },
  {
    name: 'yellow',
    background: '#FFF1A0',
    color: '#D0B40B', 
  },
  {
    name: 'purple',
    background: '#DAC8FF',
    color: '#A764DC', 
  },
]

export const actions: ShortcutProps[] = [
  {
    title: 'Pagar expensa',
    description: 'Abonar expensa de la unidad',
    icon: <IconWallet width={36} height={36} className="text-[#1F9163]" />,
    path: '/pagos/pagar',
    display: "icon-bg-description",
    style: {
      background: "#1F916315",
      color: "#1F9163",
    },
    isBottomSheet: true,
  },
  {
    title: 'Notificar pago',
    description: 'Rápido y fácil',
    icon: <IconBellRinging width={36} height={36} className="text-[#3FA4EA]" />,
    path: '/pagos/nuevo',
    display: "icon-bg-description",
    style: {
      background: "#3FA4EA15",
      color: "#3FA4EA",
    },
    isBottomSheet: true,
  },
  {
    title: 'Hacer un reclamo',
    description: 'Encuentra soluciones',
    icon: <IconAlertTriangle width={36} height={36} className="text-[#F66600]" />,
    path: '/reclamos/reclamar',
    display: "icon-bg-description",
    style: {
      background: "#F6660015",
      color: "#F66600",
    },
    isBottomSheet: true,
  },
  {
    title: 'Hacer una reserva',
    description: 'Planifica tu próxima reserva',
    icon: <IconStar width={36} height={36} className="text-[#A87EFF]" />,
    path: '/reservas/reservar',
    display: "icon-bg-description",
    style: {
      background: "#A87EFF15",
      color: "#A87EFF",
    },
  },
  {
    title: 'Contactar con el administrador',
    description: 'Conéctate para asistencia',
    icon: <IconPhone width={36} height={36} className="text-[#91694A]" />,
    path: '/contacto/administrador',
    display: "icon-bg-description",
    style: {
      background: "#91694A15",
      color: "#91694A",
    },
    isBottomSheet: true,
  },
]