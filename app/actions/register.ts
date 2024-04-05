"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

import { registerStateT } from "@/app/register/page"
import { comparePassword, getToken, hashPassword } from "@/utils/auth"
import { prisma } from "@/utils/client"


const register = async (prevState: registerStateT, formData: FormData) => {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!z.string().email().safeParse(email).success) {
    return prevState = { message: "ایمیل را به درستی وارد کنید" }
  }
  if (!z.string().min(4).safeParse(password).success) {
    return prevState = { message: "رمز عبور امن تری وارد کنید" }
  }

  const user = await prisma.companies.findUnique({ where: { email } })
  if (user) {
    if (comparePassword(password, user.password)) {
      cookies().set(
        "token",
        getToken({ email, password: user.password }) as string,
        { path: "/", httpOnly: true, maxAge: 2_592_000 }
      )
      redirect("/")
    }
    else return prevState = { message: "رمز عبور به درستی وارد نشده است!" }
  }
  else {
    const hashedPassword = hashPassword(password) as string
    await prisma.companies.create({
      data: {
        email,
        password: hashedPassword
      }
    })
    cookies().set(
      "token",
      getToken({ email, password: hashedPassword }) as string,
      { path: "/", httpOnly: true, maxAge: 2_592_000 }
    )
    redirect("/")
  }
}

export default register