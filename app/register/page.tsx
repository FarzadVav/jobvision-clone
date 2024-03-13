"use client"

import Link from "next/link"

import register from "@/app/actions/register"
import Button from "@/components/Button"
import Input from "@/components/Input"
import Title from "@/components/Title"

const Page = () => {
  return (
    <div className="container">
      <div className="border border-solid border-light w-96 mx-auto rounded-lg overflow-hidden">
        <Title className="mt-3 lg:mt-6" size={"sm"}>
          <h1 className="text-center">ورود / ثبت نام</h1>
        </Title>
        <span className="text-dark block text-sm text-center leading-relaxed px-3 lg:px-9 mt-3">
          سیستم به صورت خودکار ثبت نام یا ورود شما را تشخیص می‌دهد
        </span>
        <form className="w-full px-3 my-6 lg:px-6" action={register}>
          <Input type="email" placeholder="ایمیل" name="email" />
          <Input className="mt-3" type="text" placeholder="رمز عبور" name="password" />
          <Button className="w-full mt-3" size={"lg"} variant={"primary"}>
            ادامه
          </Button>
        </form>
        <div className="bg-light/25 border-t border-solid border-light p-3 lg:p-6">
          <p className="text-sm text-center">
            مشکلی پیش آمده است؟
            <Link className="text-primary mr-2" href={"/register"}>
              گزارش
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
