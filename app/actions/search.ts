"use server"

import { redirect } from "next/navigation"

import { FILTER_KEYS } from "@/utils/initialData"

const search = async (formData: FormData) => {
  const search = formData.get(FILTER_KEYS.search) as string
  const category = formData.get(FILTER_KEYS.category) as string
  const city = formData.get(FILTER_KEYS.city) as string

  const params = new URLSearchParams()
  if (search) params.set("search", search)
  if (category) params.set("category", category)
  if (city) params.set("city", city)

  redirect("/jobs" + "?" + params.toString())
}

export default search