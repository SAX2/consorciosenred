import {
  IconAutomaticGearbox,
  IconBook,
  IconBriefcase,
  IconCalendar,
  IconChartBar,
  IconCheck,
  IconFile,
  IconGavel,
  IconHeadset,
  IconMailUp,
  IconReceipt,
  IconReceipt2,
  IconSettings,
  IconShieldLock,
} from "@tabler/icons-react";
import {
  mobileAppInstallPreview,
  mobileCalendar,
  mobileRcl,
  mobileUnit,
} from "../images";

const services = [
  {
    pill: "Integral",
    title: "La mejor manera de gestionar consorcios.",
    description:
      "Vea y gestione todos los aspectos de su consorcio en un formato ideal. Soporte completo para todas las funciones, desde pagos y documentos hasta reservas y comunicaciones.",
    items: [
      {
        title: "Gestión de Pagos",
        icon: <IconReceipt2 height={24} width={24} />,
      },
      {
        title: "Reservas",
        icon: <IconCalendar height={24} width={24} />,
      },
      {
        title: "Gestión de Nomina",
        icon: <IconReceipt height={24} width={24} />,
      },
      {
        title: "Seguimiento Legal",
        icon: <IconGavel height={24} width={24} />,
      },
      {
        title: "Archivos Digitales",
        icon: <IconFile height={24} width={24} />,
      },
      {
        title: "Atención al Cliente",
        icon: <IconHeadset height={24} width={24} />,
      },
      {
        title: "Normativa",
        icon: <IconBook height={24} width={24} />,
      },
    ],
    image: mobileCalendar,
    mainColor: "text-green",
  },
  {
    pill: "Sencillo",
    title: "Gestione los consorcios que le importan.",
    description:
      "Manténgase al día con consorcios ilimitados en modo de visualización y reciba notificaciones en tiempo real sobre cualquier nueva actividad.",
    items: [
      {
        title: "Acceso Móvil",
        icon: <IconCheck height={24} width={24} />,
      },
      {
        title: "Personalizable",
        icon: <IconCheck height={24} width={24} />,
      },
      {
        title: "Reportes",
        icon: <IconCheck height={24} width={24} />,
      },
      {
        title: "Notificaciones",
        icon: <IconCheck height={24} width={24} />,
      },
      {
        title: "Seguimiento de Gastos",
        icon: <IconCheck height={24} width={24} />,
      },
      {
        title: "Comunicación",
        icon: <IconCheck height={24} width={24} />,
      },
      {
        title: "Gestione Cualquier Consorcio",
        icon: <IconCheck height={24} width={24} />,
      },
      {
        title: "Integra Bancos",
        icon: <IconCheck height={24} width={24} />,
      },
    ],
    image: mobileRcl,
    mainColor: "text-yellow-sec",
  },
  {
    pill: "Eficiente",
    title: "Optimice sus operaciones diarias.",
    description:
      "Automatice tareas rutinarias, reduzca errores y mejore la eficiencia general de la administración de consorcios.",
    items: [
      {
        title: "Análisis de Gastos",
        icon: <IconChartBar height={24} width={24} />,
      },
      {
        title: "Seguridad Avanzada",
        icon: <IconShieldLock height={24} width={24} />,
      },
      {
        title: "Automatización",
        icon: <IconAutomaticGearbox height={24} width={24} />,
      },
      {
        title: "Mantenimientos",
        icon: <IconSettings height={24} width={24} />,
      },
      {
        title: "Comunica en Masa",
        icon: <IconMailUp height={24} width={24} />,
      },
      {
        title: "Gestión de Proveedores",
        icon: <IconBriefcase height={24} width={24} />,
      },
      {
        title: "",
        icon: <div></div>,
      },
    ],
    image: mobileUnit,
    mainColor: "text-blue",
  },
];

export const appInstall = {
  image: mobileAppInstallPreview,
  title: "Pruebe Ahora Nuestras Apps \n para una Gestión Simplificada",
  content: [
    {
      page: {
        path: "/propietarios",
        title: "propietarios",
        button: "Soy propietario",
        className: "hover:bg-green/15 text-green",
      },
    },
    {
      page: {
        path: "/administradores",
        title: "administadores",
        button: "Administradores",
        className: "hover:bg-yellow/15 text-yellow",
      },
    },
  ],
};

export default services;
