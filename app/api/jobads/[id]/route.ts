import { PrismaClient } from "@prisma/client"

export const dynamic = "force-dynamic"
const prisma = new PrismaClient()

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const jobAds = await prisma.jobAds.findUnique({
    where: { id: params.id }, include: {
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

  return Response.json(jobAds, { status: jobAds ? 200 : 404 })
}