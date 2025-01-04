import { cookies } from "next/headers";

export async function GET(req: Request) {
  const cookie = cookies().get('token');

  return new Response(JSON.stringify(cookie), { status: 200 });
}