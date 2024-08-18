"use server"

import { redirect } from "next/navigation"

import { deleteSession } from "@/utils/session"

const logOut = async () => {
  deleteSession()
  redirect("/")
}

export default logOut