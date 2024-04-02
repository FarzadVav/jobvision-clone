import { Categories, CooperationTypes, JobAds, TagsOnJobAds } from "@prisma/client"

import CompaniesT from "./companies.types"

type JobAdsT = JobAds & {
  category: Categories
  cooperation_type: CooperationTypes
  company: CompaniesT
  tags: TagsOnJobAds[]
  age: number[]
  salary: string[]
  benefits: string[]
  abilities: string[]
  education: string[]
  languages: string[]
  techs: string[]
}

export default JobAdsT