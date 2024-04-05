import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const GET = async () => {
  const companies = await prisma.companies.findMany({ include: { job_ads: true, province: true, city: true } })

  return Response.json(companies)
}