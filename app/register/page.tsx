"use client"

import Link from "next/link"
import { useState } from "react"

import register from "@/app/actions/register"
import Button from "@/components/Button"
import Input from "@/components/modules/forms/Input"
import Title from "@/components/Title"
import createActionState from "@/utils/formActions"
import FormActionMessages from "@/components/FormActionMessages"

export type RegisterFieldsT = {
  email?: string
  password?: string
}

const Page = () => {
  const [formState, setFormState] = useState(createActionState<RegisterFieldsT>({}))

  return (
    <div className="container h-[calc(100vh-4.5rem)] flex items-center">
      <div className="border border-solid border-light w-96 mx-auto rounded-lg overflow-hidden">
        <Title className="justify-center mt-3 lg:mt-6" size={"sm"}>
          <h1 className="text-center">ورود / ثبت نام</h1>
        </Title>
        <span className="block text-sm text-center px-3 lg:px-9 mt-3">
          به تیم بزرگ جاب‌ویژن خوش اومدی
        </span>
        <form
          className="w-full px-3 my-3 lg:px-6"
          action={async (formData: FormData) => {
            const newState = await register(formData)
            newState && setFormState(newState)
          }}
        >
          <Input
            type="email"
            placeholder="example@gmail.com"
            name="email"
            dir="ltr"
            error={formState.fields.email}
          />
          <Input
            className="mt-3"
            type="text"
            placeholder="pass****"
            name="password"
            dir="ltr"
            error={formState.fields.password}
          />
          <FormActionMessages messages={formState.messages} />
          <Button className="w-full mt-3" size={"lg"} variant={"primaryFill"}>
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
