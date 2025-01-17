import { ZodError, z } from "zod";

// use for form fields
export const getErrors = (zodErrors: ZodError) => {
  const fields: { [key: string]: string } = {}
  zodErrors.issues.forEach(error => {
    error.path.forEach(path => { fields[path.toString()] = error.message })
  })

  return fields
}

export const profileSchema = z.object({
  name: z.string()
    .min(3, { message: "نام شرکت کوتاه است" })
    .max(64, { message: "نام شرکت نمی‌تواند طولانی باشد" }),
  year: z.string().length(4, { message: "سال تاسیس باید 4 رقمی باشد" }),
  minEmployee: z.number().min(2, "تعداد کارکنان شرکت باید حداقل 2 نفر باشند"),
  city: z.string().min(1, { message: "لطفا شهری که شرکت در آن واقع شده را انتخاب کنید" }),
  about: z.string().min(3, { message: "متن معرفی شرکت کوتاه است" }),
  activity: z.string()
    .min(3, { message: "متن حوزه فعالیت کوتاه است" })
    .max(64, { message: "متن حوزه فعالیت نمی‌تواند طولانی باشد" }),
  fileSize: z.number()
    .max(1024 * 1024 * 3, { message: "حجم عکس نباید بیشتر از 3 مگابایت باشد" })
})

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
  minAge: z.number()
    .min(18, "حداقل سن کارجو 18 می‌باشد")
    .max(50, "حداکثر سن برای این فیلد 50 می‌باشد"),
  maxAge: z.number()
    .min(18, "حداقل سن برای این فیلد 18 می‌باشد")
    .max(60, "حداکثر سن کارجو 60 می‌باشد"),
  minSalary: z.number().min(5, "حداقل حقوق 5 میلیون تومان می‌باشد"),
  category: z.string().min(1, { message: "لطفا یک دسته بندی را انتخاب کنید" }),
  cooperationType: z.string().min(1, { message: "لطفا نوع قرارداد را انتخاب کنید" }),
  tags: z.string().array().min(1, { message: "لطفا حداقل یک تگ شغلی انتخاب کنید" }),
})