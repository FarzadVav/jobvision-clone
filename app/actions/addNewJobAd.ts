"use server"

import { getErrors, newJobAdSchema } from "@/utils/lib/zod-schemas"
import { newJobAdFormT } from "../employer/new-jobad/page"
import { prisma } from "@/utils/lib/client"
import getMe from "./getMe"

const addNewJobAd = async (formData: FormData) => {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const workTimes = formData.get("workTimes") as string
  const businessTrips = formData.get("businessTrips") as string
  const minAge = parseInt(formData.get("minAge") as string) || undefined
  const maxAge = parseInt(formData.get("maxAge") as string) || undefined
  const minSalary = parseInt(formData.get("minSalary") as string) || undefined
  const maxSalary = parseInt(formData.get("maxSalary") as string) || undefined
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

  const fields = {
    title,
    description,
    workTimes,
    businessTrips,
    age: {
      minAge,
      maxAge,
    },
    salary: {
      minSalary,
      maxSalary,
      showMaxSalary: showMaxSalary === "on",
    },
    gender,
    category,
    cooperationType,
    tags: JSON.parse(tags),
  }
  const checkFields = newJobAdSchema.safeParse(fields)
  const newJobAdState: newJobAdFormT = {
    fields: checkFields.success ? {} : getErrors(checkFields.error)
  }
  if (!checkFields.success) return newJobAdState

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
          age: [minAge, maxAge] as number[],
          salary: showMaxSalary === "on"
            ? ([minSalary, maxSalary] as number[])
            : ([minSalary] as number[]),
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

      newJobAdState.isSuccess = true
      newJobAdState.message = null
      return newJobAdState
    }
  } catch (error) {
    console.log("Unknown server error on create new [jobAds] --->", error)
    newJobAdState.isSuccess = false
    newJobAdState.message = "هنگام ایجاد آگهی خطایی رخ داده است، لطفا بعدا تلاش کنید."
    return newJobAdState
  }
}

export default addNewJobAd