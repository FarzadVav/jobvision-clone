import { prisma } from "@/utils/client"

export const GET = async () => {
  const companies = await prisma.companies.findMany({ include: { job_ads: true, city: { include: { province: true } } } })

  return Response.json(companies)
}