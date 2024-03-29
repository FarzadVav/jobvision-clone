import { PrismaClient } from "@prisma/client"

export const revalidate = 60

const prisma = new PrismaClient()

export const GET = async () => {
  const jobAds = await prisma.jobAds.findMany()
  return Response.json(jobAds)
}