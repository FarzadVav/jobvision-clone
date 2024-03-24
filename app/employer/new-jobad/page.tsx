"use client"

import {
  IconAlignBoxLeftMiddle,
  IconAlignRight,
  IconArrowUpLeft,
  IconBriefcase,
  IconCash,
  IconClockHour3,
  IconComponents,
  IconFileDescription,
  IconGenderBigender,
  IconPencilMinus,
  IconPlane,
  IconSchool,
  IconSparkles,
  IconTags,
  IconUserUp,
  IconWorld,
} from "@tabler/icons-react"

import Input from "@/components/Input"
import TextArea from "@/components/TextArea"
import { useState } from "react"
import SelectBox from "@/components/SelectBox"
import AutoComplete from "@/components/AutoComplete"
import MultiSelect from "@/components/MultiSelect"
import ComboBox from "@/components/ComboBox"
import Button from "@/components/Button"

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

      <div className="w-full flex items-end mt-6">
        <div className="w-1/2">
          <label className="dana-bold flex" htmlFor="ageFrom">
            <IconUserUp className="icon ml-3" />
            میزان بازه سنی
          </label>
          <Input
            id="ageFrom"
            className="mt-3"
            error={!!false}
            type="text"
            placeholder={"برای مثال از 18 سال"}
            name="ageFrom"
          />
        </div>
        <div className="w-1/2 mr-3">
          <Input
            id="ageTo"
            className="mt-3"
            error={!!false}
            type="text"
            placeholder="تا 24 سال"
            name="ageTo"
          />
        </div>
      </div>

      <div className="w-full flex items-end mt-6">
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
          id="show-salaryTo"
          className="mr-3"
          type="checkbox"
          onChange={(e) => setSalaryTo(e.target.checked)}
        />
      </label>

      <label className="dana-bold flex mt-6" htmlFor="gender">
        <IconGenderBigender className="icon ml-3" />
        جنسیت
      </label>
      <SelectBox id="gender" wrapperClassName="mt-3" error={!!false} name="gender">
        <option value="">یک مورد انتخاب کنید</option>
      </SelectBox>

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
        <IconTags className="icon ml-3" />
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

      <label className="dana-bold flex mt-6" htmlFor="benefits">
        <IconSparkles className="icon ml-3" />
        مزیت های این شغل
      </label>
      <ComboBox
        id="benefits"
        wrapperclassName="mt-3"
        error={!!false}
        name="benefits"
        placeholder="چند مورد را اضافه کنید"
      />

      <label className="dana-bold flex mt-6" htmlFor="abilities">
        <IconAlignBoxLeftMiddle className="icon ml-3" />
        شاخص های کلیدی فرد
      </label>
      <ComboBox
        id="abilities"
        wrapperclassName="mt-3"
        error={!!false}
        name="abilities"
        placeholder="چند مورد را اضافه کنید"
      />

      <label className="dana-bold flex mt-6" htmlFor="education">
        <IconSchool className="icon ml-3" />
        مدارک تحصیلی
      </label>
      <ComboBox
        id="education"
        wrapperclassName="mt-3"
        error={!!false}
        name="education"
        placeholder="چند مورد را اضافه کنید"
      />

      <label className="dana-bold flex mt-6" htmlFor="language">
        <IconWorld className="icon ml-3" />
        زبان های بین المللی
      </label>
      <ComboBox
        id="language"
        wrapperclassName="mt-3"
        error={!!false}
        name="language"
        placeholder="چند مورد را اضافه کنید"
      />

      <label className="dana-bold flex mt-6" htmlFor="tech">
        <IconComponents className="icon ml-3" />
        تکنولوژی ها
      </label>
      <ComboBox
        id="tech"
        wrapperclassName="mt-3"
        error={!!false}
        name="tech"
        placeholder="چند مورد را اضافه کنید"
      />

      <Button className="mt-6" variant={"primary"} size={"lg"}>
        ایجاد آگهی
      </Button>
    </form>
  )
}

export default Page
