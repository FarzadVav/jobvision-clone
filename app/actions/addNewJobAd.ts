"use server"

import { newJobAdFormStateT } from "../employer/new-jobad/page"
import { prisma } from "@/utils/lib/client"
import getMe from "./getMe"

const addNewJobAd = async (formData: FormData) => {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const workTimes = formData.get("workTimes") as string
  const businessTrips = formData.get("businessTrips") as string
  const minAge = formData.get("minAge") as string
  const maxAge = formData.get("maxAge") as string
  const minSalary = formData.get("minSalary") as string
  const maxSalary = formData.get("maxSalary") as string
  const showMaxSalary = formData.get("show-maxSalary") as ("on" | null)
  const gender = formData.get("gender") as ("male" | "female" | "")
  const category = formData.get("category") as string
  const cooperationType = formData.get("cooperationType") as string
  const tags = formData.get("tags") as string
  const benefits = formData.get("benefits") as string
  const abilities = formData.get("abilities") as string
  const education = formData.get("education") as string
  const languages = formData.get("languages") as string
  const techs = formData.get("techs") as string
  const endMilitaryService = formData.get("end_military_service") as ("on" | null)
  const isUrgent = formData.get("is_urgent") as ("on" | null)
  const isRemote = formData.get("is_remote") as ("on" | null)

  const formState: newJobAdFormStateT = {
    fields: {
      title: title.trim().length >= 3
        ? title.trim().length <= 128 ? null : "عنوان آگهی نمی‌تواند طولانی باشد"
        : "عنوان آگهی کوتاه است",
      description: description.trim().length >= 3 ? null : "توضیحات آگهی کوتاه است",
      workTimes: workTimes.trim().length >= 3
        ? workTimes.trim().length <= 128 ? null : "شرح ساعت کاری نمی‌تواند طولانی باشد"
        : "شرح ساعت کاری کوتاه است",
      businessTrips: businessTrips.trim().length >= 3
        ? businessTrips.trim().length <= 128 ? null : "شرح سفر های کاری نمی‌تواند طولانی باشد"
        : "شرح سفر های کاری کوتاه است",
      minAge: +minAge.trim() >= 18
        ? +minAge.trim() <= 60 ? null : "حداقل سن کارجو نمی‌تواند بیشتر از 50 سال باشد"
        : "سن کارجو باید حداقل 18 باشد",
      maxAge: +maxAge.trim() <= 70
        ? +maxAge.trim() > +minAge.trim()
          ? null
          : "حداکثر سن کارجو نمی‌تواند کمتر از حداقل آن باشد"
        : "سن کارجو نمی‌تواند بیشتر از 70 باشد",
      minSalary: +minSalary.trim() >= 5 ? null : "مبلغ استخدام باید حداقل 5 میلیون باشد",
      maxSalary: showMaxSalary === "on"
        ? +maxSalary.trim() > +minSalary.trim()
          ? +maxSalary.trim() - +minSalary.trim() <= 5
            ? null
            : "اختلاف قیمت نمی‌تواند بیشتر از 5 میلیون باشد"
          : "حداقل مبلغ استخدام نمی‌تواند بیشتر از حداکثر آن باشد"
        : null,
      category: category.trim().length ? null : "لطفا یک دسته بندی را انتخاب کنید",
      cooperationType: cooperationType.trim().length ? null : "لطفا نوع قرارداد را انتخاب کنید",
      tags: JSON.parse(tags).length ? null : "لطفا چند تگ شغلی انتخاب کنید",
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
      const currentCategory = await prisma.categories.findUnique({ where: { name: category } })
      const currentCooperationType = await prisma.cooperationTypes.findUnique({ where: { name: cooperationType } })
      const currentTags = await prisma.tags.findMany({ where: { name: { in: JSON.parse(tags) } } })

      await prisma.jobAds.create({
        data: {
          title,
          description,
          work_times: workTimes,
          business_trips: businessTrips,
          age: [+minAge, +maxAge],
          salary: showMaxSalary === "on" ? [+minSalary, +maxSalary] : [+minSalary],
          gender: gender === "male",
          benefits: JSON.parse(benefits),
          abilities: JSON.parse(abilities),
          education: JSON.parse(education),
          languages: JSON.parse(languages),
          techs: JSON.parse(techs),
          end_military_service: endMilitaryService === "on",
          is_urgent: isUrgent === "on",
          is_remote: isRemote === "on",
          category_id: currentCategory?.id || "",
          cooperation_type_id: currentCooperationType?.id || "",
          company_id: user.id,
          tags: {
            create: currentTags.map(tag => ({ tag_id: tag.id }))
          },
        }
      })

      formState.isSuccess = true
      formState.message = null
      return formState
    }
  } catch (error) {
    console.log("Unknown server error on create new [jobAds] --->", error)
    formState.isSuccess = false
    formState.message = "هنگام ایجاد آگهی خطایی رخ داده است، لطفا بعدا تلاش کنید."
    return formState
  }
}

export default addNewJobAd