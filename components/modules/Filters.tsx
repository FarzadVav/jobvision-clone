"use client"

import useSWR from "swr"

import { contentFetcher } from "@/utils/fetcher"
import MultiFilter from "./MultiFilter"
import SingleFilter from "./SingleFilter"

const salaryFilters: [number, number][] = [
  [0, 4],
  [4, 8],
  [8, 12],
  [12, 16],
  [16, 20],
  [20, 25],
  [25, 30],
  [30, 40],
  [40, 50],
  [50, 100],
]

const Filters = () => {
  const { data } = useSWR("/api/content", contentFetcher)

  return (
    <div className="w-full flex items-center gap-3">
      <SingleFilter route={"/remote"} name="دورکاری" />
      <SingleFilter route={"/knowledgeBased"} name="دانش بنیان" />
      <MultiFilter
        query="type"
        name="نوع همکاری"
        filters={data?.cooperationTypes.map((type) => ({ key: type.id, name: type.name })) || []}
      />
      <MultiFilter
        query="salary"
        name="حقوق"
        filters={salaryFilters.map((filter) => ({
          key: `${filter[0]}-${filter[1]}`,
          name: `از ${filter[0] || "صفر"} تا ${filter[1]} میلیون`,
        }))}
      />
    </div>
  )
}

export default Filters
