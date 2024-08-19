import { Prisma } from "@prisma/client"

export type CompaniesT = Prisma.CompaniesGetPayload<{
  include: {
    city: { include: { province: true } },
    job_ads: true
  }
}>

export type JobAdsT = Prisma.JobAdsGetPayload<{
  include: {
    category: true,
    company: { include: { city: { include: { province: true, companies: true } } } },
    cooperation_type: true,
    tags: { include: { current_job_ad: true, current_tag: true } }
  }
}>

export type CategoriesT = Prisma.CategoriesGetPayload<{
  include: {
    tags: true
    job_ads: true
  }
}>

export type TagsT = Prisma.TagsGetPayload<{
  include: {
    category: true,
    job_ads: true
  }
}>

export type ProvincesT = Prisma.ProvincesGetPayload<{
  include: {
    cities: true
  }
}>

export type CitiesT = Prisma.CitiesGetPayload<{
  include: {
    companies: true,
    province: true
  }
}>

export type CooperationTypesT = Prisma.CooperationTypesGetPayload<{
  include: {
    job_ads: true
  }
}>