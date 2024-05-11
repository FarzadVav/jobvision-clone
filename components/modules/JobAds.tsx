"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import useSWR from "swr"
import { v4 as uuid } from "uuid"

import { jobAdsFilterFetcher } from "@/utils/fetcher"
import Skeleton from "../Skeleton"
import JobAdBox from "../JobAdBox"
import Alert from "../Alert"

const JobAds = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [fetchCount, setFetchCount] = useState(0)
  const { data: jobAds, isLoading } = useSWR(
    "/jobs" + pathname + "?" + searchParams.toString(),
    jobAdsFilterFetcher,
    { onSuccess: () => setFetchCount((prev) => ++prev) }
  )

  return (
    <aside className="bg-white min-h-[calc(100vh-6rem)] w-full rounded-md lg:p-3 lg:w-2/5 xl:w-1/3">
      {useMemo(() => {
        return jobAds?.length ? (
          jobAds.map((jobAd) => (
            <JobAdBox key={uuid()} className="mt-3 first-of-type:mt-0" jobAd={jobAd} />
          ))
        ) : fetchCount !== 0 ? (
          <Alert variant={"warning"} message="فرصت شغلی برای جستجوی شما پیدا نشد" />
        ) : null
      }, [fetchCount])}

      {isLoading && fetchCount === 0
        ? [...Array(3)].map(() => (
            <Skeleton key={uuid()} className="h-52 mt-3 first-of-type:mt-0" />
          ))
        : null}
    </aside>
  )
}

export default JobAds
