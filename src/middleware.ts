import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAllUnits } from './lib/queries/queries';

export async function middleware(request: NextRequest, response: NextResponse) {
  const cookie = cookies();

  const token = cookie.get('token')?.value as string;

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

  if (request.nextUrl.pathname.startsWith('/prp/expensas')) {
    if (token) {
      const unit = await getAllUnits();
  
      if (unit.length <= 1) {
        return NextResponse.rewrite(new URL(`/prp/expensas/${unit[0].uf_id}`, request.url))
      }
    }
  }
}