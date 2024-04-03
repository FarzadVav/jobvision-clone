import ContentT from "@/types/content.types"

import Input from "./Form/Input"
import Button from "./Button"
import AutoComplete from "./Form/AutoComplete"
import search from "@/app/actions/search"

const getContent = async () => {
  const res = await fetch(process.env.BASE_URL + "/api/content", { next: { revalidate: 3_600 } })
  return (await res.json()) as ContentT
}

const SearchForm = async () => {
  const content = await getContent()

  return (
    <form className="flex items-center gap-3" action={search}>
      <Input placeholder="عنوان شغلی یا شرکت ..." name="search" />
      <AutoComplete
        placeholder="گروه شغلی"
        data={content.categories.map((category) => category.name)}
        name="category"
      />
      <AutoComplete placeholder="شهر" data={content.cities.map((city) => city.name)} name="city" />
      <Button variant={"primary"} size={"lg"}>
        جستجو
      </Button>
    </form>
  )
}

export default SearchForm
