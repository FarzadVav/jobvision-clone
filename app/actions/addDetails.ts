"use server"

import { detailsFormStateT } from "../employer/details/page"
import { prisma } from "@/utils/client"
import getMe from "./getMe"

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
      year: year.length
        ? year.trim().length === 4 ? null : "سال تاسیس باید 4 رقمی باشد"
        : null,
      minEmployee: maxEmployee.length
        ? +minEmployee.trim() > 1 ? null : "تعداد کارکنان شرکت باید حداقل 2 نفر باشند"
        : null,
      maxEmployee: minEmployee.length
        ? +maxEmployee.trim() < 1000
          ? +maxEmployee.trim() > +minEmployee.trim()
            ? null
            : "حداکثر تعداد کارکنان باید بیشتر از حداقل آن باشد"
          : "تعداد کارکنان شرکت نمی‌تواند بیشتر از هزار نفر باشند"
        : null,
      activity: activity.length
        ? activity.trim().length >= 3
          ? activity.trim().length <= 64
            ? null
            : "متن حوزه فعالیت نمی‌تواند طولانی باشد"
          : "متن حوزه فعالیت کوتاه است"
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
    if (user) {
      await prisma.companies.update({
        where: { email: user.email },
        data: {
          name,
          logo: file.size > 0 ? file.name : null,
          year: parseInt(year),
          about,
          activity,
          city_id: city || null,
          employees: [+minEmployee || 0, +maxEmployee || 0],
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