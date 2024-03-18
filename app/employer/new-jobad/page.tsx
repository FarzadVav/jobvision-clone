"use client"

import {
  IconAlignRight,
  IconArrowUpLeft,
  IconCash,
  IconClockHour3,
  IconPencilMinus,
  IconPlane,
} from "@tabler/icons-react"

import Input from "@/components/Input"
import TextArea from "@/components/TextArea"
import { useState } from "react"

const Page = () => {
  const [salaryTo, setSalaryTo] = useState(false)

  return (
    <form className="w-full">
      <label className="dana-bold flex" htmlFor="logo">
        <IconPencilMinus className="icon ml-3" />
        عنوان آگهی
      </label>
      <Input
        className="mt-3"
        error={!!false}
        type="text"
        placeholder="مثل استخدام مهندس نرم افزار"
        name="title"
      />

      <label className="dana-bold flex mt-6" htmlFor="logo">
        <IconAlignRight className="icon ml-3" />
        توضیحات لازم
      </label>
      <TextArea
        className="mt-3"
        error={!!false}
        placeholder="توضیحات این موقعیت شغلی ..."
        name="description"
      />

      <div className="w-full flex items-center mt-6">
        <div className="w-1/2">
          <label className="dana-bold flex" htmlFor="logo">
            <IconClockHour3 className="icon ml-3" />
            شرح ساعت کاری
          </label>
          <Input
            className="mt-3"
            error={!!false}
            type="text"
            placeholder="5 روز در هفته از ساعت صبح تا ..."
            name="workTime"
          />
        </div>
        <div className="w-1/2 mr-3">
          <label className="dana-bold flex" htmlFor="logo">
            <IconPlane className="icon ml-3 -rotate-90" />
            شرح سفر های کاری
          </label>
          <Input
            className="mt-3"
            error={!!false}
            type="text"
            placeholder="3 روز در سال برای تفریح ..."
            name="businessTrip"
          />
        </div>
      </div>

      <div className="w-full flex items-center mt-6">
        <div className={salaryTo ? "w-1/2" : "w-full"}>
          <label className="dana-bold flex mt-6" htmlFor="logo">
            <IconCash className="icon ml-3" />
            میزان حقوق
          </label>
          <Input
            className="mt-3"
            error={!!false}
            type="text"
            placeholder={`برای مثال${salaryTo ? " از" : ""} 15 میلیون`}
            name="salaryFrom"
          />
        </div>
        <div className={`w-1/2 ${salaryTo ? "block" : "hidden"} mr-3`}>
          <label className="dana-bold flex mt-6" htmlFor="logo">
            <IconArrowUpLeft className="icon ml-3" />
            تا این قیمت
          </label>
          <Input
            className="mt-3"
            error={!!false}
            type="text"
            placeholder="تا 20 میلیون"
            name="salaryTo"
          />
        </div>
      </div>
      <label className="flex mt-3 cursor-pointer" htmlFor="salaryTo">
        ایجاد بازه قیمت
        <input
          id="salaryTo"
          className="mr-3"
          type="checkbox"
          onChange={(e) => setSalaryTo(e.target.checked)}
        />
      </label>
    </form>
  )
}

export default Page
