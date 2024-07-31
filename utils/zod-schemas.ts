import { ZodError, array, z } from "zod";

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
  name: z.string()
    .min(3, { message: "نام شرکت کوتاه است" })
    .max(64, { message: "نام شرکت نمی‌تواند طولانی باشد" }),
  year: z.string().length(4, { message: "سال تاسیس باید 4 رقمی باشد" }),
  employee: z.object({
    minEmployee: z.number().min(2, { message: "تعداد کارکنان شرکت باید حداقل 2 نفر باشند" }),
    maxEmployee: z.number(),
  }).refine(({ maxEmployee, minEmployee }) => (maxEmployee > minEmployee), {
    message: "حداکثر تعداد کارکنان باید بیشتر از حداقل آن باشد",
    path: ["maxEmployee"]
  }),
  city: z.string().min(1, { message: "لطفا شهری که شرکت در آن واقع شده را انتخاب کنید" }),
  about: z.string().min(3, { message: "متن معرفی شرکت کوتاه است" }),
  activity: z.string()
    .min(3, { message: "متن حوزه فعالیت کوتاه است" })
    .max(64, { message: "متن حوزه فعالیت نمی‌تواند طولانی باشد" }),
  fileSize: z.number()
    .max(1024 * 1024 * 3, { message: "حجم عکس نباید بیشتر از 3 مگابایت باشد" })
})
export type ProfileSchemaT = z.infer<typeof profileSchema>

// new jobAd
export const newJobAdSchema = z.object({
  title: z.string()
    .min(3, { message: "عنوان آگهی کوتاه است" })
    .max(128, { message: "عنوان آگهی نمی‌تواند طولانی باشد" }),
  description: z.string()
    .min(3, { message: "توضیحات آگهی کوتاه است" }),
  workTimes: z.string()
    .min(3, { message: "شرح ساعت کاری آگهی کوتاه است" })
    .max(128, { message: "شرح ساعت کاری آگهی نمی‌تواند طولانی باشد" }),
  businessTrips: z.string()
    .min(3, { message: "شرح سفر های کاری آگهی کوتاه است" })
    .max(128, { message: "شرح سفر های کاری آگهی نمی‌تواند طولانی باشد" }),
  age: z.object({
    minAge: z.number()
      .min(18, { message: "سن کارجو باید حداقل 18 باشد" })
      .max(60, { message: "حداقل سن کارجو نمی‌تواند بیشتر از 60 سال باشد" }),
    maxAge: z.number()
      .max(70, { message: "سن کارجو نمی‌تواند بیشتر از 70 باشد" }),
  }).superRefine(({ minAge, maxAge }, ctx) => {
    if (maxAge <= minAge) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "حداکثر سن کارجو نمی‌تواند کمتر از حداقل آن باشد",
        path: ["maxAge"]
      })
    }

    return z.NEVER
  }),
  salary: z.object({
    minSalary: z.number().min(5, { message: "مبلغ استخدام باید حداقل 5 میلیون باشد" }),
    maxSalary: z.number(),
    showMaxSalary: z.boolean(),
  }).superRefine(({ minSalary, maxSalary, showMaxSalary }, ctx) => {
    if (showMaxSalary && (maxSalary <= minSalary)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "حداقل مبلغ استخدام نمی‌تواند بیشتر از حداکثر آن باشد",
        path: ["maxSalary"]
      })
    }

    if (showMaxSalary && (maxSalary - minSalary > 10)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "اختلاف قیمت نمی‌تواند بیشتر از 10 میلیون باشد",
        path: ["maxSalary"]
      })
    }
  }),
  category: z.string().min(1, { message: "لطفا یک دسته بندی را انتخاب کنید" }),
  cooperationType: z.string().min(1, { message: "لطفا نوع قرارداد را انتخاب کنید" }),
  tags: z.string().array().min(1, { message: "لطفا حداقل یک تگ شغلی انتخاب کنید" }),
})
export type NewJobAdSchemaT = z.infer<typeof newJobAdSchema>