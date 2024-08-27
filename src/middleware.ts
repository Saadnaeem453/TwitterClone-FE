import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;


  // Define paths to be ignored by middleware
  const ignoredPaths = [
    /^\/_next\//,
    /^\/static\//,
    /^\/api\//,
    /^\/favicon.ico$/,
    /^\/robots.txt$/,
    /^\/auth\/login$/,   
    /^\/login$/,         
    /^\/signup$/,        
  ];

  
  const isIgnorePath = ignoredPaths.some((pattern) => pattern.test(pathname));

  if (isIgnorePath) {
    if (token && (pathname === '/login' || pathname === '/signup')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Redirect to /login if no token is present and the path is not ignored
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Apply middleware to all paths
export const config = {
  matcher: '/:path*',
};
