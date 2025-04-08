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
  mobileUnits,

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
  title: "Empezá ahora para una Gestión Simplificada",
  content: [
    {
      page: {
        path: "/propietarios",
        title: "propietarios",
        button: "Soy propietario",
        className: "bg-green/15 text-green",
      },
    },
    {
      page: {
        path: "/administradores",
        title: "administadores",
        button: "Administradores",
        className: "bg-yellow/15 text-yellow-sec",
      },
    },
  ],
};

export const appInstallPropietario = {
  title: "Tu Consorcio, en la Palma de tu Mano",
  description: "Consulta tus pagos, vencimientos y notificaciones en tiempo real desde cualquier lugar. Gestión fácil y segura al alcance de todos los propietarios.",
  Image: mobileUnits,
  links: [
    {
      url: "https://apps.apple.com/ar/app/sisadm-expensas/id1462481911?itscg=30200&itsct=apps_box_badge&mttnsubad=1462481911",
      title: "Descargar en el App Store",
      button: "appStore",
      badge: "https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/es-mx?releaseDate=1558569600"
    },
    {
      url: "https://play.google.com/store/apps/details?id=org.nativescript.SASA",
      title: "Descargar en el Play Store",
      button: "playStore",
      badge: "https://storage.googleapis.com/pe-portal-consumer-prod-wagtail-static/downloads_folder/Google%20Play%20Badge%20guidelines/15Wh6ThE-jQgl55mfxGdhx1M-yg9aRuUw?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=wagtail%40pe-portal-consumer-prod.iam.gserviceaccount.com%2F20250103%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250103T194927Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3DGetItOnGooglePlay_Badge_Web_color_Spanish-LATAM.png&X-Goog-Signature=014e4a6575e4086fb40a2df9ae1fd470b50bae40b8a134b3655f76d7da31eef1b10bc0d041b9a0d8c85b3e0d9221428e11e00d0ff440fcbaba1a469076d2a902c1da65fd0c384837fa7ae93b4330324d4d3bb11b8efc1c9128dc7b735bcc06a90d081e82b74bad92ec3338e4383ad272c00908a912ad02f92a9fac6fbfcaf938eff99543558deaef4526f290081e147266d478a6452cb0854b1b741bf2ac1f617bec15f7e03e7d43448dba2816eeec5e8c94e22b6fb3d388bc36167144ebec41d08afb61043027c6d237b6e59d160c869cfb469d073cab8473ebbed3c21a36f63966739fc10474f2ab0cedb5cd0d340eb720a06c749792969f1396dd6c067c6a"
    },
  ],
};

export const appInstallAdministrador = {
  title: "Administra Consorcios de Forma Eficiente",
  description: "Optimiza tus tareas diarias con herramientas avanzadas para liquidaciones, reportes y comunicación efectiva. Simplifica tu gestión desde cualquier dispositivo.",
  Image: mobileUnits,
  links: [
    {
      url: "https://apps.apple.com/ar/app/sisadm-expensas/id1462481911?itscg=30200&itsct=apps_box_badge&mttnsubad=1462481911",
      title: "Descargar en el App Store",
      button: "appStore",
      badge: "https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/es-mx?releaseDate=1558569600"
    },
    {
      url: "https://play.google.com/store/apps/details?id=org.nativescript.SASA",
      title: "Descargar en el Play Store",
      button: "playStore",
      badge: "https://storage.googleapis.com/pe-portal-consumer-prod-wagtail-static/downloads_folder/Google%20Play%20Badge%20guidelines/15Wh6ThE-jQgl55mfxGdhx1M-yg9aRuUw?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=wagtail%40pe-portal-consumer-prod.iam.gserviceaccount.com%2F20250103%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250103T194927Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3DGetItOnGooglePlay_Badge_Web_color_Spanish-LATAM.png&X-Goog-Signature=014e4a6575e4086fb40a2df9ae1fd470b50bae40b8a134b3655f76d7da31eef1b10bc0d041b9a0d8c85b3e0d9221428e11e00d0ff440fcbaba1a469076d2a902c1da65fd0c384837fa7ae93b4330324d4d3bb11b8efc1c9128dc7b735bcc06a90d081e82b74bad92ec3338e4383ad272c00908a912ad02f92a9fac6fbfcaf938eff99543558deaef4526f290081e147266d478a6452cb0854b1b741bf2ac1f617bec15f7e03e7d43448dba2816eeec5e8c94e22b6fb3d388bc36167144ebec41d08afb61043027c6d237b6e59d160c869cfb469d073cab8473ebbed3c21a36f63966739fc10474f2ab0cedb5cd0d340eb720a06c749792969f1396dd6c067c6a"
    },
  ],
};

export default services;
