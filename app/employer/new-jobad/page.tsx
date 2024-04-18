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

import FormStateT from "@/types/formState.types"
import { contentFetcher } from "@/utils/fetcher"
import addNewJobAd from "@/app/actions/addNewJobAd"
import Input from "@/components/form/Input"
import TextArea from "@/components/form/TextArea"
import SelectBox from "@/components/form/SelectBox"
import AutoComplete from "@/components/form/AutoComplete"
import MultiSelect from "@/components/form/MultiSelect"
import ComboBox from "@/components/form/ComboBox"
import Button from "@/components/Button"
import Label from "@/components/form/Label"
import Alert from "@/components/Alert"

const Page = () => {
  const { data: content } = useSWR("/api/content", contentFetcher)
  const [formState, setFormState] = useState<FormStateT>({ fields: {} })
  const [showMaxSalary, setShowMaxSalary] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      className="w-full"
      ref={formRef}
      action={async (formData: FormData) => {
        const newState = await addNewJobAd(formData)
        setFormState(newState || { fields: {} })
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

      <div className="w-full flex mt-6">
        <div className="w-1/2">
          <Label htmlFor="workTimes">
            <IconClockHour3 className="icon ml-3" />
            شرح ساعت کاری
          </Label>
          <Input
            id="workTimes"
            error={formState.fields.workTimes}
            type="text"
            placeholder="5 روز در هفته از ساعت صبح تا ..."
            name="workTimes"
          />
        </div>
        <div className="w-1/2 mr-3">
          <Label htmlFor="businessTrips">
            <IconPlane className="icon ml-3 -rotate-90" />
            شرح سفر های کاری
          </Label>
          <Input
            id="businessTrips"
            error={formState.fields.businessTrips}
            type="text"
            placeholder="3 روز در سال برای تفریح ..."
            name="businessTrips"
          />
        </div>
      </div>

      <Label className="mt-6" htmlFor="minAge">
        <IconUserUp className="icon ml-3" />
        میزان بازه سنی
      </Label>
      <div className="w-full flex">
        <div className="w-1/2">
          <Input
            id="minAge"
            error={formState.fields.minAge}
            type="number"
            placeholder={"برای مثال از 18 سال"}
            name="minAge"
          />
        </div>
        <div className="w-1/2 mr-3">
          <Input
            id="maxAge"
            error={formState.fields.maxAge}
            type="number"
            placeholder="تا 24 سال"
            name="maxAge"
          />
        </div>
      </div>

      <Label className="mt-6" htmlFor="minSalary">
        <IconCash className="icon ml-3" />
        میزان حقوق
      </Label>
      <div className="w-full flex">
        <div className={showMaxSalary ? "w-1/2" : "w-full"}>
          <Input
            id="minSalary"
            error={formState.fields.minSalary}
            type="number"
            placeholder={`برای مثال${showMaxSalary ? " از" : ""} 5 میلیون`}
            name="minSalary"
          />
        </div>
        <div className={`w-1/2 ${showMaxSalary ? "block" : "hidden"} mr-3`}>
          <Input
            id="maxSalary"
            error={formState.fields.maxSalary}
            type="number"
            placeholder="تا 10 میلیون"
            name="maxSalary"
          />
        </div>
      </div>
      <Label className="mt-3" htmlFor="show-maxSalary">
        ایجاد بازه قیمت
        <input
          id="show-maxSalary"
          className="mr-3 mb-0.5"
          name="show-maxSalary"
          type="checkbox"
          onChange={(e) => setShowMaxSalary(e.target.checked)}
        />
      </Label>

      <Label className="mt-6" htmlFor="gender">
        <IconGenderBigender className="icon ml-3" />
        جنسیت
      </Label>
      <SelectBox id="gender" name="gender">
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
        error={formState.fields.tags}
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

      <div className="w-full flex items-center mt-6">
        <Label htmlFor="end_military_service">
          کارت پایان خدمت
          <input
            id="end_military_service"
            className="mr-3 mb-0.5"
            name="end_military_service"
            type="checkbox"
          />
        </Label>
        <Label className="mx-3" htmlFor="is_remote">
          امکان دورکاری
          <input id="is_remote" className="mr-3 mb-0.5" name="is_remote" type="checkbox" />
        </Label>
        <Label htmlFor="is_urgent">
          آگهی فوری
          <input id="is_urgent" className="mr-3 mb-0.5" name="is_urgent" type="checkbox" />
        </Label>
      </div>

      {formState.message ? (
        <Alert className="mt-6" message={formState.message} variant={"warning"} size={"lg"} />
      ) : null}

      <Button className="mt-6" variant={"primary"} size={"lg"}>
        ایجاد آگهی
      </Button>
    </form>
  )
}

export default Page
