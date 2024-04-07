import { ReactNode } from "react"
import { v4 as uuid } from "uuid"
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandX,
} from "@tabler/icons-react"

import { FOOTER_ACCORDIONS } from "@/utils/initialData"
import FAQAccordion from "../accordions/FAQAccordion"
import Title from "../Title"
import ToggalableSectionOfFooter from "./ToggalableSectionOfFooter"

const FOOTER_SOCIALS: { link: string; svg: ReactNode; title: string }[] = [
  {
    link: "https://www.instagram.com",
    svg: <IconBrandInstagram />,
    title: "instagram",
  },
  {
    link: "https://www.telegram.org",
    svg: <IconBrandTelegram />,
    title: "telegram",
  },
  {
    link: "https://www.twitter.com",
    svg: <IconBrandX />,
    title: "twitter",
  },
  {
    link: "https://www.linkedin.com",
    svg: <IconBrandLinkedin />,
    title: "linkeding",
  },
]

const Footer = () => {
  return (
    <div className="text-white bg-dark z-40 pt-12">
      <div className="container">
        <Title size={"sm"}>
          <h6 className="">سوالات متداول</h6>
        </Title>
        <ul className="w-full mt-3">
          {FOOTER_ACCORDIONS.map((accordion, index) => (
            <FAQAccordion key={uuid()} length={index + 1} {...accordion} />
          ))}
        </ul>
        <Title className="mt-6" size={"sm"}>
          استخدام با معتبرترین سایت کاریابی و استخدامی ایران
        </Title>
        <p className="text-justify mt-3">
          پیدا کردن شغل دلخواه و فرصت استخدام جدید در سازمانی معتبر با شرایط مطلوب کاری آسان نیست.
          فرآیند پیدا کردن شغل و کاریابی، همواره مسیری با ناهمواری‌های زیاد برای کارجویان بوده و
          هست. وضعیت نه‌چندان مطلوب بازار کار در ایران از یک طرف و عدم کسب مهارت‌های تخصصی توسط
          کارجویان از طرف دیگر، این موضوع را به یک مسئله بزرگ در جامعه تبدیل کرده است. همه کارجویان
          در هر حوزه، شهر، شغل و سنی تمایل به کوتاه و آسان‌تر کردن این مسیر ناهموار و تسریع در
          استخدام خود دارند. برای موفقیت در این راه به یک رزومه حرفه‌ای، دسترسی به آگهی‌های استخدام
          جدید، شناخت سازمان‌ها، مهارت تخصصی و در نهایت ارسال رزومه به فرصت‌های شغلی متناسب با خود
          نیاز دارید.
          <span className="block">
            سایت استخدامی جاب ویژن از سال 1395 فعالیت خود را آغاز کرد. در سال‌های فعالیت خود پیوسته
            تلاش کرده است با ارائه امکانات و رفع نیازهای شما، مسیر سخت جستجوی کار و کاریابی را به
            راهی هموار تبدیل کند. در این سایت درج آگهی از سوی کارفرمایان یا مسئولان منابع انسانی
            انجام شده و نیازمندی های شغلی، حقوق، بیمه و شرایط جذب نیرو در آگهی کار درج می‌شود. رزومه
            ساز دوزبانه رایگان، ارائه آگهی‌های استخدام جدید معتبرترین سازمان‌ها و شرکت های کشور،
            سیستم هوشمند انطباق، امکان شرکت در آزمون‌های شخصیت شناسی معتبر، به روز بودن فرصت‌های
            شغلی، ارائه دوره‌های آموزشی برای افزایش مهارت کارجویان و ... از جمله این امکانات است.
          </span>
        </p>
        <ToggalableSectionOfFooter />
      </div>
    </div>
  )
}

export default Footer
