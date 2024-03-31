import { CooperationTypes, JobAds, TagsOnJobAds } from "@prisma/client"

import CompaniesT from "./companies.types"

type JobAdsT = JobAds & {
  salary: string[]
  cooperation_type: CooperationTypes
  company: CompaniesT
  tags: TagsOnJobAds[]
}

export default JobAdsT