"use server"

import { unlink, writeFile } from "fs"
import path from "path"
import { v1 as uuid } from "uuid"

import { getErrors, profileSchema } from "@/utils/lib/zod-schemas"
import { ProfileFormT } from "../employer/profile/page"
import { prisma } from "@/utils/lib/client"
import getMe from "./getMe"

const changeProfile = async (formData: FormData) => {
  const name = formData.get("name") as string | null
  const year = formData.get("year") as string | null
  const minEmployee = parseInt(formData.get("minEmployee") as string) || undefined
  const maxEmployee = parseInt(formData.get("maxEmployee") as string) || undefined
  const city = formData.get("city") as string | null
  const about = formData.get("about") as string | null
  const activity = formData.get("activity") as string | null
  const file = formData.get("file") as File
  const knowledgeBased = formData.get("knowledgeBased") as "on" | null

  const fields = {
    name,
    year,
    minEmployee,
    maxEmployee,
    activity
  }
  const checkFields = profileSchema.safeParse(fields)

  const profileState: ProfileFormT = {
    fields: checkFields.success ? {} : getErrors(checkFields.error)
  }
  if (!checkFields.success) return profileState

  try {
    const user = await getMe()
    await prisma.companies.update({
      where: { email: user?.email },
      data: {
        name,
        year: year ? parseInt(year) : null,
        about,
        activity,
        city_id: city || null,
        employees: [minEmployee || 2, maxEmployee || 10],
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

    profileState.isSuccess = true
    profileState.message = undefined
    return profileState
  } catch (error) {
    console.log("Unknown server error on update [companies] --->", error)
    profileState.isSuccess = false
    profileState.message = "هنگام ثبت اطلاعات شما خطایی رخ داده است، لطفا بعدا تلاش کنید."
    return profileState
  }
}

export default changeProfile