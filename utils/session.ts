import "server-only"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SignJWT, jwtVerify } from "jose"

import SessionT from "@/types/session.types"

export const cookieOptions = {
  name: "session",
  options: { path: "/", httpOnly: true, secure: true, maxAge: 2_592_000 },
  age: 2_592_000
}

const key = new TextEncoder().encode(process.env.SECRET_KEY)

export const encryptSession = async (session: SessionT) => {
  const payLoad = await new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${cookieOptions.age}s`)
    .sign(key)

  return payLoad
}

export const decryptSession = async (session: string) => {
  try {
    const { payload } = await jwtVerify(session, key, { algorithms: ["HS256"] })
    return payload as SessionT
  } catch (error) {
    console.log(error)
    return null
  }
}

export const createSession = async (session: SessionT) => {
  const encryptedSession = await encryptSession(session)
  if (encryptedSession) {
    cookies().set(cookieOptions.name, encryptedSession, cookieOptions.options)
  }
}

export const verifySession = async (cookie?: string) => {
  const myCookie = cookie || cookies().get(cookieOptions.name)?.value
  if (!myCookie) {
    return null
  }

  const session = await decryptSession(myCookie)
  return session
}