import { JobAds } from "@prisma/client";

import ContentT from "@/types/content.types";

export const contentFetcher = () => fetch("/api/content")
  .then((res) => res.json())
  .then((data) => data as ContentT)

export const jobAdsFetcher = async (filters?: string[]) => {
  const res = await fetch("/api/jobads")
  let data = await res.json() as JobAds[]

  if (filters?.includes("remote")) {
    data = data.filter(jobAd => jobAd.is_remote)
  }

  if (filters?.includes("military")) {
    data = data.filter(jobAd => jobAd.end_military_service)
  }

  console.log("Filters --->", filters)
  console.log("Data --->", data)

  return data
}