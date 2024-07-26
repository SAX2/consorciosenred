"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getAuthHeaders = () => {
  const cookie = cookies();

  const token = cookie.get("token")

  
  if (!token?.value) return redirect('/ingresar');
  
  const headers = {
    "Authorization": "Basic " + token?.value,
    "TOKEN": token?.value,
    "Content-Type": "application/json",
  }

  return headers;
}