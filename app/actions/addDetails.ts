"use server"

import { PrismaClient } from "@prisma/client"

import { detailsFormStateT } from "../employer/details/page"
import getMe from "./getMe"

const prisma = new PrismaClient()

const addDetails = async (formData: FormData) => {
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
      name: name.trim().length >= 3 ? null : "نام شرکت کوتاه است",
      year: year.trim().length === 4 ? null : "سال تاسیس باید 4 رقمی باشد",
      minEmployee: parseInt(minEmployee.trim()) > 1 ? null : "تعداد کارکنان شرکت باید حداقل 2 نفر باشند",
      maxEmployee: parseInt(maxEmployee.trim()) < 1000
        ? parseInt(maxEmployee.trim()) > parseInt(minEmployee.trim())
          ? null
          : "حداکثر تعداد کارکنان باید کمتر از حداقل آن باشد"
        : "تعداد کارکنان شرکت باید حداکثر هزار نفر باشند",
      city: city ? null : "لطفا یک شهر انتخاب کنید",
      about: about.trim().length >= 3 ? null : "متن درباره شرکت کوتاه است",
      activity: activity.trim().length >= 3 ? null : "متن حوزه فعالیت کوتاه است",
      file: file.size > 0 ? null : "لطفا یک عکس با فرمت (png یا jpg یا jpeg) انتخاب کنید",
    }
  }

  let formIsValid: boolean = true
  Object.entries(formState.fields).map(item => {
    if (item[1]) return formIsValid = false
  })

  if (!formIsValid) return formState

  try {
    const user = await getMe()
    if (user) {
      await prisma.companies.update({
        where: { email: user.email },
        data: {
          name,
          logo: file.name,
          year: parseInt(year),
          about,
          activity,
          city_id: JSON.parse(city).id,
          province_id: JSON.parse(city).province_id,
          employees: [minEmployee, maxEmployee],
          knowledgeBased: knowledgeBased === "on"
        }
      })

      formState.isSuccess = true
      formState.message = null
      return formState
    }
  } catch (error) {
    console.log("Unknown server error on update [companies] --->", error)
    formState.isSuccess = false
    formState.message = "هنگام ثبت اطلاعات شما خطایی رخ داده است، لطفا بعدا تلاش کنید."
    return formState
  }
}

export default addDetails