import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const middleware = async (request: NextRequest) => {
  const url = request.url
  const session = request.cookies.get("session")?.value || ""

  const { status } = await fetch(process.env.BASE_URL + "/api/getMe", {
    headers: { Authorization: session }
  })
  const isSessionValid = status === 200

  if (url.includes("/register")) {
    if (isSessionValid) {
      return NextResponse.redirect(new URL('/employer', url))
    } else {
      const response = NextResponse.next()
      response.cookies.delete("session")
      return response
    }
  }

  if (url.includes("/employer") && !isSessionValid) {
    const response = NextResponse.redirect(new URL('/register', url))
    response.cookies.delete("session")
    return response
  }
}

export const config = {
  matcher: ["/register/:path*", "/employer/:path*"],
}