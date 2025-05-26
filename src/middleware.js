import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  console.log('Middleware processing path:', path);

  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || path === '/signup' || path.startsWith('/api/auth/');
  console.log('Is public path:', isPublicPath);

  // Get the token from the cookies
  const token = request.cookies.get('token')?.value || '';
  console.log('Token present:', !!token);

  // If user is not logged in and tries to access protected route, redirect to login
  if (!isPublicPath && !token) {
    console.log('Redirecting to login - no token for protected route');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is logged in and tries to access login/signup pages, redirect to home
  if ((path === '/login' || path === '/signup') && token) {
    console.log('Redirecting to home - user already logged in');
    return NextResponse.redirect(new URL('/', request.url));
  }

  console.log('Proceeding with request');
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/dashboard/:path*',
    '/profile/:path*',
    '/api/auth/:path*'
  ],
}; 