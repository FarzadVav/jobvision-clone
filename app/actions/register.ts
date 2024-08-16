"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { z } from "zod"

import { comparePassword, getToken, hashPassword } from "@/utils/auth"
import { prisma } from "@/prisma/client"
import createActionState from "@/utils/formActions"
import { RegisterFieldsT } from "../register/page"
import FormActionsT from "@/types/formActions.types"


const register = async (formData: FormData): Promise<FormActionsT<RegisterFieldsT> | undefined> => {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const formState = createActionState<RegisterFieldsT>({})

  if (!z.string().email().safeParse(email).success) {
    formState.fields.email = "ایمیل را به درستی وارد کنید"
    return formState
  }
  if (!z.string().min(4).safeParse(password).success) {
    formState.fields.password = "رمز عبور امن تری وارد کنید"
    return formState
  }

  try {
    const user = await prisma.companies.findUnique({ where: { email } })
    if (user && !comparePassword(password, user.password)) {
      formState.messages = ["ایمیل یا رمز عبور به درستی وارد نشده است!"]
      return formState
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
    formState.messages = ["خطایی ناشناس در سرور رخ داده است، بعدا تلاش کنید"]
    return formState
  }

  redirect("/employer")
}

export default register