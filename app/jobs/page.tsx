"use client"

import { useEffect } from "react"

import { jobAdsFetcher } from "@/utils/fetcher"
import useJobs from "@/hooks/store/useJobs"

const Page = () => {
  useEffect(() => {
    jobAdsFetcher().then((jobAds) => useJobs.setState({ jobAds }))
  }, [])

  return null
}

export default Page
