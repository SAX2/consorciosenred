import { urlControlPanel } from '@/lib/urls'
import { cookies } from 'next/headers'
import React from 'react'

const fetchControlPanel = async () => {
  const cookie = cookies();
  const token = cookie.get("token")

  if (!token?.value) return console.log("NO TOKEN");

  const res = await fetch(urlControlPanel, {
    method: "POST",
    headers: {
      "Authorization": "Basic " + token?.value,
      "Content-Type": "application/json",
      "TOKEN": token?.value
    },
  });

  if (!res.ok) return;

  const data = await res.json();
  return data;
}

const page = async () => {
  const data = await fetchControlPanel();

  return (
    <main>
      
    </main>
  )
}

export default page