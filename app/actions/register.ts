"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const register = async (formData: FormData) => {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  let user = await prisma.companies.findUnique({ where: { email } })
  if (!user) {
    user = await prisma.companies.create({
      data: {
        email,
        password
      }
    })
  }

  console.log("email --->", email)
  console.log("password --->", password)
  console.log("user --->", user)

  return {}
}

export default register