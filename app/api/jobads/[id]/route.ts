import { prisma } from "@/utils/client"

export const dynamic = "force-dynamic"

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const jobAds = await prisma.jobAds.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      tags: { include: { current_tag: true } },
      cooperation_type: true,
      company: {
        include: {
          city: { include: { province: true } },
          job_ads: true
        }
      }
    }
  })

  return Response.json(jobAds, { status: jobAds ? 200 : 404 })
}