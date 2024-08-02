"use server";

import { cookies } from "next/headers";

export const getAuthHeaders = () => {
  const cookie = cookies();

  const token = cookie.get("token")?.value

  if (!token) return;
 
  const headers = {
    "Authorization": `Basic ${token}`,
    "TOKEN": token,
    "Content-Type": "application/json",
  }

  return headers;
}