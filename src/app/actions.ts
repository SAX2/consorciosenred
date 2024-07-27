"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getAuthHeaders = () => {
  const cookie = cookies();

  const token = cookie.get("token")?.value

  
  if (!token) return redirect('/ingresar');
  
  const headers = {
    "Authorization": `Basic ${token}`,
    "TOKEN": token,
    "Content-Type": "application/json",
  }

  return headers;
}