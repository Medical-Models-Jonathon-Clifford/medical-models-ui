import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Session } from 'next-auth';
import { auth } from './auth';
import {
  AUTHORIZATION_SERVER_URL,
  MEDICAL_MODELS_SERVICE_BASE_URL,
} from './app/constants';

export async function middleware(request: NextRequest) {
  const session: Session | null = await auth();

  if (request.nextUrl.pathname.includes('/images/')) {
    console.log('[middleware] Images middleware ran');
    const requestHeaders = new Headers(request.headers);

    if (session?.idToken) {
      requestHeaders.set('Authorization', `Bearer ${session?.idToken}`);
    }

    const filename = request.nextUrl.pathname.replace('/api/images/', '');
    const url = new URL(`${MEDICAL_MODELS_SERVICE_BASE_URL}${filename}`);

    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (request.nextUrl.pathname.includes('/users/picture')) {
    console.log('[middleware] Users profile picture middleware ran');
    const requestHeaders = new Headers(request.headers);

    if (session?.idToken) {
      requestHeaders.set('Authorization', `Bearer ${session?.idToken}`);
    }

    const url = new URL(
      `${AUTHORIZATION_SERVER_URL}/${request.nextUrl.pathname}`
    );

    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }
}

export const config = {
  matcher: ['/images/:path*', '/users/:path*'],
};
