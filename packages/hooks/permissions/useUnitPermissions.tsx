"use client"

import { useMemo } from "react";
import { ACTIONS, ActionsProps, DEFAULT_ROUTES, NAVIGATION_TABS, ShortcutPropsMapping } from "./permission-routes";
import { UnitPermissions } from "./unit-permissions";
import { ShortcutProps } from "app/types/globals";
import { IconDots } from "@tabler/icons-react";
import ActionsDropdown from "app/components/Buttons/ButtonShortcut/List/_ActionsDropdown";

export const formatUnitPermissions = (unit: any) => {
  return {
    ver_rcl: unit.ver_rcl,
    ver_res: unit.ver_res,
    ver_cob: unit.ver_cob,
    ver_jui: unit.ver_jui,
    ver_pagarHomeBanking: unit.ver_pagarHomeBanking,
    ver_notificarPago: unit.ver_notificarPago,
    ver_pagarMercadoPago: unit.ver_pagarMercadoPago,
  } as UnitPermissions;
}

export const getNavigationRoutes = (
  unitPermissions: UnitPermissions,
  type: keyof ShortcutPropsMapping,
  actions: ActionsProps
) => {
  return Object.entries(actions)
    .filter(
      ([key, action]) =>
        unitPermissions[key] && typeof action[type] !== "undefined"
    )
    .map(([key, action]) => action[type]);
};


export const getShortcutRoutesWithPermissions = (unitPermissions: UnitPermissions | null, path?: string) => {
  if (!unitPermissions) return [];
  
  const navigationRoutes = getNavigationRoutes(unitPermissions, "simpleShortcut", ACTIONS)

  if (navigationRoutes.length > 2) {
    const navigationDescription = getNavigationRoutes(unitPermissions, "descriptionShortcut", ACTIONS)

    return [
      ...navigationRoutes.slice(0, 2),
      {
        title: 'Acciones',
        description: 'Acciones',
        icon: (
          <IconDots width={32} height={32} className="text-black dark:text-white" />
        ),
        path: '/',
        isBottomSheet: true,
        customComponent({ shortcut }) {
          return <ActionsDropdown shortcut={shortcut} actions={navigationDescription as ShortcutProps[]} path={path}/>;
        },
      },
    ] as ShortcutProps[];
  }

  return navigationRoutes;
};

export const getPaymentShortcutsRoutes = (unitPermissions: UnitPermissions | null) => {
  if (!unitPermissions) return [];

  const navigationRoutes = getNavigationRoutes(unitPermissions, "backgroundShortcut", ACTIONS)

  return navigationRoutes;
}

export const getSidebarRoutes = (permissions: UnitPermissions, size?: number): any[] => {
  size = size ?? 22 

  if (!permissions) return [];
  
  const defaultRoutes = DEFAULT_ROUTES({ size }).map((route) =>
    Object.values(route)[0].unitMenuItem
  );

  const navigationRoutes = Object.entries(NAVIGATION_TABS({ size }))
    .filter(([permission]) => permissions[permission as keyof typeof permissions])
    .map(([_, value]) => value.unitMenuItem);

  return [defaultRoutes[0], ...navigationRoutes, ...defaultRoutes.slice(1, defaultRoutes.length)];
};