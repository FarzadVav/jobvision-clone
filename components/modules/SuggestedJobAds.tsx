"use client"

import useSWR from "swr"
import { v4 as uuid } from "uuid"

import { jobAdsFetcher } from "@/utils/fetcher"
import JobAdBox from "../JobAdBox"

const SuggestedJobAds = () => {
  const { data: jobAds } = useSWR("/api/jobads", jobAdsFetcher)

  return (
    <div className="h-[26.75rem] w-full flex flex-wrap gap-3 mt-6">
      {jobAds
        ? jobAds
            .slice(0, 6)
            .map((jobAd) => (
              <JobAdBox
                className="w-[calc(33.333333%-(0.75rem-0.75rem/3))]"
                key={uuid()}
                jobAd={jobAd}
              />
            ))
        : null}
    </div>
  )
}

export default SuggestedJobAds
