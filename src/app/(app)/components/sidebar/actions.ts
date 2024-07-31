"use server";

import { cookies } from "next/headers";

export const logout = async () => {
  console.log('logout')
  cookies().delete('token')
}