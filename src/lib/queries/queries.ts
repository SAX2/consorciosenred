"use server"

import { getAuthHeaders } from "@/app/actions";
import { QueryFileProps } from "../types/data.types";

export const getFiles = async ({ id, name, type }: QueryFileProps) => {
  const headers = await getAuthHeaders()

  const res = await fetch('https://www.consorciosenred.com/cerDevelopment/cer_api.nsf/xsp/.xrest/adjunto', {
    method: "POST",
    headers: { ...headers },
    body: JSON.stringify({ id, nombreAdjunto: name, tipo: type })
  })

  if (!res.ok) return;

  const data = await res.json();
  return data;
}


export const getAllUnits = () => {

}