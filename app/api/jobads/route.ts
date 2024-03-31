import { PrismaClient } from "@prisma/client"

export const revalidate = 60
const prisma = new PrismaClient()

export const GET = async () => {
  const jobAds = await prisma.jobAds.findMany({
    include: {
      tags: true,
      cooperation_type: true,
      company: {
        include: {
          province: true,
          city: true,
          job_ads: true
        }
      }
    }
  })
  
  return Response.json(jobAds)
}