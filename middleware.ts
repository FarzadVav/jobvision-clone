import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const middleware = async (request: NextRequest) => {
  const url = request.url

  if (url.includes("/employer") && !request.cookies.has('token')) {
    return NextResponse.redirect(new URL('/register', request.url))
  }

  if (url.includes("/register") && request.cookies.has('token')) {
    return NextResponse.redirect(new URL('/employer', request.url))
  }
}

export const config = {
  matcher: ["/register/:path*", "/employer/:path*"],
}