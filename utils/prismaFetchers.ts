import { prisma } from "@/prisma/client"
import { verifySession } from "./session"

export const getUser = async (cookie?: string) => {
  const session = await verifySession(cookie)

  if (!session) {
    return null
  }

  const user = prisma.companies.findUnique({
    where: { email: session.email, password: session.password }
  })
  if (!user) {
    return null
  }

  return user
}