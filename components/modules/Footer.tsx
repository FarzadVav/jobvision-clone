import Link from "next/link"
import Image from "next/image"
import { ReactNode } from "react"
import { v4 as uuid } from "uuid"
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandX,
} from "@tabler/icons-react"

import { FOOTER_ACCORDIONS, FOOTER_LINKS } from "@/utils/initialData"
import FAQAccordion from "../accordions/FAQAccordion"
import Title from "../Title"
import ToggalableSectionOfFooter from "./ToggalableSectionOfFooter"
import LinksAccordion from "../accordions/LinksAccordion"
import Button from "../Button"

const FOOTER_SOCIALS: { link: string; svg: ReactNode; title: string }[] = [
  {
    link: "https://www.twitter.com",
    svg: <IconBrandX className="icon-lg" />,
    title: "twitter",
  },
  {
    link: "https://www.telegram.org",
    svg: <IconBrandTelegram className="icon-lg" />,
    title: "telegram",
  },
  {
    link: "https://www.instagram.com",
    svg: <IconBrandInstagram className="icon-lg" />,
    title: "instagram",
  },
  {
    link: "https://www.linkedin.com",
    svg: <IconBrandLinkedin className="icon-lg" />,
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
          {FOOTER_ACCORDIONS.map((accordion, i) => (
            <FAQAccordion key={uuid()} length={i + 1} {...accordion} />
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

        <div className="w-full hidden justify-between sm:flex">
          {FOOTER_LINKS.map((link) => (
            <div key={uuid()} className="flex flex-col">
              <span className="dana-bold">{link.title}</span>
              <ul className="flex flex-col mt-1.5">
                {link.links.map((sublink) => (
                  <li key={uuid()} className="w-full mt-1.5">
                    <Link
                      className="underline decoration-transparent transition hover:decoration-white"
                      href={sublink.link}
                    >
                      {sublink.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex">
            <Image
              className="bg-white object-cover object-center rounded-md p-5 mt-6 transition-transform hover:-translate-y-1 lg:mt-0"
              src="/images/enamad.webp"
              alt="لوگوی ای نماد"
              height={176}
              width={176}
            />
            <Image
              className="bg-white object-cover object-center rounded-md p-5 mt-6 mr-3 transition-transform hover:-translate-y-1 lg:mt-0"
              src="/images/samandehi.webp"
              alt="لوگوی سامان‌دهی"
              height={176}
              width={176}
            />
          </div>
        </div>
        {FOOTER_LINKS.length ? (
          <ul className="w-full flex-col justify-center items-center mt-6 sm:hidden">
            {FOOTER_LINKS.map((link) => (
              <LinksAccordion
                key={uuid()}
                title={link.title}
                text={
                  <ul className="w-full flex flex-col justify-center items-center">
                    {link.links.map((sublink) => (
                      <li key={uuid()} className="w-full mt-3 first:mt-0">
                        <Link
                          href={sublink.link}
                          className="underline decoration-transparent transition hover:decoration-white"
                        >
                          {sublink.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                }
              />
            ))}
          </ul>
        ) : null}

        <p className="border-white/5 border-t border-solid w-full text-justify pt-9 mt-12">
          جاب‌ویژن بعنوان اولین ارائه دهنده بسته جامع خدمات کاریابی و استخدام، تجربه برگزاری موفق
          ادوار مختلف نمایشگاه‌های کار شریف و ایران را در کارنامه کاری خود دارد.سیستم هوشمند انطباق،
          رزومه ساز دو زبانه، تست‌های خودشناسی، ارتقای توانمندی‌ها و همکاری با معتبرترین سازمان‌ها
          برای استخدام از ویژگی‌های متمایز جاب‌ویژن است.
        </p>
        <p className="mt-3">
          <span className="">جاب‌ویژن محصولی دانش بنیان شناخته شده است.</span>
          <span className="mr-3">
            دارای مجوز رسمی کاریابی الکترونیکی از وزارت کار، تعاون و رفاه اجتماعی.
          </span>
        </p>

        <div className="w-full flex justify-between items-center pb-4 mt-9 sm:pb-6">
          <Link href={"/"}>
            <Button className="px-0">
              <Image src="/images/logo-white.svg" alt="لوگوی جاب ویژن" height={38} width={86} />
            </Button>
          </Link>
          <div className="flex justify-center items-center">
            {FOOTER_SOCIALS.map((social) => (
              <a
                key={uuid()}
                className="text-white px-3 transition-transform first-of-type:pr-0 last-of-type:pl-0 hover:-translate-y-0.5"
                href={social.link}
                target="_blank"
                title={social.title}
              >
                {social.svg}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
