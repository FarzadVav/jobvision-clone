"use server"

import { redirect } from "next/navigation"

const search = async (formData: FormData) => {
  const search = formData.get("search") as string
  const category = formData.get("category") as string
  const city = formData.get("city") as string

  const params = new URLSearchParams()
  if (search) params.set("search", search)
  if (category) params.set("category", category)
  if (city) params.set("city", city)

  redirect("/jobs" + "?" + params.toString())
}

export default search