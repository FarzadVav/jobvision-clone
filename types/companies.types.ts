import { Cities, Companies, Provinces } from "@prisma/client"

import JobAdsT from "./jobads.types"

type CompaniesT = Companies & {
  employees: string[]
  province: Provinces
  city: Cities
  job_ads: JobAdsT[]
}

export default CompaniesT