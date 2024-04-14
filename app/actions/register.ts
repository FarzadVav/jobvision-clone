"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

import { registerStateT } from "@/app/register/page"
import { comparePassword, getToken, hashPassword } from "@/utils/auth"
import { prisma } from "@/utils/lib/client"


const register = async (prevState: registerStateT, formData: FormData) => {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!z.string().email().safeParse(email).success) {
    return prevState = { message: "ایمیل را به درستی وارد کنید" }
  }
  if (!z.string().min(4).safeParse(password).success) {
    return prevState = { message: "رمز عبور امن تری وارد کنید" }
  }

  try {
    const user = await prisma.companies.findUnique({ where: { email } })
    if (user && !comparePassword(password, user.password)) {
      return prevState = { message: "رمز عبور به درستی وارد نشده است!" }
    }

    const currentPassword = user?.password || hashPassword(password) as string
    const token = getToken({ email, password: currentPassword }) as string

    cookies().set("token", token, { path: "/", httpOnly: true, maxAge: 2_592_000 })

    if (!user) {
      await prisma.companies.create({
        data: {
          email,
          password: currentPassword
        }
      })
    }
  } catch (error) {
    console.log("Unknown error on [registering] --->", error)
  }

  redirect("/employer")
}

export default register