"use server"

import { cookies } from "next/headers"

import CompaniesT from "@/types/companies.types"

const getMe = async () => {
  const token = cookies().get("token")?.value || ""
  const res = await fetch(process.env.BASE_URL + "/api/getMe", {
    headers: { Authorization: token }
  })
  const user = await res.json()

  if (res.status === 200) return user as CompaniesT

  return null
}

export default getMe