"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import {
  IconAlignBoxLeftMiddle,
  IconAlignRight,
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

import { contentFetcher } from "@/utils/fetcher"
import Input from "@/components/Input"
import TextArea from "@/components/TextArea"
import SelectBox from "@/components/SelectBox"
import AutoComplete from "@/components/AutoComplete"
import MultiSelect from "@/components/MultiSelect"
import ComboBox from "@/components/ComboBox"
import Button from "@/components/Button"
import Label from "@/components/Label"

const Page = () => {
  const { data: content } = useSWR("/api/content", contentFetcher)
  const [salaryTo, setSalaryTo] = useState(false)

  return (
    <form className="w-full">
      <Label htmlFor="title">
        <IconPencilMinus className="icon ml-3" />
        عنوان آگهی
      </Label>
      <Input
        id="title"
        error={!!false}
        type="text"
        placeholder="مثل استخدام مهندس نرم افزار"
        name="title"
      />

      <Label className="mt-6" htmlFor="description">
        <IconAlignRight className="icon ml-3" />
        توضیحات لازم
      </Label>
      <TextArea
        id="description"
        error={!!false}
        placeholder="توضیحات این موقعیت شغلی ..."
        name="description"
      />

      <div className="w-full flex items-center mt-6">
        <div className="w-1/2">
          <Label htmlFor="workTime">
            <IconClockHour3 className="icon ml-3" />
            شرح ساعت کاری
          </Label>
          <Input
            id="workTime"
            error={!!false}
            type="text"
            placeholder="5 روز در هفته از ساعت صبح تا ..."
            name="workTime"
          />
        </div>
        <div className="w-1/2 mr-3">
          <Label htmlFor="businessTrip">
            <IconPlane className="icon ml-3 -rotate-90" />
            شرح سفر های کاری
          </Label>
          <Input
            id="businessTrip"
            error={!!false}
            type="text"
            placeholder="3 روز در سال برای تفریح ..."
            name="businessTrip"
          />
        </div>
      </div>

      <div className="w-full flex items-end mt-6">
        <div className="w-1/2">
          <Label htmlFor="ageFrom">
            <IconUserUp className="icon ml-3" />
            میزان بازه سنی
          </Label>
          <Input
            id="ageFrom"
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
          <Label htmlFor="salaryFrom">
            <IconCash className="icon ml-3" />
            میزان حقوق
          </Label>
          <Input
            id="salaryFrom"
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
      <Label className="mt-3" htmlFor="show-salaryTo">
        ایجاد بازه قیمت
        <input
          id="show-salaryTo"
          className="mr-3 mb-0.5"
          type="checkbox"
          onChange={(e) => setSalaryTo(e.target.checked)}
        />
      </Label>

      <Label className="mt-6" htmlFor="gender">
        <IconGenderBigender className="icon ml-3" />
        جنسیت
      </Label>
      <SelectBox id="gender" error={!!false} name="gender">
        <option value="">فرقی ندارد</option>
        <option value="male">مرد</option>
        <option value="female">زن</option>
      </SelectBox>

      <Label className="mt-6" htmlFor="catogory">
        <IconBriefcase className="icon ml-3" />
        دسته بندی شغلی
      </Label>
      <AutoComplete
        id="catogory"
        error={!!false}
        data={content?.categories.map((category) => category.name) || []}
        name="catogory"
        placeholder="یک مورد را سرچ و انتخاب کنید"
      />

      <Label className="mt-6" htmlFor="cooperatoinType">
        <IconFileDescription className="icon ml-3" />
        نوع قرارداد
      </Label>
      <AutoComplete
        id="cooperatoinType"
        error={!!false}
        data={content?.cooperationTypes.map((type) => type.name) || []}
        name="cooperatoinType"
        placeholder="یک مورد را سرچ و انتخاب کنید"
      />

      <Label className="mt-6" htmlFor="tags">
        <IconTags className="icon ml-3" />
        تگ های شغلی
      </Label>
      <MultiSelect
        id="tags"
        error={!!false}
        data={content?.tags.map((tag) => tag.name) || []}
        name="tags"
        placeholder="چند مورد را سرچ و انتخاب کنید"
      />

      <Label className="mt-6" htmlFor="benefits">
        <IconSparkles className="icon ml-3" />
        مزیت های این شغل
      </Label>
      <ComboBox
        id="benefits"
        error={!!false}
        name="benefits"
        placeholder="چند مورد را اضافه کنید"
      />

      <Label className="mt-6" htmlFor="abilities">
        <IconAlignBoxLeftMiddle className="icon ml-3" />
        شاخص های کلیدی فرد
      </Label>
      <ComboBox
        id="abilities"
        error={!!false}
        name="abilities"
        placeholder="چند مورد را اضافه کنید"
      />

      <Label className="mt-6" htmlFor="education">
        <IconSchool className="icon ml-3" />
        مدارک تحصیلی
      </Label>
      <ComboBox
        id="education"
        error={!!false}
        name="education"
        placeholder="چند مورد را اضافه کنید"
      />

      <Label className="mt-6" htmlFor="language">
        <IconWorld className="icon ml-3" />
        زبان های بین المللی
      </Label>
      <ComboBox
        id="language"
        error={!!false}
        name="language"
        placeholder="چند مورد را اضافه کنید"
      />

      <Label className="mt-6" htmlFor="tech">
        <IconComponents className="icon ml-3" />
        تکنولوژی ها
      </Label>
      <ComboBox id="tech" error={!!false} name="tech" placeholder="چند مورد را اضافه کنید" />

      <Button className="mt-6" variant={"primary"} size={"lg"}>
        ایجاد آگهی
      </Button>
    </form>
  )
}

export default Page
