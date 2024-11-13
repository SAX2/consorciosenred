"use client"

import { logoutHandler } from "@/actions/auth";
import { IconHelpCircle, IconMoon, IconSettings, IconSquareRoundedMinus, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";

export const useUserOptions = () => {
  const { theme, setTheme, themes} = useTheme()
  
  return [
    {
      url: `/prp/usuario/configuracion`,
      title: "Configuracion del usuario",
      description: "Configuracion",
      iconoWeb: <IconSettings width={24} height={24} />,
    },
    {
      onclick: async () => await logoutHandler(),
      url: `/ingresar`,
      title: "Desconectarse",
      description: "Desconectarse",
      iconoWeb: <IconSquareRoundedMinus width={24} height={24} />,
    },
    {
      onclick: () => setTheme(() => themes.filter((t) => t != theme)[0]),
      url: `#`,
      title: "tema",
      description: `Modo ${theme === 'dark' ? 'claro' :  'obscuro'}`,
      iconoWeb: theme === "dark" ? <IconSun width={24} height={24} />  : <IconMoon width={24} height={24} />,
    },
    {
      url: `/prp/ayuda`,
      title: "ayuda",
      description: "Ayuda",
      iconoWeb: <IconHelpCircle width={24} height={24} />,
    },
  ];
}