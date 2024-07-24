import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookie = cookies();

  const token = cookie.get('token');

  // if (request.nextUrl.pathname.startsWith('/prop')) {
  //   return NextResponse.rewrite(new URL('/about-2', request.url))
  // }
 
  // if (request.nextUrl.pathname.startsWith('/adm')) {
  //   return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  // }
}