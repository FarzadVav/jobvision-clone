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
    <div className="list-scrollbar w-full flex flex-wrap items-center gap-3 mt-6 sm:mt-3">
      <RemoveFiltersButton />
      <SingleFilter route={"/" + FILTER_KEYS.remote} name="دورکاری" />
      <SingleFilter route={"/" + FILTER_KEYS.knowledgeBased} name="دانش بنیان" />
      <MultiFilter query={FILTER_KEYS.type} name="نوع همکاری" filters={data} />
      <MultiFilter
        query={FILTER_KEYS.salary}
        name="حقوق"
        filters={SALARY_FILTERS.map((filter) => {
          const firstIsZero = filter[0] === 0

          const key = `${filter[0]}-${filter[1]}`
          const name =
            (firstIsZero ? "بین " : "از ") +
            `${firstIsZero ? "صفر" : filter[0]} تا ${filter[1]} میلیون`

          return { key, name }
        })}
      />
    </div>
  )
}

export default Filters
