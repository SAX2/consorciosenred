import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuthHeaders } from './services/config';
import { saveUnitPermissions } from './store/permissions/unit-permissions';

async function getUnitsEdge() {
  const headers = await getAuthHeaders();
  const response = await fetch('https://www.consorciosenred.com/cerDevelopment/cer_exp.nsf/xsp/.xrest/panel', {
    method: 'POST',
    headers: { ...headers },
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

const protectedRoutes = ['/prp/expensas', '/prp/expensas/*']
const publicRoutes = ['/ingresar', '/registrarse', '/']

export async function middleware(request: NextRequest) {
  
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => {
    if (route.endsWith('*')) {
      return path.startsWith(route.slice(0, -1))
    }
    return route === path
  })
  const isPublicRoute = publicRoutes.includes(path)
  
  
  const cookie = cookies();
  const session = (await cookie).get('token')?.value as string;

  if (isProtectedRoute && !session) {
    console.log('entro')
    return NextResponse.redirect(new URL('/ingresar', request.url))
  }

  if (
    isPublicRoute &&
    session &&
    !request.nextUrl.pathname.startsWith('/prp/expensas')
  ) {
    return NextResponse.redirect(new URL('/prp/expensas', request.nextUrl))
  }

  if (request.nextUrl.pathname === '/prp/expensas' && session) {
    try {
      const units = await getUnitsEdge();
      const unit = units[0];
      (await cookie).set('unit', JSON.stringify(units.length));

      await saveUnitPermissions(units);
      
      if (units.length === 1) {
        return NextResponse.redirect(new URL(`/prp/expensas/${unit.uf_id}_${unit.uf_codEdificio}`, request.url));
      }
    } catch (error) {
      console.error('Error al obtener unidades:', error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}