"use server"

import { PrismaClient } from "@prisma/client"

import { registerStateT } from "@/app/register/page"
import { hashPassword } from "@/lib/auth"
import { checkUserForRegister } from "@/lib/validations"

const prisma = new PrismaClient()

const register = async (prevState: registerStateT, formData: FormData) => {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  let user = await prisma.companies.findUnique({ where: { email } })
  if (user) {
    if (user.password === password) return prevState = { status: true, message: "با موفقیت وارد حسابتان شدید" }
    else return prevState = { status: false, message: "رمز عبور به درستی وارد نشده است!" }
  }
  else {
    await prisma.companies.create({
      data: {
        email,
        password
      }
    })
    return prevState = { status: true, message: "با موفقیت ثبت نام شدید" }
  }
}

export default register