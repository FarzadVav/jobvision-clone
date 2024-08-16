import { prisma } from "@/prisma/client"
import { verifySession } from "@/utils/session"

export const dynamic = "force-dynamic"

export const GET = async (request: Request) => {
  const token = request.headers.get("Authorization") || ""
  const session = await verifySession(token)

  if (!session) return Response.json(null, { status: 403 })

  const company = await prisma.companies.findUnique({
    where: { email: session.email },
    include: { city: { include: { province: true } } }
  })
  if (company) {
    return Response.json(company)
  }

  return Response.json(null, { status: 404 })
}