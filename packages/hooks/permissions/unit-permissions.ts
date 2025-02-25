"use server"

import { cookies } from "next/headers";

export type UnitPermissions = Record<string, boolean>;

interface UnitDataRoutes {
  [unitId: string]: UnitPermissions;
}

export const saveUnitPermissions = async (units: any[]) => {
  const cookie = await cookies();

  try {
    const permissionsData: UnitDataRoutes = {};

    units.forEach(unit => {
      if (!unit.uf_id) return;

      permissionsData[unit.uf_id] = {
        ver_jui: !!unit.ver_jui,
        ver_rcl: !!unit.ver_rcl,
        ver_res: !!unit.ver_res,
        ver_cob: !!unit.ver_cob,
        ver_notificarPago: !!unit.ver_notificarPago,
        ver_pagarMercadoPago: !!unit.ver_pagarMercadoPago,
        ver_pagarHomeBanking: !!unit.ver_pagarHomeBanking,
      };
    });

    cookie.set('unitDataRoutes', JSON.stringify(permissionsData));
  } catch (error) {
    console.error('Error saving unit permissions:', error);
  }
};


export const getUnitPermissions = async (unitId: string): Promise<UnitPermissions | null> => {
  const cookie = await cookies();
  
  try {
    const data = cookie.get('unitDataRoutes');
    if (!data) return null;
    
    const permissions: UnitDataRoutes = JSON.parse(data.value);
    return permissions[unitId] || null;
  } catch (error) {
    console.error('Error getting unit permissions:', error);
    return null;
  }
};