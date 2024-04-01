import ContentT from "@/types/content.types";
import JobAdsT from "@/types/jobads.types";
import { FILTER_KEYS } from "./initialData";

export const contentFetcher = () => fetch("/api/content")
  .then((res) => res.json())
  .then((data) => data as ContentT)

export const jobAdsFetcher = async (filters?: string[]) => {
  const res = await fetch("/api/jobads")
  let data = await res.json() as JobAdsT[]
  const params = new URLSearchParams(location.search)

  if (filters?.includes(FILTER_KEYS.remote)) {
    data = data.filter(jobAd => jobAd.is_remote)
  }

  if (filters?.includes(FILTER_KEYS.knowledgeBased)) {
    data = data.filter(jobAd => jobAd.company.knowledgeBased)
  }

  const salary = params.get(FILTER_KEYS.salary)
  if (salary) {
    const arraySalary = salary.split("-")
    data = data.filter(jobAd => {
      const jobAdSalary = Array.from(jobAd.salary as [] || [])
      if (
        +jobAdSalary[0] >= +arraySalary[0]
        && +jobAdSalary[0] < +arraySalary[1]
        && (+jobAdSalary[1] || 0) <= +arraySalary[1]
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
    data = data.filter(jobAd => jobAd.category_id === category)
  }

  const tag = params.get(FILTER_KEYS.tag)
  if (tag) {
    data = data.filter(jobAd => jobAd.tags.some(jobAdTag => jobAdTag.tag_id === tag))
  }

  const province = params.get(FILTER_KEYS.province)
  if (province) {
    data = data.filter(jobAd => jobAd.company.province_id === province)
  }

  const city = params.get(FILTER_KEYS.city)
  if (city) {
    data = data.filter(jobAd => jobAd.company.city_id === city)
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

export const singleJobAdFetcher = async () => {
  const params = new URLSearchParams(location.search)
  const id = params.get("id")

  const res = await fetch(`/api/jobads/${id}`)
  const data = await res.json() as JobAdsT

  return data
}