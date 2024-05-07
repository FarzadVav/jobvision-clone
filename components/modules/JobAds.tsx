"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo } from "react"
import useSWR, { useSWRConfig } from "swr"
import { v4 as uuid } from "uuid"

import { jobAdsFilterFetcher } from "@/utils/fetcher"
import Skeleton from "../Skeleton"
import JobAdBox from "../JobAdBox"
import Alert from "../Alert"

const JobAds = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { data: jobAds, isLoading } = useSWR("/jobs", jobAdsFilterFetcher)
  const { mutate } = useSWRConfig()

  useEffect(() => {
    mutate("/jobs")
  }, [pathname, searchParams])

  return (
    <aside className="bg-white min-h-[calc(100vh-6rem)] w-full rounded-md lg:p-3 lg:w-2/5 xl:w-1/3">
      {useMemo(() => {
        return isLoading ? (
          [...Array(3)].map(() => (
            <Skeleton key={uuid()} className="h-52 mt-3 first-of-type:mt-0" />
          ))
        ) : jobAds?.length ? (
          jobAds.map((jobAd) => (
            <JobAdBox key={uuid()} className="mt-3 first-of-type:mt-0" jobAd={jobAd} />
          ))
        ) : (
          <Alert variant={"warning"} message="فرصت شغلی برای جستجوی شما پیدا نشد" />
        )
      }, [jobAds])}
    </aside>
  )
}

export default JobAds
