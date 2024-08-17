import ProfileForm from "@/components/modules/ProfileForm"
import { getContent, getCompany } from "@/utils/prismaFetchers"

const Page = async () => {
  const content = await getContent()
  const company = await getCompany()

  return <ProfileForm content={content} company={company} />
}

export default Page
