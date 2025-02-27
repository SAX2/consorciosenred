import {
  IconBlocks,
  IconChevronLeft,
  IconLockPassword,
  IconUserEdit,
} from "@tabler/icons-react";
import { ButtonProps } from "app/components/Buttons/Button";

export const sidebar: ButtonProps[] = [
  {
    title: "Panel de usuario",
    icon: <IconBlocks size={22} />,
    href: "/prp/usuario",
  },
  {
    title: "Editar mis datos personales",
    icon: <IconUserEdit size={22} />,
    href: "/prp/usuario/editar",
  },
  {
    title: "Cambiar contraseña",
    icon: <IconLockPassword size={22} />,
    href: "/prp/usuario/cambiar-clave",
  },
  {
    title: "Volver a mis expensas",
    icon: <IconChevronLeft size={22} />,
    href: "/prp/expensas",
  },
];

export const sidebarMobile = [
  {
    title: "Panel de usuario",
    icon: <IconBlocks size={28} />,
    href: "/prp/usuario",
  },
  {
    title: "Editar mis datos personales",
    icon: <IconUserEdit size={28} />,
    href: "/prp/usuario/editar",
  },
  {
    title: "Cambiar contraseña",
    icon: <IconLockPassword size={28} />,
    href: "/prp/usuario/cambiar-clave",
  },
];
