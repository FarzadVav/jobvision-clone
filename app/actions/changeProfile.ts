"use server"

import { unlink, writeFile } from "fs"
import path from "path"
import { v1 as uuid } from "uuid"

import { ProfileSchemaT, getErrors, profileSchema } from "@/utils/lib/zod-schemas"
import { prisma } from "@/utils/lib/client"
import getMe from "./getMe"
import FormStateT from "@/types/formState.types"

const changeProfile = async (formData: FormData) => {
  const name = formData.get("name") as string
  const year = formData.get("year") as string
  const minEmployee = formData.get("minEmployee") as string
  const maxEmployee = formData.get("maxEmployee") as string
  const city = formData.get("city") as string
  const about = formData.get("about") as string
  const activity = formData.get("activity") as string
  const file = formData.get("file") as File
  const knowledgeBased = formData.get("knowledgeBased") as "on"

  const fields: ProfileSchemaT = {
    name,
    year,
    employee: {
      minEmployee: +minEmployee,
      maxEmployee: +maxEmployee,
    },
    city,
    about,
    activity,
    fileSize: file.size
  }
  const checkFields = profileSchema.safeParse(fields)

  const formState: FormStateT = {
    fields: checkFields.success ? {} : getErrors(checkFields.error)
  }
  if (!checkFields.success) return formState

  try {
    const user = await getMe()
    const currentCity = await prisma.cities.findUnique({ where: { name: city } })

    await prisma.companies.update({
      where: { email: user?.email },
      data: {
        name,
        year: parseInt(year),
        about,
        activity,
        city_id: currentCity?.id,
        employees: [+minEmployee, +maxEmployee],
        knowledgeBased: knowledgeBased === "on"
      }
    })

    if (file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const fileName = uuid() + "_" + file.name
      writeFile(
        path.join(process.cwd(), "public/uploads/" + fileName),
        buffer,
        async (err) => {
          if (!err) {
            await prisma.companies.update({
              where: { email: user?.email },
              data: { logo: `/uploads/${fileName}` }
            })

            if (user?.logo) {
              unlink(path.join(process.cwd(), "public/", user?.logo || ""), err => {
                console.error("error on unlink a file in [changeProfile.ts]", err)
              })
            }
          }
        }
      )
    }

    formState.isSuccess = true
    formState.message = undefined
    return formState
  } catch (error) {
    console.log("Unknown server error on update [companies] --->", error)
    formState.isSuccess = false
    formState.message = "هنگام ثبت اطلاعات شما خطایی رخ داده است، لطفا بعدا تلاش کنید."
    return formState
  }
}

export default changeProfile