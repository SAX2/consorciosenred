"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const login = async ({ username, password }: { username: string, password: string }) => {
  const cookie = cookies()

  try {

    let response = await fetch('https://www.consorciosenred.com/cerDevelopment/cer_api.nsf/xsp/.xrest/token', {
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

    cookie.set("token", data.TOKEN)
    cookie.set("role", data.roles[0])

    const role = cookie.get('role')

    if (role?.value == '[Propietario]') {
      redirect('/prp')
    }

    return data;
  } catch (error) {
    console.error('Error during fetch:', error);
    throw error;
  }
};