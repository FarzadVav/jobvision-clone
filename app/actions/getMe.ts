"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"

import { verifyToken } from "@/lib/auth"

const prisma = new PrismaClient()

const getMe = async (redirectTo?: `/${string}`) => {
  const token = cookies().get("token")?.value || ""
  const tokenPayLoad = verifyToken(token)

  const user = await prisma.companies.findUnique({ where: { email: `${tokenPayLoad?.email}` } })
  if (!user && redirectTo) redirect(redirectTo)
  return user
}

export default getMe