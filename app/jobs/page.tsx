"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

import { jobAdsFetcher } from "@/utils/fetcher"
import useJobs from "@/hooks/store/useJobAds"

const Page = () => {
  const searchParams = useSearchParams()

  useEffect(() => {
    jobAdsFetcher().then((jobAds) => useJobs.setState({ jobAds }))
  }, [searchParams])

  return null
}

export default Page
