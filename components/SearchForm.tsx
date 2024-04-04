"use client"

import { useRef } from "react"
import useSWR from "swr"

import { contentFetcher } from "@/utils/fetcher"
import { FILTER_KEYS } from "@/utils/initialData"
import Input from "./Form/Input"
import Button from "./Button"
import AutoComplete from "./Form/AutoComplete"
import search from "@/app/actions/search"

const SearchForm = () => {
  const { data: content } = useSWR("/api/content", contentFetcher)
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      className="flex items-center gap-3"
      ref={formRef}
      action={async (formData: FormData) => {
        await search(formData)
        formRef.current?.reset()
      }}
    >
      <Input placeholder="عنوان شغلی یا شرکت ..." name={FILTER_KEYS.search} />
      <AutoComplete
        placeholder="گروه شغلی"
        data={content?.categories.map((category) => category.name) || []}
        name={FILTER_KEYS.category}
      />
      <AutoComplete
        placeholder="شهر"
        data={content?.cities.map((city) => city.name) || []}
        name={FILTER_KEYS.city}
      />
      <Button variant={"primary"} size={"lg"}>
        جستجو
      </Button>
    </form>
  )
}

export default SearchForm
