import { StaticImageData } from "next/image";

export type SessionUser = {
  roles: Array["Propietario" | "Administrador"];
  nombre: string;
  apellido: string;
  TOKEN: string;
}

export type roles = "[Propietario]" | "[Administrador]";

export type InputSubmitStatus = "idle" | "loading" | "success" | "error";

export type StaticDataType = {
  title: string;
  content?: string | any[];
  description?: string;
  page?: {
    path: string;
    title: string;
    button: string;
    mainColor?: string;
  };
};

export type UserQueryBody = {
  idUsrOrg: string;
  apellido: string;
  nombre: string;
  email: string;
  preguntaPersonal: string;
  respuestaPersonal: string;
  fechaNac: string;
  profesion: string;
  telefono: string;
  booNewClave: boolean;
  newClave: string;
  newClaveConfirma: string;
};

export type User = {
  atajos: string[];
  roles: string[];
  apellido: string;
  total_unidades: string;
  nombre: string;
  idUsrOrg: string;
  datosModificados: string;
  datosModificadosError: string;
  respuestaPersonal: string;
  preguntaPersonal: string;
  email: string;
  fechaNac: string;
  profesion: string;
  telefono: string;
};

export type ServicesStatic = {
  pill: string;
  title: string;
  description: string;
  items: { icon?: React.ReactElement, title?: string }[];
  image: StaticImageData;
  mainColor?: string;
}

export type QueryFileProps = { type: "uf_aviso" | "uf_liquidaciones"; id: string; name: string }

export type MobileNav = {
  icon: React.ReactElement;
  iconFilled: React.ReactElement;
  title: string;
  path: string;
}

export type ShortcutButtonDisplayType = 'icon-bg' | 'no-styled' | 'icon-bg-description'

export interface ShortcutProps {
  title: string
  description: string
  icon: React.ReactNode
  path: string
  isBottomSheet?: boolean
  display?: ShortcutButtonDisplayType
  style?: {
    background?: string
    color?: string
  }
  handlePress?: () => void
  index?: number
  customComponent?: ({ shortcut }: { shortcut: React.ReactNode }) => React.ReactNode
}