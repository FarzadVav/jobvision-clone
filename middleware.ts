import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const middleware = async (request: NextRequest) => {
  if (!request.cookies.has('token')) {
    return NextResponse.redirect(new URL('/register', request.url))
  }
}

export const config = {
  matcher: '/employer/:path*',
}