import ContentT from "@/types/content.types";
import JobAdsT from "@/types/jobads.types";

export const contentFetcher = () => fetch("/api/content")
  .then((res) => res.json())
  .then((data) => data as ContentT)

export const jobAdsFetcher = async (filters?: string[]) => {
  const res = await fetch("/api/jobads")
  let data = await res.json() as JobAdsT[]

  if (filters?.includes("remote")) {
    data = data.filter(jobAd => jobAd.is_remote)
  }

  if (filters?.includes("military")) {
    data = data.filter(jobAd => jobAd.end_military_service)
  }

  const params = new URLSearchParams(location.search)

  const salary = params.get('salary')
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

  const type = params.get('type')
  if (type) {
    data = data.filter(jobAd => jobAd.cooperation_type_id === type)
  }

  return data
}