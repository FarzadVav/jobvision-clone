"use server"

import { cookies } from "next/headers"
import { PrismaClient } from "@prisma/client"

import { verifyToken } from "@/lib/auth"

const prisma = new PrismaClient()

const getMe = async () => {
  const token = cookies().get("token")?.value || ""
  const tokenPayLoad = verifyToken(token)
  return await prisma.companies.findUnique({ where: { email: `${tokenPayLoad?.email}` } })
}

export default getMe