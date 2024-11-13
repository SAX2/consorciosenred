'use server';

import { urlToken } from "@/lib/queries/urls";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const loginHandler  = async ({ username, password, save }: { username: string, password: string, save: boolean }) => {
  const cookie = cookies()


  let response = await fetch(urlToken, {
    method: 'POST', 
    headers: {
      'Authorization': 'Basic ' + btoa(`${username}:${password}`), 
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "032569E3": username,
      "005AA4F3": password	
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const responseText = await response.text();
    console.error('Unexpected content type:', contentType);
    console.error('Response body:', responseText);
    return { error: 'Hubo un error, intente nuevamente' }
  }

  let data = await response.json();

  const month = 30 * 24 * 60 * 60 * 1000;

  cookie.set({
    name: "token",
    value: data.TOKEN,
    expires: save ? new Date(Date.now() + month) : undefined
  })
  cookie.set("role", data.roles[0])

  const role = cookie.get('role')

  if (role?.value == '[Propietario]') {
    revalidatePath('/prp/expensas')
    redirect('/prp/expensas')
  }

  return data;
};

export const logoutHandler = async () => {
  cookies().delete('token')
  redirect('/ingresar')
}