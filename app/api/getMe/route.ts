import { getCompany } from "@/utils/prismaFetchers"

export const dynamic = "force-dynamic"

export const GET = async (request: Request) => {
  const session = request.headers.get("Authorization") || ""
  const company = await getCompany(session)

  if (!company) {
    return Response.json(null, { status: 404 })
  }

  return Response.json(company)
}