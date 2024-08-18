"use client"

import { useSearchParams } from "next/navigation"
import { useRef, useState } from "react"
import useSWR from "swr"

import { contentFetcher } from "@/utils/fetcher"
import { cn } from "@/utils/tw"
import { FILTER_KEYS } from "@/utils/initialData"
import Input from "./modules/forms/Input"
import Button from "./Button"
import AutoComplete from "./modules/forms/AutoComplete"
import search from "@/app/actions/search"

const SearchForm = ({ className }: { className?: string }) => {
  const searchParams = useSearchParams()
  // Manual fields {
  const [category, setCategory] = useState("")
  const [city, setCity] = useState("")
  // Manual fields }
  const formRef = useRef<HTMLFormElement>(null)
  const { data: content } = useSWR("/api/content", contentFetcher)

  return (
    <form
      className={cn("flex items-center gap-3 max-lg:flex-col", className)}
      ref={formRef}
      action={async (formData: FormData) => {
        await search(formData)
        formRef.current?.reset()
      }}
    >
      <Input
        placeholder="عنوان شغلی یا شرکت ..."
        defaultValue={searchParams.get(FILTER_KEYS.search) || ""}
        name={FILTER_KEYS.search}
      />
      <div className="w-full flex items-center gap-3 max-sm:flex-col">
        <AutoComplete
          placeholder="گروه شغلی"
          autoComplete="off"
          name={FILTER_KEYS.category}
          inputValue={category}
          setInputValue={setCategory}
          defaultValue={searchParams.get(FILTER_KEYS.category) || ""}
          data={content?.categories.map((category) => category.name) || []}
        />
        <AutoComplete
          placeholder="شهر"
          autoComplete="off"
          name={FILTER_KEYS.city}
          inputValue={city}
          setInputValue={setCity}
          defaultValue={searchParams.get(FILTER_KEYS.city) || ""}
          data={content?.cities.map((city) => city.name) || []}
        />
        <Button className="max-sm:w-full" variant={"primaryFill"} size={"lg"}>
          جستجو
        </Button>
      </div>
    </form>
  )
}

export default SearchForm
