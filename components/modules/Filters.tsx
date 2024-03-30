"use client"

import useSWR from "swr"

import { contentFetcher } from "@/utils/fetcher"
import MultiFilter from "./MultiFilter"
import SingleFilter from "./SingleFilter"
import { FILTER_KEYS, SALARY_FILTERS } from "@/utils/initialData"

const Filters = () => {
  const { data } = useSWR("/api/content", contentFetcher)

  return (
    <div className="w-full flex items-center gap-3">
      <SingleFilter route={"/" + FILTER_KEYS.remote} name="دورکاری" />
      <SingleFilter route={"/" + FILTER_KEYS.knowledgeBased} name="دانش بنیان" />
      <MultiFilter
        query={FILTER_KEYS.type}
        name="نوع همکاری"
        filters={data?.cooperationTypes.map((type) => ({ key: type.id, name: type.name })) || []}
      />
      <MultiFilter
        query={FILTER_KEYS.salary}
        name="حقوق"
        filters={SALARY_FILTERS.map((filter) => ({
          key: `${filter[0]}-${filter[1]}`,
          name: `از ${filter[0] || "صفر"} تا ${filter[1]} میلیون`,
        }))}
      />
    </div>
  )
}

export default Filters
