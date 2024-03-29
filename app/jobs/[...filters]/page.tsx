"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { jobAdsFetcher } from "@/utils/fetcher"
import useJobs from "@/hooks/store/useJobs"

const Page = ({ params }: { params: { filters: string[] } }) => {
  const pathname = usePathname()

  useEffect(() => {
    jobAdsFetcher(params.filters).then((jobAds) => useJobs.setState({ jobAds }))
  }, [pathname])

  return null
}

export default Page
