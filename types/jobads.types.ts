import { Cities, Companies, JobAds, Provinces } from "@prisma/client"

type JobAdsT = JobAds & {
  salary: string[]
  company: Companies & {
    province: Provinces
    city: Cities
  }
}

export default JobAdsT