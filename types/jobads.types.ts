import { CooperationTypes, JobAds, TagsOnJobAds } from "@prisma/client"

import CompaniesT from "./companies.types"

type JobAdsT = JobAds & {
  cooperation_type: CooperationTypes
  company: CompaniesT
  age: number[]
  salary: string[]
  benefits: string[]
  abilities: string[]
  education: string[]
  languages: string[]
  techs: string[]
  tags: TagsOnJobAds[]
}

export default JobAdsT