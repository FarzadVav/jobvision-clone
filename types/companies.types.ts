import { Cities, Companies, Provinces } from "@prisma/client"

import JobAdsT from "./jobads.types"

type CompaniesT = Companies & {
  employees: number[]
  city: (Cities & { province: Provinces }) | null
  job_ads: JobAdsT[]
}

export default CompaniesT