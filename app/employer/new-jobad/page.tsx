"use client"

import {
  IconAlignRight,
  IconArrowUpLeft,
  IconBriefcase,
  IconCash,
  IconClockHour3,
  IconFileDescription,
  IconGenderBigender,
  IconPencilMinus,
  IconPlane,
} from "@tabler/icons-react"

import Input from "@/components/Input"
import TextArea from "@/components/TextArea"
import { useState } from "react"
import SelectBox, { SelectBoxWrapper } from "@/components/SelectBox"
import AutoComplete from "@/components/AutoComplete"
import MultiSelect from "@/components/MultiSelect"

const data = ["hello", "world", "javascript"]
const data2 = ["aaa", "vvv", "ggg"]
const data3 = ["front", "back", "ios"]

const Page = () => {
  const [salaryTo, setSalaryTo] = useState(false)

  return (
    <form className="w-full">
      <label className="dana-bold flex" htmlFor="title">
        <IconPencilMinus className="icon ml-3" />
        عنوان آگهی
      </label>
      <Input
        id="title"
        className="mt-3"
        error={!!false}
        type="text"
        placeholder="مثل استخدام مهندس نرم افزار"
        name="title"
      />

      <label className="dana-bold flex mt-6" htmlFor="description">
        <IconAlignRight className="icon ml-3" />
        توضیحات لازم
      </label>
      <TextArea
        id="description"
        className="mt-3"
        error={!!false}
        placeholder="توضیحات این موقعیت شغلی ..."
        name="description"
      />

      <div className="w-full flex items-center mt-6">
        <div className="w-1/2">
          <label className="dana-bold flex" htmlFor="workTime">
            <IconClockHour3 className="icon ml-3" />
            شرح ساعت کاری
          </label>
          <Input
            id="workTime"
            className="mt-3"
            error={!!false}
            type="text"
            placeholder="5 روز در هفته از ساعت صبح تا ..."
            name="workTime"
          />
        </div>
        <div className="w-1/2 mr-3">
          <label className="dana-bold flex" htmlFor="businessTrip">
            <IconPlane className="icon ml-3 -rotate-90" />
            شرح سفر های کاری
          </label>
          <Input
            id="businessTrip"
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
          <label className="dana-bold flex" htmlFor="salaryFrom">
            <IconCash className="icon ml-3" />
            میزان حقوق
          </label>
          <Input
            id="salaryFrom"
            className="mt-3"
            error={!!false}
            type="text"
            placeholder={`برای مثال${salaryTo ? " از" : ""} 15 میلیون`}
            name="salaryFrom"
          />
        </div>
        <div className={`w-1/2 ${salaryTo ? "block" : "hidden"} mr-3`}>
          <label className="dana-bold flex" htmlFor="salaryTo">
            <IconArrowUpLeft className="icon ml-3" />
            تا این قیمت
          </label>
          <Input
            id="salaryTo"
            className="mt-3"
            error={!!false}
            type="text"
            placeholder="تا 20 میلیون"
            name="salaryTo"
          />
        </div>
      </div>
      <label className="flex mt-3 cursor-pointer" htmlFor="show-salaryTo">
        ایجاد بازه قیمت
        <input
          className="mr-3"
          type="checkbox"
          name="show-salaryTo"
          onChange={(e) => setSalaryTo(e.target.checked)}
        />
      </label>

      <label className="dana-bold flex mt-6" htmlFor="gender">
        <IconGenderBigender className="icon ml-3" />
        جنسیت
      </label>
      <SelectBoxWrapper className="mt-3">
        <SelectBox id="gender" error={!!false} name="gender">
          <option value="">یک مورد انتخاب کنید</option>
        </SelectBox>
      </SelectBoxWrapper>

      <label className="dana-bold flex mt-6" htmlFor="catogory">
        <IconBriefcase className="icon ml-3" />
        دسته بندی شغلی
      </label>
      <AutoComplete
        id="catogory"
        wrapperclassName="mt-3"
        error={!!false}
        data={data}
        name="catogory"
        placeholder="یک مورد را سرچ و انتخاب کنید"
      />

      <label className="dana-bold flex mt-6" htmlFor="cooperatoinType">
        <IconFileDescription className="icon ml-3" />
        نوع قرارداد
      </label>
      <AutoComplete
        id="cooperatoinType"
        wrapperclassName="mt-3"
        error={!!false}
        data={data2}
        name="cooperatoinType"
        placeholder="یک مورد را سرچ و انتخاب کنید"
      />

      <label className="dana-bold flex mt-6" htmlFor="tags">
        <IconFileDescription className="icon ml-3" />
        تگ های شغلی
      </label>
      <MultiSelect
        id="tags"
        wrapperclassName="mt-3"
        error={!!false}
        data={data3}
        name="tags"
        placeholder="چند مورد را سرچ و انتخاب کنید"
      />
    </form>
  )
}

export default Page
