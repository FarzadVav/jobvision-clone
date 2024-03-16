"use server"

import { addDetailsSateT } from "../employer/details/page"

const addDetails = async (prevState: addDetailsSateT, formData: FormData) => {
  const name = formData.get("name") as string
  const year = formData.get("year") as string
  const minEmployee = formData.get("minEmployee") as string
  const maxEmployee = formData.get("maxEmployee") as string
  const about = formData.get("about") as string
  const activity = formData.get("activity") as string
  const file = formData.get("file") as File
  const knowledgeBased = formData.get("knowledgeBased") as ("on" | null)

  prevState = {
    name: name.trim().length >= 3 ? null : "نام شرکت کوتاه است",
    year: year.trim().length === 4 ? null : "سال تاسیس باید 4 رقمی باشد",
    minEmployee: parseInt(minEmployee.trim()) > 1 ? null : "تعداد کارکنان شرکت باید حداقل 2 نفر باشند",
    maxEmployee: parseInt(maxEmployee.trim()) > 1000 ? null : "تعداد کارکنان شرکت باید حداکثر هزار نفر باشند",
    about: about.trim().length >= 3 ? null : "متن درباره شرکت کوتاه است",
    activity: activity.trim().length >= 3 ? null : "متن حوزه فعالیت کوتاه است",
    file: file.size > 0 ? null : "لطفا یک عکس با فرمت (png یا jpg یا jpeg) انتخاب کنید",
  }

  let detailsIsValid: boolean = true
  Object.entries(prevState).map(item => {
    if (item[1]) detailsIsValid = false
  })

  if (!detailsIsValid) return prevState

  console.log("details --->", {
    name,
    year,
    minEmployee,
    maxEmployee,
    about,
    activity,
    file,
    knowledgeBased
  })

  return {} as addDetailsSateT
}

export default addDetails