import {
  IconArticle,
  IconBell,
  IconBook,
  IconGavel,
  IconHelpHexagon,
  IconLayout,
  IconLogout,
  IconReceipt2,
  IconUsers,
} from "@tabler/icons-react";

export const verticalPrp = {
  top: [
    {
      descripcion: "Panel de control",
      posicion: 1,
      colorFondo: "",
      titulo: "PANEL",
      iconoWeb: <IconLayout width={22} height={22} />,
      url: "/",
    },
    {
      descripcion: "Mis expensas",
      posicion: 1,
      colorFondo: "",
      titulo: "EXPENSAS",
      iconoWeb: <IconReceipt2 width={22} height={22} />,
      url: "/expensas",
    },
    {
      descripcion: "Novedades",
      posicion: 1,
      colorFondo: "",
      titulo: "NOVEDADES",
      iconoWeb: <IconBell width={22} height={22} />,
      url: "/novedades",
    },
    {
      descripcion: "Reclamos",
      posicion: 1,
      colorFondo: "",
      titulo: "RECLAMOS",
      iconoWeb: <IconArticle width={22} height={22} />,
      url: "/reclamos",
    },
    {
      descripcion: "Juicios",
      posicion: 1,
      colorFondo: "",
      titulo: "JUICIOS",
      iconoWeb: <IconGavel width={22} height={22} />,
      url: "/juicios",
    },
    {
      descripcion: "Asambleas",
      posicion: 1,
      colorFondo: "",
      titulo: "ASAMBLEAS",
      iconoWeb: <IconUsers width={22} height={22} />,
      url: "/asambleas",
    },
    {
      descripcion: "Reglamento",
      posicion: 1,
      colorFondo: "",
      titulo: "REGLAMENTO",
      iconoWeb: <IconBook width={22} height={22} />,
      url: "/reglamento",
    },
  ],
  bottom: [
    {
      descripcion: "Ayuda",
      posicion: 1,
      colorFondo: "",
      titulo: "AYUDA",
      iconoWeb: <IconHelpHexagon width={22} height={22} />,
      url: "/ayuda",
    },
    {
      descripcion: "Desconectarse",
      posicion: 1,
      colorFondo: "",
      titulo: "LOGOUT",
      iconoWeb: <IconLogout width={22} height={22} />,
      url: "/sign-out",
    },
  ],
};
