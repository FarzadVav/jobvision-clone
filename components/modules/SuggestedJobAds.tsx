"use client"

import useSWR from "swr"
import { v4 as uuid } from "uuid"

import { jobAdsFetcher } from "@/utils/fetcher"
import JobAdBox from "../JobAdBox"

const SuggestedJobAds = () => {
  const { data: jobAds } = useSWR("/api/jobads", jobAdsFetcher)

  return (
    <div className="w-full flex flex-wrap items-center gap-3 mt-6">
      {jobAds?.map((jobAd) => (
        <JobAdBox className="w-1/3" key={uuid()} jobAd={jobAd} />
      ))}
    </div>
  )
}

export default SuggestedJobAds
