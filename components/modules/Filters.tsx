import ContentT from "@/types/content.types"
import MultiFilter from "./MultiFilter"
import SingleFilter from "./SingleFilter"
import { FILTER_KEYS, SALARY_FILTERS } from "@/utils/initialData"
import RemoveFiltersButton from "./RemoveFiltersButton"

const getCooperationTypeFilter = async () => {
  const res = await fetch(process.env.BASE_URL + "/api/content", { next: { revalidate: 3_600 } })
  const data = (await res.json()) as ContentT
  return data.cooperationTypes.map((type) => ({ key: type.id, name: type.name }))
}

const Filters = async () => {
  const data = await getCooperationTypeFilter()

  return (
    <div className="w-full flex items-center gap-3 mt-3">
      <RemoveFiltersButton />
      <SingleFilter route={"/" + FILTER_KEYS.remote} name="دورکاری" />
      <SingleFilter route={"/" + FILTER_KEYS.knowledgeBased} name="دانش بنیان" />
      <MultiFilter query={FILTER_KEYS.type} name="نوع همکاری" filters={data} />
      <MultiFilter
        query={FILTER_KEYS.salary}
        name="حقوق"
        filters={SALARY_FILTERS.map((filter, i) => {
          if (i === 0) {
            return { key: `${filter[0]}-${filter[1]}`, name: `تا ${filter[1]} میلیون` }
          }
          if (i + 1 === SALARY_FILTERS.length) {
            return { key: `${filter[0]}-${filter[1]}`, name: `بالای ${filter[0]} میلیون` }
          }
          return {
            key: `${filter[0]}-${filter[1]}`,
            name: `بین ${filter[0] || "صفر"} تا ${filter[1]} میلیون`,
          }
        })}
      />
    </div>
  )
}

export default Filters
