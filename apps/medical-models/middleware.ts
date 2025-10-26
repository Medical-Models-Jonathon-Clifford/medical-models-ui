import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Session } from 'next-auth';
import { auth } from '@mm/auth';
import {
  AUTHORIZATION_SERVER_URL,
  LOGIN_URL,
  MEDICAL_MODELS_SERVICE_BASE_URL,
} from '@mm/config';

// List of public routes that don't require authentication
const publicRoutes = [LOGIN_URL];

export async function middleware(request: NextRequest) {
  const session: Session | null = await auth();
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Handle image routes
  if (pathname.includes('/images/')) {
    console.log('[middleware] Images middleware ran');
    const requestHeaders = new Headers(request.headers);

    if (session?.idToken) {
      requestHeaders.set('Authorization', `Bearer ${session?.idToken}`);
    } else {
      // Redirect to signin if no session
      return NextResponse.redirect(new URL(LOGIN_URL, request.url));
    }

    const filename = pathname.replace('/api/images/', '');
    const url = new URL(`${MEDICAL_MODELS_SERVICE_BASE_URL}${filename}`);

    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Handle user picture routes
  if (pathname.includes('/users/picture')) {
    console.log('[middleware] Users profile picture middleware ran');
    const requestHeaders = new Headers(request.headers);

    if (session?.idToken) {
      requestHeaders.set('Authorization', `Bearer ${session?.idToken}`);
    } else {
      // Redirect to signin if no session
      return NextResponse.redirect(new URL(LOGIN_URL, request.url));
    }

    const url = new URL(`${AUTHORIZATION_SERVER_URL}/${pathname}`);

    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  // For all other routes, check if user is authenticated
  if (!session) {
    return NextResponse.redirect(new URL(LOGIN_URL, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except next.js assets, api/auth routes, and static files
    '/((?!_next/static|_next/image|favicon.ico|favicon.png|api/auth).*)',
    '/images/:path*',
    '/users/picture/:path*',
  ],
};
