"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { IconChevronDown } from "@tabler/icons-react"

import Title from "../Title"
import Button from "../Button"

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
          لینک های مرتبط
        </Title>
        <div className="flex flex-col items-center mt-3 sm:flex-row">
          <Link href={""} className="max-sm:w-full">
            <Button className="underline decoration-white w-full">استخدام بیمه</Button>
          </Link>
          <Link href={""} className="max-sm:w-full">
            <Button className="underline decoration-white w-full">استخدام کارگزاری</Button>
          </Link>
          <Link href={""} className="max-sm:w-full">
            <Button className="underline decoration-white w-full">استخدام خودرو</Button>
          </Link>
        </div>
        <Title size={"sm"} className="mt-6">
          آخرین مطالب بلاگ
        </Title>
        <div className="flex flex-col items-center mt-3 sm:flex-row">
          <Link href={""} className="max-sm:w-full">
            <Button className="underline decoration-white w-full">راهنمای جامع استخدام</Button>
          </Link>
          <Link href={""} className="max-sm:w-full">
            <Button className="underline decoration-white w-full">
              راهنمای جامع رزومه نویسی برای کارجویان
            </Button>
          </Link>
          <Link href={""} className="max-sm:w-full">
            <Button className="underline decoration-white w-full">
              گزارش افزایش حقوق 1402 کارگران
            </Button>
          </Link>
        </div>
      </div>
      <Button className="mt-3 mx-auto" onClick={() => setShowSection((prev) => !prev)}>
        {showSection ? "مشاهده موارد کمتر" : "مشاهده موارد بیشتر"}
        <IconChevronDown className={`icon ${showSection ? "-scale-y-100" : ""}`} />
      </Button>
    </>
  )
}

export default ToggalableSectionOfFooter
