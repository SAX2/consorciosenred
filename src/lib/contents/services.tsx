import { IconAutomaticGearbox, IconBook, IconBriefcase, IconBuilding, IconCalendar, IconChartBar, IconCheck, IconCloudDownload, IconCoins, IconFile, IconGavel, IconHeadset, IconMailUp, IconReceipt, IconReceipt2, IconSettings, IconShieldLock } from "@tabler/icons-react";
import { mobileBookingPreviewIphone, mobileAdminPreviewIphone, mobileAppInstallPreviewIphone } from "../images";

// const services = {
//   title: "Nuestros servicios",
//   page: {
//     path: "/servicios",
//     title: "servicios",
//     button: "know-more"
//   },
//   bento: [
//     {
//       title: "Gestión de Pagos",
//       description: "Simplifique sus finanzas: liquidaciones, avisos y notificaciones en un solo lugar",
//       icon: <div className="flex items-center justify-center w-full h-full max-md:relative max-md:w-[250px]"><IconCoins height={200} width={200} className="w-fit h-auto max-md:w-[160px] max-md:h-[160px] max-md:absolute max-md:top-auto max-md:-right-[45%]  text-blue-sec" /></div>,
//       page: {
//         path: "",
//         name: "",
//         button: "string",
//       },
//       bento: "row-span-4 col-span-1 bg-blue side-a text-white justify-end flex-col gap-1 max-md:flex-row-reverse max-md:!py-6"
//     },
//     {
//       title: "Gestión de Nómina",
//       description: "Administre sueldos y recibos de consorcios con facilidad",
//       icon: <div className="flex items-center justify-center w-full h-full pb-4 max-md:relative max-md:w-[250px] max-md:pb-0"><IconReceipt2 height={175} width={175} className="w-fit h-auto max-md:w-[160px] max-md:h-[160px] max-md:absolute max-md:top-auto max-md:-right-[45%] text-green-sec" /></div>,
//       page: {
//         path: "",
//         name: "",
//         button: "string",
//       },
//       bento: "row-span-3 col-span-2 bg-green side-b text-[#183300] flex-col justify-end gap-1 max-md:flex-row-reverse max-md:!py-6"
//     },
//     {
//       title: "Documentación Digital",
//       description: "Acceso seguro 24/7 a todos sus documentos importantes",
//       icon: <div className="flex items-center justify-center w-full h-full pb-4 max-md:relative max-md:w-[250px] max-md:pb-0"><IconCloudDownload height={175} width={175} className="w-fit h-auto max-md:w-[160px] max-md:h-[160px] max-md:absolute max-md:top-auto max-md:-right-[45%] text-yellow-sec" /></div>,
//       page: {
//         path: "",
//         name: "",
//         button: "string",
//       },
//       bento: "row-span-3 col-span-3 bg-yellow side-c text-[#826C00] flex-col justify-end gap-1 max-md:flex-row-reverse max-md:!py-6"
//     },
//     {
//       title: "Asambleas y Reglamentos",
//       description: "Manténgase informado: acceda a actas, notas y reglamentos actualizados",
//       icon: <div className="flex items-center justify-center relative w-[250px] h-full max-md:relative max-md:w-[250px]"><IconBook height={130} width={130} className="w-fit h-auto text-yellow-sec absolute top-auto -right-[45%] max-md:w-[160px] max-md:h-[160px] max-md:absolute max-md:top-auto max-md:-right-[45%]" /></div>,
//       page: {
//         path: "",
//         name: "",
//         button: "string",
//       },
//       bento: "row-span-1 col-span-2 bg-yellow side-d text-[#826C00] flex-row-reverse max-md:flex-row-reverse max-md:!py-6",
//     },
//     {
//       title: "Reservas de Amenities",
//       description: "Reserve áreas comunes fácilmente, para propietarios y administradores",
//       icon: <div className="flex items-center justify-center relative w-[250px] h-full max-md:relative max-md:w-[250px]"><IconCalendar height={130} width={130} className="w-fit h-auto text-green-sec absolute top-auto -right-[45%] max-md:w-[160px] max-md:h-[160px] max-md:absolute max-md:top-auto max-md:-right-[45%]" /></div>,
//       page: {
//         path: "",
//         name: "",
//         button: "string",
//       },
//       bento: "row-span-1 col-span-2 bg-green side-e text-[#183300] flex-row-reverse max-md:flex-row-reverse max-md:!py-6"
//     },
//     {
//       title: "Seguimiento Legal",
//       description: "Monitoree procesos legales con informes detallados y actualizaciones",
//       icon: <div className="flex items-center justify-center w-full h-full pb-4 max-md:relative max-md:w-[250px] max-md:pb-0"><IconGavel height={175} width={175} className="w-fit h-auto text-blue-sec max-md:w-[160px] max-md:h-[160px] max-md:absolute max-md:top-auto max-md:-right-[45%]" /></div>,
//       page: {
//         path: "",
//         name: "",
//         button: "string",
//       },
//       bento: "row-span-1 col-span-2 bg-blue side-f text-white flex-col justify-end gap-1 max-md:flex-row-reverse max-md:!py-6"
//     },
//     {
//       title: "Administración de Unidades",
//       description: "Gestione múltiples propiedades desde una única plataforma",
//       icon: <div className="flex items-center justify-center w-full h-full pb-4 max-md:relative max-md:w-[250px] max-md:pb-0"><IconBuilding height={175} width={175} className="w-fit h-auto text-green-sec max-md:w-[160px] max-md:h-[160px] max-md:absolute max-md:top-auto max-md:-right-[45%]" /></div>,
//       page: {
//         path: "",
//         name: "",
//         button: "string",
//       },
//       bento: "row-span-1 col-span-2 bg-green side-g text-[#183300] flex-col justify-end gap-1 max-md:flex-row-reverse max-md:!py-6"
//     },
//     {
//       title: "Atención al Cliente",
//       description: "Resolución eficiente de reclamos y comunicación directa",
//       icon: <div className="flex items-center justify-center w-full h-full pb-4 max-md:relative max-md:w-[250px] max-md:pb-0"><IconHeadset height={175} width={175} className="w-fit h-auto text-blue-sec max-md:w-[160px] max-md:h-[160px] max-md:absolute max-md:top-auto max-md:-right-[45%]" /></div>,
//       page: {
//         path: "",
//         name: "",
//         button: "string",
//       },
//       bento: "row-span-1 col-span-2 bg-blue side-h text-white flex-col justify-end gap-1 max-md:flex-row-reverse max-md:!py-6"
//     },
//   ]
// }

const services = [
  {
    pill: "Integral",
    title: "La mejor manera de gestionar consorcios.",
    description: "Vea y gestione todos los aspectos de su consorcio en un formato ideal. Soporte completo para todas las funciones, desde pagos y documentos hasta reservas y comunicaciones.",
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
    image: mobileBookingPreviewIphone,
    mainColor: "text-green",
  },
  {
    pill: "Sencillo",
    title: "Gestione los consorcios que le importan.",
    description: "Manténgase al día con consorcios ilimitados en modo de visualización y reciba notificaciones en tiempo real sobre cualquier nueva actividad.",
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
    image: mobileAdminPreviewIphone,
    mainColor: "text-yellow-sec",
  },
  {
    pill: "Eficiente",
    title: "Optimice sus operaciones diarias.",
    description: "Automatice tareas rutinarias, reduzca errores y mejore la eficiencia general de la administración de consorcios.",
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
    image: mobileAdminPreviewIphone,
    mainColor: "text-blue",
  },
]

export const appInstall = {
  image: mobileAppInstallPreviewIphone,
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