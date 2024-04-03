import ContentT from "@/types/content.types"

import Input from "./Form/Input"
import Button from "./Button"
import AutoComplete from "./Form/AutoComplete"

const getContent = async () => {
  const res = await fetch(process.env.BASE_URL + "/api/content", { next: { revalidate: 3_600 } })
  return (await res.json()) as ContentT
}

const SearchForm = async () => {
  const content = await getContent()

  return (
    <form className="flex items-center gap-3">
      <Input placeholder="عنوان شغلی یا شرکت ..." />
      <AutoComplete
        placeholder="گروه شغلی"
        data={content.categories.map((category) => category.name)}
      />
      <AutoComplete placeholder="شغل" data={content.cities.map((city) => city.name)} />
      <Button variant={"primary"} size={"lg"}>
        جستجو
      </Button>
    </form>
  )
}

export default SearchForm
