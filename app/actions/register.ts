"use server"

import { cookies } from "next/headers"
import { z } from "zod"

import { registerFormT } from "@/app/register/page"
import { comparePassword, getToken, hashPassword } from "@/utils/auth"
import { prisma } from "@/prisma/client"


const register = async (formData: FormData): Promise<registerFormT> => {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  let formState: registerFormT = {}

  if (!z.string().email().safeParse(email).success) {
    return formState = { fields: { email: "ایمیل را به درستی وارد کنید" } }
  }
  if (!z.string().min(4).safeParse(password).success) {
    return formState = { fields: { password: "رمز عبور امن تری وارد کنید" } }
  }

  try {
    const user = await prisma.companies.findUnique({ where: { email } })
    if (user && !comparePassword(password, user.password)) {
      return formState = { fields: { password: "رمز عبور به درستی وارد نشده است!" } }
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
    return formState = { message: "یک خطای ناشناس در سرور رخ داده است، بعدا تلاش کنید" }
  }

  return formState = { isSuccess: true }
}

export default register