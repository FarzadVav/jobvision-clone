import { CooperationTypes, JobAds } from "@prisma/client"

import CompaniesT from "./companies.types"

type JobAdsT = JobAds & {
  salary: string[]
  cooperation_type: CooperationTypes
  company: CompaniesT
}

export default JobAdsT