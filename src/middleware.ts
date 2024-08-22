import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuthHeaders } from './services/config';

export async function middleware(request: NextRequest) {
  const cookie = cookies();

  const token = cookie.get('token')?.value as string;

  if (request.nextUrl.pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/prp/expensas', request.url))
    }
  }

  if (request.nextUrl.pathname.startsWith('/ingresar')) {
    if (token) {
      return NextResponse.redirect(new URL('/prp/expensas', request.url))
    }
  }


  if (request.nextUrl.pathname === '/prp/expensas') {
    if (token) {

    }
  }

  if (request.nextUrl.pathname.startsWith('/prp')) {
    if (!token) {
      return NextResponse.redirect(new URL('/ingresar', request.url))
    }
  }

  return NextResponse.next();
}