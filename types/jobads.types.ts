import { JobAds } from "@prisma/client"

import CompaniesT from "./companies.types"

type JobAdsT = JobAds & {
  salary: string[]
  company: CompaniesT
}

export default JobAdsT