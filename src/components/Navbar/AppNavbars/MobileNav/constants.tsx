import { MobileNav } from "@/types/globals";
import { IconHome, IconHome2, IconHomeFilled, IconSmartHome, IconUser, IconUserCircle, IconUserFilled, } from "@tabler/icons-react";

export const MobileNavs: MobileNav[] = [
  {
    path: "/prp/expensas",
    title: "Expensas",
    icon: <IconSmartHome width={32} height={32} />,
    iconFilled: <IconHomeFilled width={24} height={24} />,
  },
  {
    path: "/prp/usuario",
    title: "Usuario",
    icon: <IconUserCircle width={32} height={32} />,
    iconFilled: <IconUserFilled width={24} height={24} />,
  },
]