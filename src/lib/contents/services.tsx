import { IconBook, IconBuilding, IconCalendar, IconCloudDownload, IconCoins, IconGavel, IconHeadset, IconReceipt2 } from "@tabler/icons-react";

const services = {
  title: "Nuestros servicios",
  page: {
    path: "/servicios",
    title: "servicios",
    button: "know-more"
  },
  bento: [
    {
      title: "Gestión de Pagos",
      description: "Simplifique sus finanzas: liquidaciones, avisos y notificaciones en un solo lugar",
      icon: <div className="flex items-center justify-center w-full h-full max-md:relative max-md:w-[250px]"><IconCoins height={200} width={200} className="w-fit h-auto max-md:w-[160px] max-md:h-[160px] max-md:absolute max-md:top-auto max-md:-right-[45%]  text-blue-sec" /></div>,
      page: {
        path: "",
        name: "",
        button: "string",
      },
      bento: "row-span-4 col-span-1 bg-blue side-a text-white justify-end flex-col gap-1 max-md:flex-row-reverse max-md:!py-6"
    },
    {
      title: "Gestión de Nómina",
      description: "Administre sueldos y recibos de consorcios con facilidad",
      icon: <div className="flex items-center justify-center w-full h-full pb-4 max-md:relative max-md:w-[250px] max-md:pb-0"><IconReceipt2 height={175} width={175} className="w-fit h-auto max-md:w-[160px] max-md:h-[160px] max-md:absolute max-md:top-auto max-md:-right-[45%] text-green-sec" /></div>,
      page: {
        path: "",
        name: "",
        button: "string",
      },
      bento: "row-span-3 col-span-2 bg-green side-b text-[#183300] flex-col justify-end gap-1 max-md:flex-row-reverse max-md:!py-6"
    },
    {
      title: "Documentación Digital",
      description: "Acceso seguro 24/7 a todos sus documentos importantes",
      icon: <div className="flex items-center justify-center w-full h-full pb-4 max-md:relative max-md:w-[250px] max-md:pb-0"><IconCloudDownload height={175} width={175} className="w-fit h-auto max-md:w-[160px] max-md:h-[160px] max-md:absolute max-md:top-auto max-md:-right-[45%] text-yellow-sec" /></div>,
      page: {
        path: "",
        name: "",
        button: "string",
      },
      bento: "row-span-3 col-span-3 bg-yellow side-c text-[#826C00] flex-col justify-end gap-1 max-md:flex-row-reverse max-md:!py-6"
    },
    {
      title: "Asambleas y Reglamentos",
      description: "Manténgase informado: acceda a actas, notas y reglamentos actualizados",
      icon: <div className="flex items-center justify-center relative w-[250px] h-full max-md:relative max-md:w-[250px]"><IconBook height={130} width={130} className="w-fit h-auto text-yellow-sec absolute top-auto -right-[45%] max-md:w-[160px] max-md:h-[160px] max-md:absolute max-md:top-auto max-md:-right-[45%]" /></div>,
      page: {
        path: "",
        name: "",
        button: "string",
      },
      bento: "row-span-1 col-span-2 bg-yellow side-d text-[#826C00] flex-row-reverse max-md:flex-row-reverse max-md:!py-6",
    },
    {
      title: "Reservas de Amenities",
      description: "Reserve áreas comunes fácilmente, para propietarios y administradores",
      icon: <div className="flex items-center justify-center relative w-[250px] h-full max-md:relative max-md:w-[250px]"><IconCalendar height={130} width={130} className="w-fit h-auto text-green-sec absolute top-auto -right-[45%] max-md:w-[160px] max-md:h-[160px] max-md:absolute max-md:top-auto max-md:-right-[45%]" /></div>,
      page: {
        path: "",
        name: "",
        button: "string",
      },
      bento: "row-span-1 col-span-2 bg-green side-e text-[#183300] flex-row-reverse max-md:flex-row-reverse max-md:!py-6"
    },
    {
      title: "Seguimiento Legal",
      description: "Monitoree procesos legales con informes detallados y actualizaciones",
      icon: <div className="flex items-center justify-center w-full h-full pb-4 max-md:relative max-md:w-[250px] max-md:pb-0"><IconGavel height={175} width={175} className="w-fit h-auto text-blue-sec max-md:w-[160px] max-md:h-[160px] max-md:absolute max-md:top-auto max-md:-right-[45%]" /></div>,
      page: {
        path: "",
        name: "",
        button: "string",
      },
      bento: "row-span-1 col-span-2 bg-blue side-f text-white flex-col justify-end gap-1 max-md:flex-row-reverse max-md:!py-6"
    },
    {
      title: "Administración de Unidades",
      description: "Gestione múltiples propiedades desde una única plataforma",
      icon: <div className="flex items-center justify-center w-full h-full pb-4 max-md:relative max-md:w-[250px] max-md:pb-0"><IconBuilding height={175} width={175} className="w-fit h-auto text-green-sec max-md:w-[160px] max-md:h-[160px] max-md:absolute max-md:top-auto max-md:-right-[45%]" /></div>,
      page: {
        path: "",
        name: "",
        button: "string",
      },
      bento: "row-span-1 col-span-2 bg-green side-g text-[#183300] flex-col justify-end gap-1 max-md:flex-row-reverse max-md:!py-6"
    },
    {
      title: "Atención al Cliente",
      description: "Resolución eficiente de reclamos y comunicación directa",
      icon: <div className="flex items-center justify-center w-full h-full pb-4 max-md:relative max-md:w-[250px] max-md:pb-0"><IconHeadset height={175} width={175} className="w-fit h-auto text-blue-sec max-md:w-[160px] max-md:h-[160px] max-md:absolute max-md:top-auto max-md:-right-[45%]" /></div>,
      page: {
        path: "",
        name: "",
        button: "string",
      },
      bento: "row-span-1 col-span-2 bg-blue side-h text-white flex-col justify-end gap-1 max-md:flex-row-reverse max-md:!py-6"
    },
  ]
}

export default services;