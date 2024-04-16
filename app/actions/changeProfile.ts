"use server"

import { unlink, writeFile } from "fs"
import path from "path"
import { v1 as uuid } from "uuid"

import { detailsFormStateT } from "../employer/profile/page"
import { prisma } from "@/utils/lib/client"
import getMe from "./getMe"

const changeProfile = async (formData: FormData) => {
  const name = formData.get("name") as string
  const year = formData.get("year") as string
  const minEmployee = formData.get("minEmployee") as string
  const maxEmployee = formData.get("maxEmployee") as string
  const city = formData.get("city") as string
  const about = formData.get("about") as string
  const activity = formData.get("activity") as string
  const file = formData.get("file") as File
  const knowledgeBased = formData.get("knowledgeBased") as ("on" | null)

  const formState: detailsFormStateT = {
    fields: {
      name: name.length
        ? name.trim().length <= 128
          ? null
          : "نام شرکت نمی‌تواند طولانی باشد"
        : null,
      year: year.length
        ? year.trim().length === 4 ? null : "سال تاسیس باید 4 رقمی باشد"
        : null,
      minEmployee: +minEmployee.trim() > 1 ? null : "تعداد کارکنان شرکت باید حداقل 2 نفر باشند",
      maxEmployee: +maxEmployee.trim() < 1000
        ? +maxEmployee.trim() > +minEmployee.trim()
          ? null
          : "حداکثر تعداد کارکنان باید بیشتر از حداقل آن باشد"
        : "تعداد کارکنان شرکت نمی‌تواند بیشتر از هزار نفر باشند",
      activity: activity.length
        ? activity.trim().length <= 64
          ? null
          : "متن حوزه فعالیت نمی‌تواند طولانی باشد"
        : null,
    }
  }

  let formIsValid: boolean = true
  Object.entries(formState.fields).map(item => {
    if (item[1]) return formIsValid = false
  })

  if (!formIsValid) return formState

  try {
    const user = await getMe()
    await prisma.companies.update({
      where: { email: user?.email },
      data: {
        name,
        year: parseInt(year),
        about,
        activity,
        city_id: city || null,
        employees: [+minEmployee || 2, +maxEmployee || 10],
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
    formState.message = null
    return formState
  } catch (error) {
    console.log("Unknown server error on update [companies] --->", error)
    formState.isSuccess = false
    formState.message = "هنگام ثبت اطلاعات شما خطایی رخ داده است، لطفا بعدا تلاش کنید."
    return formState
  }
}

export default changeProfile