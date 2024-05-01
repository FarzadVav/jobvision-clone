"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo } from "react"
import useSWR, { useSWRConfig } from "swr"
import { v4 as uuid } from "uuid"

import { jobAdsFilterFetcher } from "@/utils/fetcher"
import JobAdBox from "../JobAdBox"
import JobAdBoxPreview from "../JobAdBoxPreview"

const JobAds = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { data: jobAds, isLoading } = useSWR("/jobs", jobAdsFilterFetcher)
  const { mutate } = useSWRConfig()

  console.log("isLoading --->", isLoading)

  useEffect(() => {
    mutate("/jobs")
  }, [pathname, searchParams])

  return (
    <aside className="bg-white h-max w-full p-3 rounded-md lg:w-2/5 xl:w-1/3">
      {isLoading
        ? [...Array(3)].map(() => (
            <JobAdBoxPreview key={uuid()} className="mt-3 first-of-type:mt-0" />
          ))
        : null}
      {useMemo(() => {
        return jobAds
          ? jobAds.map((jobAd) => (
              <JobAdBox key={uuid()} className="mt-3 first-of-type:mt-0" jobAd={jobAd} />
            ))
          : null
      }, [jobAds])}
    </aside>
  )
}

export default JobAds
