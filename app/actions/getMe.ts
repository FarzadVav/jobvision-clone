"use server"

import { cookies } from "next/headers"

import { verifyToken } from "@/utils/auth"
import { prisma } from "@/utils/client"

const getMe = async () => {
  const token = cookies().get("token")?.value || ""
  const tokenPayLoad = verifyToken(token)

  if (!tokenPayLoad) return null
  return await prisma.companies.findUnique({ where: { email: tokenPayLoad.email } })
}

export default getMe