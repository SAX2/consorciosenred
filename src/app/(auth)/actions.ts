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