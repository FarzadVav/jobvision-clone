"use client"

import { usePathname, useRouter } from "next/navigation"
import useSWR from "swr"

import { contentFetcher } from "@/utils/fetcher"
import useJobs from "@/hooks/store/useJobs"
import MultiFilterButton from "./MultiFilterButton"
import Button from "../Button"

const salaryFilters: { key: string; name: string }[] = [
  { key: "0-4", name: "تا 4 میلیون" },
  { key: "4-8", name: "از4 تا 8 میلیون" },
  { key: "8-12", name: "از 8 تا 12 میلیون" },
  { key: "12-16", name: "از 12 تا 16 میلیون" },
  { key: "16-20", name: "از 16 تا 20 میلیون" },
  { key: "20-25", name: "از 20 تا 25 میلیون" },
  { key: "25-30", name: "از 25 تا 30 میلیون" },
  { key: "30-40", name: "از 30 تا 40 میلیون" },
  { key: "40-50", name: "از 40 تا 50 میلیون" },
  { key: "50-100", name: "از 50 تا 100 میلیون" },
]

const Filters = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { data } = useSWR("/api/content", contentFetcher)
  const { addFilter, removeFilter } = useJobs((s) => s)

  const mutateFilter = (filter: string) => {
    const params = new URLSearchParams(location.search)
    // if filter exist, will be remove
    if (pathname.includes(filter)) {
      router.push(pathname.replace(filter, "") + `?${params.toString()}`)
      return removeFilter(filter)
    }
    router.push(pathname + filter + `?${params.toString()}`)
    addFilter(filter)
  }

  return (
    <div className="w-full flex items-center gap-3">
      <Button className="rounded-full" variant={"outline"} onClick={() => mutateFilter("/remote")}>
        دورکاری
      </Button>
      <Button
        className="rounded-full"
        variant={"outline"}
        onClick={() => mutateFilter("/knowledgeBased")}
      >
        امریه سربازی
      </Button>
      <MultiFilterButton
        query="type"
        name="نوع همکاری"
        filters={data?.cooperationTypes.map((type) => ({ key: type.id, name: type.name })) || []}
      />
      <MultiFilterButton query="salary" name="حقوق" filters={salaryFilters} />
    </div>
  )
}

export default Filters
