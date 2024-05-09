import { prisma } from "@/utils/lib/client"

export const GET = async () => {
  const companies = await prisma.companies.findMany({
    include: { job_ads: true, city: { include: { province: true } } },
    orderBy: { created_at: "desc" }
  })

  return Response.json(companies)
}