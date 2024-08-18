"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { v4 as uuid } from "uuid"
import { IconArrowLeft } from "@tabler/icons-react"

import { contentFetcher, suggesttedJobAdsFetcher } from "@/utils/fetcher"
import JobAdBox from "../JobAdBox"
import BreakLine from "../BreakLine"
import Skeleton from "../Skeleton"

const SuggestedJobAds = () => {
  const [prevCategories, setPrevCategories] = useState<string[]>([])
  const { data: content, isLoading: contentisLoading } = useSWR("/api/content", contentFetcher)
  const { data: jobAds, isLoading: jobAdsisLoading } = useSWR(
    "/api/suggested-jobads",
    suggesttedJobAdsFetcher
  )

  useEffect(() => {
    setPrevCategories(JSON.parse(localStorage.getItem("prevCategories") || "[]"))
  }, [])

  return (
    <>
      <BreakLine
        className="mt-6"
        variant={"primary"}
        icon={
          <svg
            className="icon-lg -scale-x-100"
            fill="currentColor"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="AutoAwesomeRoundedIcon"
          >
            <path d="m19.46 8 .79-1.75L22 5.46c.39-.18.39-.73 0-.91l-1.75-.79L19.46 2c-.18-.39-.73-.39-.91 0l-.79 1.75-1.76.79c-.39.18-.39.73 0 .91l1.75.79.79 1.76c.18.39.74.39.92 0zM11.5 9.5 9.91 6c-.35-.78-1.47-.78-1.82 0L6.5 9.5 3 11.09c-.78.36-.78 1.47 0 1.82l3.5 1.59L8.09 18c.36.78 1.47.78 1.82 0l1.59-3.5 3.5-1.59c.78-.36.78-1.47 0-1.82L11.5 9.5zm7.04 6.5-.79 1.75-1.75.79c-.39.18-.39.73 0 .91l1.75.79.79 1.76c.18.39.73.39.91 0l.79-1.75 1.76-.79c.39-.18.39-.73 0-.91l-1.75-.79-.79-1.76c-.18-.39-.74-.39-.92 0z"></path>
          </svg>
        }
        description={
          prevCategories.length
            ? "پیشنهاد شده بر اساس رفتار و عملکرد شما"
            : `${jobAds?.length} آگهی شغلی در ${content?.cities.length} شهر مختلف`
        }
      >
        {prevCategories.length ? "مشاغل پیشنهادی" : "لیست مشاغل"}
      </BreakLine>

      <div className="w-full flex flex-wrap gap-3 mt-6">
        {jobAdsisLoading ? (
          <>
            <Skeleton className="w-full h-52 md:jobAd_size-1 xl:jobAd_size-2" />
            <Skeleton className="w-full h-52 md:jobAd_size-1 xl:jobAd_size-2" />
            <Skeleton className="w-full h-52 md:jobAd_size-1 xl:jobAd_size-2" />
            <Skeleton className="w-full h-52 md:jobAd_size-1 xl:jobAd_size-2" />
            <Skeleton className="w-full h-52 md:jobAd_size-1 xl:jobAd_size-2" />
          </>
        ) : (
          jobAds?.map((jobAd) => {
            if (jobAd) {
              return (
                <JobAdBox className="md:jobAd_size-1 xl:jobAd_size-2" key={uuid()} jobAd={jobAd} />
              )
            } else {
              return <Skeleton key={uuid()} className="jobAd_size-1 h-52 xl:jobAd_size-2" />
            }
          })
        )}

        {contentisLoading ? (
          <div className="w-full h-52 flex flex-wrap items-center gap-3 md:jobAd_size-1 xl:jobAd_size-2">
            <Skeleton className="w-5/12 h-3" />
            <Skeleton className="w-1/12 h-3" />
            <Skeleton className="w-3/12 h-3" />
            <Skeleton className="w-1/12 h-3" />
            <Skeleton className="w-2/12 h-3" />
            <Skeleton className="w-4/12 h-3" />
            <Skeleton className="w-5/12 h-3" />
            <Skeleton className="w-3/12 h-3" />
            <Skeleton className="w-2/12 h-3" />
            <Skeleton className="w-1/12 h-3" />
            <Skeleton className="w-3/12 h-3" />
            <Skeleton className="w-7/12 h-3" />
            <Skeleton className="w-4/12 h-3" />
            <Skeleton className="w-3/12 h-3" />
            <Skeleton className="w-7/12 h-3" />
            <Skeleton className="w-4/12 h-3" />
            <Skeleton className="w-2/12 h-3" />
            <Skeleton className="w-7/12 h-3" />
            <Skeleton className="w-4/12 h-3" />
            <Skeleton className="w-1/12 h-3" />
            <Skeleton className="w-2/12 h-3" />
            <Skeleton className="w-1/12 h-3" />
          </div>
        ) : content ? (
          <div className="jobAd_size-1 h-52 max-h-52 xl:jobAd_size-2 max-md:hidden">
            <ul className="size-full flex flex-wrap items-center group">
              {content?.tags.slice(0, 14).map((tag) => (
                <li key={uuid()} className="suggested-link">
                  <Link href={`/jobs?tag=${tag.id}`}>{tag.name}</Link>
                </li>
              ))}
              <li className="suggested-link">
                <span>...</span>
              </li>
              <li className="suggested-link">
                <Link className="bg-primary text-white flex items-center" href={"/jobs"}>
                  مشاهده همه
                  <IconArrowLeft className="icon-sm mr-2" />
                </Link>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default SuggestedJobAds
