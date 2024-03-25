"use server"

import { PrismaClient } from "@prisma/client"

import { detailsFormStateT } from "../employer/details/page"
import getMe from "./getMe"
import { newJobAdFormStateT } from "../employer/new-jobad/page"

const prisma = new PrismaClient()

const addNewJobAd = async (formData: FormData) => {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const workTime = formData.get("workTime") as string
  const businessTrip = formData.get("businessTrip") as string
  const minAge = formData.get("minAge") as string
  const maxAge = formData.get("maxAge") as string
  const minSalary = formData.get("minSalary") as string
  const maxSalary = formData.get("maxSalary") as string
  const gender = formData.get("gender") as string
  const category = formData.get("category") as string
  const cooperationType = formData.get("cooperationType") as string
  const tags = formData.get("tags") as string
  const benefits = formData.get("benefits") as string
  const abilities = formData.get("abilities") as string
  const education = formData.get("education") as string
  const languages = formData.get("languages") as string
  const techs = formData.get("techs") as string

  const formState: newJobAdFormStateT = {
    fields: {
      title: title.trim().length >= 3 ? null : "عنوان آگهی کوتاه است",
      description: description.trim().length >= 3 ? null : "توضیحات آگهی کوتاه است",
      workTime: workTime.trim().length >= 3 ? null : "شرح ساعت کاری کوتاه است",
      businessTrip: businessTrip.trim().length >= 3 ? null : "شرح سفر های کاری کوتاه است",
      minAge: parseInt(minAge.trim()) >= 18 ? null : "سن استخدام باید حداقل 18 باشد",
      maxAge: parseInt(maxAge.trim()) <= 69
        ? parseInt(maxAge.trim()) > parseInt(minAge.trim())
          ? null
          : "حداقل سن کارجو نمی‌تواند بیشتر از حداکثر آن باشد"
        : "سن کارجو نمی‌تواند بیشتر از 69 باشد",
      minSalary: parseInt(minSalary.trim()) >= 4 ? null : "مبلغ استخدام باید حداقل 4 میلیون باشد",
      maxSalary: parseInt(maxSalary.trim()) > parseInt(minSalary.trim())
        ? null
        : "حداقل میبلغ استخدام نمی‌تواند بیشتر از حداکثر آن باشد",
      category: category.trim().length ? null : "لطفا یک دسته بندی را انتخاب کنید",
      cooperationType: cooperationType.trim().length ? null : "لطفا نوع قرارداد را انتخاب کنید",
      tags: JSON.parse(tags).length ? null : "لطفا چند تگ شغلی انتخاب کنید",
    }
  }

  let detailsIsValid: boolean = true
  Object.entries(formState.fields).map(item => {
    if (item[1]) return detailsIsValid = false
  })

  if (!detailsIsValid) return formState

  formState.isSuccess = true
  return formState
}

export default addNewJobAd