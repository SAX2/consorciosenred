import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest, response: NextResponse) {
  const cookie = cookies();

  const token = cookie.get('token')?.value as string;

  const decoded = token ? atob(token) : null;

  if (request.nextUrl.pathname.startsWith('/ingresar')) {
    if (token) {
      return NextResponse.redirect(new URL('/prp/expensas', request.url))
    }
  }

  if (request.nextUrl.pathname.startsWith('/prp')) {
    if (!token) {
      return NextResponse.redirect(new URL('/ingresar', request.url))
    }
  }
}