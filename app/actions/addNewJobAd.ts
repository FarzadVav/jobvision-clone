"use server"

import { getErrors, newJobAdSchema } from "@/utils/zodSchemas"
import { prisma } from "@/prisma/client"
import FormActionsT from "@/types/formActions.types"
import { NewJobAdFieldsT } from "@/components/NewJobAdForm"
import createActionState from "@/utils/formActions"
import { getCompany } from "@/utils/prismaFetchers"

const addNewJobAd = async (
  formData: FormData
): Promise<FormActionsT<NewJobAdFieldsT> | undefined> => {
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

  const formState = createActionState<NewJobAdFieldsT>({})
  const checkFields = newJobAdSchema.safeParse({
    title,
    description,
    workTimes,
    businessTrips,
    age: {
      minAge: +minAge,
      maxAge: +maxAge,
    },
    salary: {
      minSalary: +minSalary,
      maxSalary: +maxSalary,
      showMaxSalary: showMaxSalary === "on",
    },
    category,
    cooperationType,
    tags: JSON.parse(tags),
  })
  if (!checkFields.success) {
    formState.fields = getErrors(checkFields.error)
    return formState
  }

  try {
    const user = await getCompany()
    if (!user) {
      formState.messages = ["مشکلی در احراز هویت پیش آمده"]
      return formState
    }

    const currentTags = await prisma.tags.findMany({
      where: { name: { in: JSON.parse(tags) } }
    })

    await prisma.jobAds.create({
      data: {
        title,
        description,
        work_times: workTimes,
        business_trips: businessTrips,
        age: [+minAge, +maxAge],
        salary: showMaxSalary === "on" ? [+minSalary, +maxSalary] : [+minSalary],
        gender: gender ? gender === "male" : null,
        benefits: JSON.parse(benefits),
        abilities: JSON.parse(abilities),
        education: JSON.parse(education),
        languages: JSON.parse(languages),
        techs: JSON.parse(techs),
        end_military_service: endMilitaryService === "on",
        is_urgent: isUrgent === "on",
        is_remote: isRemote === "on",
        category_id: category,
        cooperation_type_id: cooperationType,
        company_id: user.id,
        tags: {
          create: currentTags.map(tag => ({ tag_id: tag.id }))
        },
      }
    })

  } catch (error) {
    console.log("Unknown error in addNewJobAd.ts --->", error)
    formState.messages = ["خطایی ناشناس در سرور رخ داده است، بعدا تلاش کنید"]
    return formState
  }

  formState.success = true
  return formState
}

export default addNewJobAd