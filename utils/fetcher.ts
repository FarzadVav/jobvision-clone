import ContentT from "@/types/content.types";
import JobAdsT from "@/types/jobads.types";
import { FILTER_KEYS } from "./initialData";
import CompaniesT from "@/types/companies.types";

export const getMeFetcher = () => fetch("/api/getMe")
  .then((res) => res.json())
  .then((data) => data as Omit<CompaniesT, "job_ads"> | null)

export const contentFetcher = () => fetch("/api/content")
  .then((res) => res.json())
  .then((data) => data as ContentT)

export const companiesFetcher = () => fetch("/api/companies")
  .then(res => res.json())
  .then(data => data as CompaniesT[])

export const jobAdsFetcher = async () => {
  const res = await fetch("/api/jobads")
  const data = await res.json() as JobAdsT[]

  // suggested jobAds
  const prevCategories: string[] = JSON.parse(localStorage.getItem('prevCategories') || '[]')
  let suggesttedJobAds: JobAdsT[] = []
  let otherJobAds: JobAdsT[] = []
  data.forEach(jobAd => {
    if (prevCategories.includes(jobAd.category.id)) {
      suggesttedJobAds.push(jobAd)
    }
    else {
      otherJobAds.push(jobAd)
    }
  })

  return [...suggesttedJobAds, ...otherJobAds]
}

export const suggesttedJobAdsFetcher = async () => {
  const jobAds: (JobAdsT | undefined)[] = await jobAdsFetcher()

  // add blank jobAd for show skeleton in ui
  const skeletonCount = 5 - jobAds.length
  if (skeletonCount > 0) {
    for (let i = 0; i < skeletonCount; i++) {
      jobAds.push(undefined)
    }
  }

  return jobAds.slice(0, 5)
}

export const jobAdsFilterFetcher = async () => {
  let data = await jobAdsFetcher()

  const filters = location.pathname.split("/")
  const params = new URLSearchParams(location.search)

  if (filters?.includes(FILTER_KEYS.remote)) {
    data = data.filter(jobAd => jobAd.is_remote)
  }

  if (filters?.includes(FILTER_KEYS.knowledgeBased)) {
    data = data.filter(jobAd => jobAd.company.knowledgeBased)
  }

  const search = params.get(FILTER_KEYS.search)
  if (search) {
    data = data.filter(jobAd => {
      if (jobAd.title.includes(search)) return jobAd
      if (jobAd.category.name.includes(search)) return jobAd
      if (jobAd.tags.map(tag => tag.current_tag.name).join(" ").includes(search)) return jobAd
    })
  }

  const salary = params.get(FILTER_KEYS.salary)
  if (salary) {
    const arraySalary = salary.split("-")
    data = data.filter(jobAd => {
      const jobAdSalary = jobAd.salary as [number, number?]
      if (
        jobAdSalary[0] >= +arraySalary[0]
        && jobAdSalary[0] < +arraySalary[1]
        && (jobAdSalary[1] || 0) <= +arraySalary[1]
      ) {
        return jobAd
      }
    })
  }

  const type = params.get(FILTER_KEYS.type)
  if (type) {
    data = data.filter(jobAd => jobAd.cooperation_type_id === type)
  }

  const category = params.get(FILTER_KEYS.category)
  if (category) {
    data = data.filter(jobAd => [jobAd.category_id, jobAd.category.name].includes(category))
  }

  const tag = params.get(FILTER_KEYS.tag)
  if (tag) {
    data = data.filter(jobAd => jobAd.tags.some(jobAdTag => jobAdTag.tag_id === tag))
  }

  const province = params.get(FILTER_KEYS.province)
  if (province) {
    data = data.filter(jobAd => jobAd.company.city?.province_id === province)
  }

  const city = params.get(FILTER_KEYS.city)
  if (city) {
    data = data.filter(jobAd => [jobAd.company.city_id, jobAd.company.city?.name].includes(city))
  }

  const cooperationType = params.get(FILTER_KEYS.cooperationType)
  if (cooperationType) {
    data = data.filter(jobAd => jobAd.cooperation_type_id === cooperationType)
  }

  const cooperationTypeCity = params.get(FILTER_KEYS.cooperationTypeCity)
  if (cooperationTypeCity) {
    data = data.filter(jobAd =>
      jobAd.cooperation_type_id === cooperationTypeCity.split("_")[0]
      && jobAd.company.city_id === cooperationTypeCity.split("_")[1]
    )
  }

  return data
}

export const selectedJobAdFetcher = async () => {
  const params = new URLSearchParams(location.search)
  const id = params.get("id")

  const res = await fetch(`/api/jobads/${id}`)
  const data = await res.json() as JobAdsT

  return data
}