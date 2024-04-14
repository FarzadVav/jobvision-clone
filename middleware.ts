import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const middleware = async (request: NextRequest) => {
  const url = request.url
  const cookie = request.cookies.get('token')

  const { status } = await fetch(process.env.BASE_URL + "/api/getMe", {
    headers: { Authorization: cookie?.value || "" }
  })
  const isValid = status === 200

  if (url.includes("/employer") && !isValid) {
    return NextResponse.redirect(new URL('/register', request.url))
  }

  if (url.includes("/register") && isValid) {
    return NextResponse.redirect(new URL('/employer', request.url))
  }
}

export const config = {
  matcher: ["/register/:path*", "/employer/:path*"],
}