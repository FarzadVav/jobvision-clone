import NewJobAdForm from "@/components/NewJobAdForm"
import { getContent } from "@/utils/prismaFetchers"

const Page = async () => {
  const content = await getContent()

  return <NewJobAdForm content={content} />
}

export default Page
