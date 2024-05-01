import { useEffect, useRef, useState } from "react"
import { v4 as uuid } from "uuid"
import { IconChevronDown } from "@tabler/icons-react"

import Title from "../Title"
import Button from "../Button"
import { FOOTER_BLOGS } from "@/utils/initialData"
import Link from "next/link"

const ToggalableSectionOfFooter = () => {
  const [showSection, setShowSection] = useState<boolean>(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showSection) {
      sectionRef.current
        ? (sectionRef.current.style.maxHeight = `${sectionRef.current?.scrollHeight}px`)
        : null
    } else {
      sectionRef.current ? (sectionRef.current.style.maxHeight = "0") : null
    }
  }, [showSection])

  return (
    <>
      <div
        className={`overflow-hidden transition-all ${showSection ? "opacity-100" : "opacity-0"}`}
        ref={sectionRef}
      >
        <Title className="mt-6" size={"sm"}>
          مراحل استفاده از امکانات جاب ویژن
        </Title>
        <p className="text-justify mt-3">
          در ادامه، به طور مختصر مراحل و نحوه استفاده از امکاناتی را که سایت کاریابی و استخدامی جاب
          ویژن در اختیار شما قرار می‌دهد بررسی می‌کنیم.
        </p>
        <Title size={"sm"} className="mt-6">
          ثبت‌نام در سایت جاب ویژن
        </Title>
        <p className="text-justify mt-3">
          برای ارسال رزومه از طریق سایت استخدامی جاب ویژن، ابتدا باید در سایت ثبت نام کنید. برای این
          کار روی دکمه‌ی ورود/عضویت کلیک کنید. در این جا، کافی است برای ثبت نام، ایمیل خود را وارد
          کرده و برای حساب کاربری‌تان یک رمز عبور انتخاب نمایید. علاوه بر آن، امکان ثبت‌نام با گوگل
          و لینکدین نیز به شما داده شده است.
        </p>
        <Title size={"sm"} className="mt-6">
          آخرین مطالب بلاگ
        </Title>
        <ul className="flex items-center gap-3 mt-3 max-sm:flex-col">
          {FOOTER_BLOGS.map((blog) => (
            <li key={uuid()} className="max-sm:w-full">
              <Link href={blog.link} className="w-full">
                <Button className="bg-white/5 w-full">{blog.name}</Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-b border-solid border-white/5 flex justify-center pb-6 mt-5 mb-11">
        <Button className="bg-red-2000" onClick={() => setShowSection((prev) => !prev)}>
          {showSection ? "مشاهده موارد کمتر" : "مشاهده موارد بیشتر"}
          <IconChevronDown className={`icon ${showSection ? "-scale-y-100" : ""}`} />
        </Button>
      </div>
    </>
  )
}

export default ToggalableSectionOfFooter
