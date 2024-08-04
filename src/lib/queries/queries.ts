"use server"

import { getAuthHeaders } from "@/app/actions";
import { QueryFileProps } from "../types/data.types";
import { urlControlPanel, urlFile, urlUnit, urlUnitIssues, urlUser } from "./urls";

export const getFiles = async ({ id, name, type }: QueryFileProps) => {
  const headers = await getAuthHeaders()

  const res = await fetch(urlFile, {
    method: "POST",
    headers: { ...headers },
    body: JSON.stringify({ id, nombreAdjunto: name, tipo: type })
  })

  if (!res.ok) return;

  const data = await res.json();
  return data;
}


export const getAllUnits = async () => {
  const headers = await getAuthHeaders()

  const res = await fetch(urlControlPanel, {
    method: "POST",
    headers: { ...headers },
  });

  if (!res.ok) return;

  const data = await res.json();
  return data;
}

export const getUnit = async ({ id }: { id: string }) => {
  const headers = await getAuthHeaders()

  const res = await fetch(urlUnit, {
    method: "POST",
    headers: { ...headers },
    body: JSON.stringify({ uf_id: id })
  });

  if (!res.ok) return;

  const data = await res.json();
  return data;
}

export const getUser = async () => {
  const headers = await getAuthHeaders()

  const res = await fetch(urlUser, {
    method: "POST",
    headers: { ...headers },
  });

  if (!res.ok) return;

  const data = await res.json();
  return data;
}

export const getUnitIssues = async ({ code }: { code: string }) => {
  const headers = await getAuthHeaders()

  const res = await fetch(urlUnitIssues, {
    method: "POST",
    headers: { ...headers },
    body: JSON.stringify({ codEdificio: code })
  });

  if (!res.ok) return;

  const data = await res.json();
  return data;
}