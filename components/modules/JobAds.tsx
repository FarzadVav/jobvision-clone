"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo } from "react"
import useSWR, { useSWRConfig } from "swr"
import { v4 as uuid } from "uuid"

import { jobAdsFilterFetcher } from "@/utils/fetcher"
import JobAdBox from "../JobAdBox"

const JobAds = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { data } = useSWR("/jobs", jobAdsFilterFetcher)
  const { mutate } = useSWRConfig()

  useEffect(() => {
    mutate("/jobs")
  }, [pathname, searchParams])

  return (
    <aside className="bg-white h-max w-1/3 p-3 rounded-md">
      {useMemo(() => {
        return data
          ? data.map((jobAd) => (
              <JobAdBox key={uuid()} className="mt-3 first-of-type:mt-0" jobAd={jobAd} />
            ))
          : null
      }, [data])}
    </aside>
  )
}

export default JobAds
