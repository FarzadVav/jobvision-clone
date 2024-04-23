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
    <aside className="bg-white h-max w-full p-3 rounded-md lg:w-2/5 xl:w-1/3">
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
