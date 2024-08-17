import { getContent } from "@/utils/prismaFetchers";

export const GET = async () => {
  const content = await getContent()
  return Response.json(content)
}