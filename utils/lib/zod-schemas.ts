import { ZodError, z } from "zod";

// use for form fields
export const getErrors = (zodErrors: ZodError) => {
  const fields: { [key: string]: string } = {}
  zodErrors.issues.forEach(error => {
    error.path.forEach(path => { fields[path.toString()] = error.message })
  })

  return fields
}

// employer profile
export const profileSchema = z.object({
  name: z.string().max(64, { message: "نام شرکت نمی‌تواند طولانی باشد" }).optional(),
  year: z.string().length(4, { message: "سال تاسیس باید 4 رقمی باشد" }).optional(),
  minEmployee: z.number().min(2, { message: "تعداد کارکنان شرکت باید حداقل 2 نفر باشند" }).optional(),
  maxEmployee: z.number().min(3, { message: "حداکثر تعداد کارکنان شرکت باید بیشتر از 3 نفر باشد" }).optional(),
  activity: z.string().max(64, { message: "متن حوزه فعالیت نمی‌تواند طولانی باشد" }).optional(),
}).refine(data => (data.maxEmployee || 3) > (data.minEmployee || 3), {
  message: "حداکثر تعداد کارکنان باید بیشتر از حداقل آن باشد",
  path: ["maxEmployee"]
})