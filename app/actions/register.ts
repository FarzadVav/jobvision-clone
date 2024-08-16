"use server"

import { redirect } from "next/navigation"
import { z } from "zod"

import { prisma } from "@/prisma/client"
import createActionState from "@/utils/formActions"
import { RegisterFieldsT } from "../register/page"
import FormActionsT from "@/types/formActions.types"
import { compareHashed, hashString } from "@/utils/bcrypt"
import { createSession } from "@/utils/session"


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
    let user = await prisma.companies.findUnique({ where: { email } })
    if (user && !compareHashed(password, user.password)) {
      formState.messages = ["ایمیل یا رمز عبور به درستی وارد نشده است!"]
      return formState
    }

    if (!user) {
      const hashedPassword = hashString(password)
      user = await prisma.companies.create({
        data: {
          email,
          password: hashedPassword
        }
      })
    }
    createSession({ email, password: user.password })
  } catch (error) {
    console.log("Unknown error in register.ts --->", error)
    formState.messages = ["خطایی ناشناس در سرور رخ داده است، بعدا تلاش کنید"]
    return formState
  }

  redirect("/employer")
}

export default register