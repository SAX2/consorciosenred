import { cookies } from "next/headers";

export const getApiUrl = (endpoint: string) => `${process.env.BASE_API_URL}/${endpoint}`;

export const getAuthHeaders = async () => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  if (!token) return null;

  return {
    'Authorization': `Basic ${token}`,
    'TOKEN': token,
    'Content-Type': 'application/json',
  };
};