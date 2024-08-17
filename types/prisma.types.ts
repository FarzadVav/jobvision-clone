import { Prisma } from "@prisma/client"

export type CompaniesT = Prisma.CompaniesGetPayload<{
  include: {
    city: true,
    job_ads: true
  }
}>

export type JobAdsT = Prisma.JobAdsGetPayload<{
  include: {
    category: true,
    company: true,
    cooperation_type: true,
    tags: true
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