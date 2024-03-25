"use client"

import { useRef, useState } from "react"
import useSWR from "swr"
import toast from "react-hot-toast"
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
import addNewJobAd from "@/app/actions/addNewJobAd"
import Input from "@/components/Input"
import TextArea from "@/components/TextArea"
import SelectBox from "@/components/SelectBox"
import AutoComplete from "@/components/AutoComplete"
import MultiSelect from "@/components/MultiSelect"
import ComboBox from "@/components/ComboBox"
import Button from "@/components/Button"
import Label from "@/components/Label"

export type newJobAdFormStateT = {
  isSuccess?: boolean
  message?: null | string
  fields: {
    title: null | string
    description: null | string
    workTime: null | string
    businessTrip: null | string
    minAge: null | string
    maxAge: null | string
    minSalary: null | string
    maxSalary?: null | string
    gender?: null | string
    category: null | string
    cooperationType: null | string
    tags: null | string
  }
}

const Page = () => {
  const { data: content } = useSWR("/api/content", contentFetcher)
  const [formState, setFormState] = useState<newJobAdFormStateT>({
    fields: {},
  } as newJobAdFormStateT)
  const [showMaxSalary, setShowMaxSalary] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      className="w-full"
      ref={formRef}
      action={async (formData: FormData) => {
        const newState = await addNewJobAd(formData)
        setFormState(newState || ({ fields: {} } as newJobAdFormStateT))
        if (newState?.isSuccess) {
          toast.success("آگهی جدید با موفقیت ثبت شد")
          formRef.current?.reset()
        }
      }}
    >
      <Label htmlFor="title">
        <IconPencilMinus className="icon ml-3" />
        عنوان آگهی
      </Label>
      <Input
        id="title"
        error={formState.fields.title}
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
        error={formState.fields.description}
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
            error={formState.fields.workTime}
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
            error={formState.fields.businessTrip}
            type="text"
            placeholder="3 روز در سال برای تفریح ..."
            name="businessTrip"
          />
        </div>
      </div>

      <div className="w-full flex items-end mt-6">
        <div className="w-1/2">
          <Label htmlFor="minAge">
            <IconUserUp className="icon ml-3" />
            میزان بازه سنی
          </Label>
          <Input
            id="minAge"
            error={formState.fields.minAge}
            type="text"
            placeholder={"برای مثال از 18 سال"}
            name="minAge"
          />
        </div>
        <div className="w-1/2 mr-3">
          <Input
            id="maxAge"
            className="mt-3"
            error={formState.fields.maxAge}
            type="text"
            placeholder="تا 24 سال"
            name="maxAge"
          />
        </div>
      </div>

      <div className="w-full flex items-end mt-6">
        <div className={showMaxSalary ? "w-1/2" : "w-full"}>
          <Label htmlFor="minSalary">
            <IconCash className="icon ml-3" />
            میزان حقوق
          </Label>
          <Input
            id="minSalary"
            error={formState.fields.minSalary}
            type="text"
            placeholder={`برای مثال${showMaxSalary ? " از" : ""} 15 میلیون`}
            name="minSalary"
          />
        </div>
        <div className={`w-1/2 ${showMaxSalary ? "block" : "hidden"} mr-3`}>
          <Input
            id="maxSalary"
            className="mt-3"
            error={formState.fields.maxSalary}
            type="text"
            placeholder="تا 20 میلیون"
            name="maxSalary"
          />
        </div>
      </div>
      <Label className="mt-3" htmlFor="show-maxSalary">
        ایجاد بازه قیمت
        <input
          id="show-maxSalary"
          className="mr-3 mb-0.5"
          type="checkbox"
          onChange={(e) => setShowMaxSalary(e.target.checked)}
        />
      </Label>

      <Label className="mt-6" htmlFor="gender">
        <IconGenderBigender className="icon ml-3" />
        جنسیت
      </Label>
      <SelectBox id="gender" name="gender">
        <option value="">فرقی ندارد</option>
        <option value="male">مرد</option>
        <option value="female">زن</option>
      </SelectBox>

      <Label className="mt-6" htmlFor="category">
        <IconBriefcase className="icon ml-3" />
        دسته بندی شغلی
      </Label>
      <AutoComplete
        id="category"
        error={formState.fields.category}
        data={content?.categories.map((category) => category.name) || []}
        name="category"
        placeholder="یک مورد را سرچ و انتخاب کنید"
      />

      <Label className="mt-6" htmlFor="cooperationType">
        <IconFileDescription className="icon ml-3" />
        نوع قرارداد
      </Label>
      <AutoComplete
        id="cooperationType"
        error={formState.fields.cooperationType}
        data={content?.cooperationTypes.map((type) => type.name) || []}
        name="cooperationType"
        placeholder="یک مورد را سرچ و انتخاب کنید"
      />

      <Label className="mt-6" htmlFor="tags">
        <IconTags className="icon ml-3" />
        تگ های شغلی
      </Label>
      <MultiSelect
        id="tags"
        data={content?.tags.map((tag) => tag.name) || []}
        name="tags"
        placeholder="چند مورد را سرچ و انتخاب کنید"
      />

      <Label className="mt-6" htmlFor="benefits">
        <IconSparkles className="icon ml-3" />
        مزیت های این شغل
      </Label>
      <ComboBox id="benefits" name="benefits" placeholder="چند مورد را اضافه کنید" />

      <Label className="mt-6" htmlFor="abilities">
        <IconAlignBoxLeftMiddle className="icon ml-3" />
        شاخص های کلیدی فرد
      </Label>
      <ComboBox id="abilities" name="abilities" placeholder="چند مورد را اضافه کنید" />

      <Label className="mt-6" htmlFor="education">
        <IconSchool className="icon ml-3" />
        مدارک تحصیلی
      </Label>
      <ComboBox id="education" name="education" placeholder="چند مورد را اضافه کنید" />

      <Label className="mt-6" htmlFor="languages">
        <IconWorld className="icon ml-3" />
        زبان های بین المللی
      </Label>
      <ComboBox id="languages" name="languages" placeholder="چند مورد را اضافه کنید" />

      <Label className="mt-6" htmlFor="techs">
        <IconComponents className="icon ml-3" />
        تکنولوژی ها
      </Label>
      <ComboBox id="techs" name="techs" placeholder="چند مورد را اضافه کنید" />

      <Button className="mt-6" variant={"primary"} size={"lg"}>
        ایجاد آگهی
      </Button>
    </form>
  )
}

export default Page
