"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

import { jobAdsFetcher } from "@/utils/fetcher"
import useJobs from "@/hooks/store/useJobAds"

const Page = ({ params }: { params: { filters: string[] } }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    jobAdsFetcher(params.filters).then((jobAds) => useJobs.setState({ jobAds }))
  }, [pathname, searchParams])

  return null
}

export default Page
