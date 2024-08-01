"use client"

import { useSearchParams } from "next/navigation"
import { useRef } from "react"
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
  const { data: content } = useSWR("/api/content", contentFetcher)
  const formRef = useRef<HTMLFormElement>(null)

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
          defaultValue={searchParams.get(FILTER_KEYS.category) || ""}
          name={FILTER_KEYS.category}
          data={content?.categories.map((category) => category.name) || []}
          autoComplete="off"
        />
        <AutoComplete
          placeholder="شهر"
          defaultValue={searchParams.get(FILTER_KEYS.city) || ""}
          name={FILTER_KEYS.city}
          data={content?.cities.map((city) => city.name) || []}
          autoComplete="off"
        />
        <Button className="max-sm:w-full" variant={"primary"} size={"lg"}>
          جستجو
        </Button>
      </div>
    </form>
  )
}

export default SearchForm
