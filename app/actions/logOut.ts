"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const logOut = async () => {
  cookies().delete("token")

  redirect("/")
}

export default logOut