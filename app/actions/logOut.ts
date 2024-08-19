"use server"

import { cookies } from "next/headers"

import { cookieOptions } from "@/utils/session"

const logOut = async () => cookies().delete(cookieOptions.name)

export default logOut