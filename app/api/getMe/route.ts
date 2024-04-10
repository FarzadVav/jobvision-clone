import { cookies } from "next/headers"

import { verifyToken } from "@/utils/auth"
import { prisma } from "@/utils/client"

export const dynamic = "force-dynamic"

export const GET = async () => {
  const token = cookies().get("token")?.value || ""
  const tokenPayLoad = verifyToken(token)

  if (!tokenPayLoad) return Response.json({ message: "دسترسی منقضی شده" }, { status: 403 })

  const company = await prisma.companies.findUnique({ where: { email: tokenPayLoad.email }, include: { city: true } })
  if (company) {
    return Response.json(company)
  }

  return Response.json({ message: "کاربرد پیدا نشد" }, { status: 404 })
}