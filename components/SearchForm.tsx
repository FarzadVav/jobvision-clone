"use client"

import { useSearchParams } from "next/navigation"
import { useRef } from "react"
import useSWR from "swr"

import { contentFetcher } from "@/utils/fetcher"
import { FILTER_KEYS } from "@/utils/initialData"
import Input from "./Form/Input"
import Button from "./Button"
import AutoComplete from "./Form/AutoComplete"
import search from "@/app/actions/search"

const SearchForm = () => {
  const searchParams = useSearchParams()
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
      <Input
        placeholder="عنوان شغلی یا شرکت ..."
        value={searchParams.get(FILTER_KEYS.search) || ""}
        name={FILTER_KEYS.search}
      />
      <AutoComplete
        placeholder="گروه شغلی"
        value={searchParams.get(FILTER_KEYS.category) || ""}
        name={FILTER_KEYS.category}
        data={content?.categories.map((category) => category.name) || []}
      />
      <AutoComplete
        placeholder="شهر"
        value={searchParams.get(FILTER_KEYS.city) || ""}
        name={FILTER_KEYS.city}
        data={content?.cities.map((city) => city.name) || []}
      />
      <Button variant={"primary"} size={"lg"}>
        جستجو
      </Button>
    </form>
  )
}

export default SearchForm
