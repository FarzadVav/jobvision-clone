"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { v4 as uuid } from "uuid"

import JobAdsT from "@/types/jobads.types"
import { jobAdsFetcher } from "@/utils/fetcher"
import JobAdBox from "../JobAdBox"

const JobAds = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [jobAds, setJobAds] = useState<JobAdsT[]>([])

  useEffect(() => {
    jobAdsFetcher(location.pathname.split("/")).then((jobAds) => setJobAds(jobAds))
  }, [pathname, searchParams])

  return (
    <aside className="bg-white h-max w-1/3 p-3 rounded-md">
      {useMemo(() => {
        return jobAds.length
          ? jobAds.map((jobAd) => (
              <JobAdBox key={uuid()} className="mt-3 first-of-type:mt-0" {...jobAd} />
            ))
          : null
      }, [jobAds])}
    </aside>
  )
}

export default JobAds
