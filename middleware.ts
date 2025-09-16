import { NextResponse, NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/threat-intelligence', '/network-infiltration', '/identity', '/pentest-arsenal', '/advanced-exploitation', '/wifi-hacking']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (isProtectedRoute) {
    // Get the token from cookies or headers
    const token = request.cookies.get('authToken')?.value || 
                 request.headers.get('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      // Redirect to signin page if no token
      return NextResponse.redirect(new URL('/signin', request.url))
    }
    
    try {
      // Simple token validation without crypto module
      // We'll validate the structure and expiration manually
      const parts = token.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid token format')
      }
      
      // Decode payload (without verification for now in middleware)
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString())
      
      // Check expiration
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        throw new Error('Token expired')
      }
      
      // Token structure is valid, continue to the protected route
      return NextResponse.next()
    } catch (error) {
      // Token is invalid, redirect to signin
      console.error('Token verification failed:', error)
      return NextResponse.redirect(new URL('/signin', request.url))
    }
  }
  
  // Allow access to public routes
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|placeholder|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg).*)',
  ],
}
