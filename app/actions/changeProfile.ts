"use server"

import { unlink, writeFile } from "fs"
import path from "path"
import { v1 as uuid } from "uuid"

import { getErrors, profileSchema } from "@/utils/zodSchemas"
import { prisma } from "@/prisma/client"
import { getCompany } from "@/utils/prismaFetchers"
import FormActionsT from "@/types/formActions.types"
import createActionState from "@/utils/formActions"
import { ProfileFieldsT } from "@/components/modules/ProfileForm"

const changeProfile = async (
  formData: FormData
): Promise<FormActionsT<ProfileFieldsT> | undefined> => {
  const name = formData.get("name") as string
  const year = formData.get("year") as string
  const minEmployee = formData.get("minEmployee") as string
  const maxEmployee = formData.get("maxEmployee") as string
  const city = formData.get("city") as string
  const about = formData.get("about") as string
  const activity = formData.get("activity") as string
  const file = formData.get("file") as File
  const knowledgeBased = formData.get("knowledgeBased") as "on"

  const formState = createActionState<ProfileFieldsT>({})
  const checkFields = profileSchema.safeParse({
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
  })
  if (!checkFields.success) {
    formState.fields = getErrors(checkFields.error)
    return formState
  }

  try {
    const user = await getCompany()

    if (file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const fileName = uuid() + "_" + file.name
      writeFile(
        path.join(process.cwd(), "public/uploads/" + fileName),
        buffer,
        async (err) => {
          if (!err) {
            if (user?.logo) {
              unlink(path.join(process.cwd(), "public/", user?.logo || ""), err => {
                if (err) {
                  console.error("error on unlink a file in changeProfile.ts:", err)
                  formState.messages = ["خطایی ناشناس در سرور رخ داده است، بعدا تلاش کنید"]
                  return formState
                }
              })
            }

            await prisma.companies.update({
              where: { email: user?.email },
              data: { logo: `/uploads/${fileName}` }
            })
          } else {
            console.error("error on write a file in changeProfile.ts:", err)
            formState.messages = ["خطایی ناشناس در سرور رخ داده است، بعدا تلاش کنید"]
            return formState
          }
        }
      )
    }

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
  } catch (error) {
    console.log("Unknown error in changeProfile.ts --->", error)
    formState.messages = ["خطایی ناشناس در سرور رخ داده است، بعدا تلاش کنید"]
    return formState
  }

  formState.success = true
  return formState
}

export default changeProfile