"use server"

import { redirect } from "next/navigation"

const search = async (formData: FormData) => {
  const search = formData.get("search") as string
  const category = formData.get("category") as string
  const city = formData.get("city") as string

  let url = "/jobs" + `?search=${search}`

  if (category) url += `&category=${category}`
  if (city) url += `&city=${city}`

  redirect(url)
}

export default search