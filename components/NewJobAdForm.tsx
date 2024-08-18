"use client"

import { useRef, useState } from "react"
import { v4 as uuid } from "uuid"
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

import createActionState from "@/utils/formActions"
import addNewJobAd from "@/app/actions/addNewJobAd"
import Input from "@/components/modules/forms/Input"
import TextArea from "@/components/modules/forms/TextArea"
import SelectBox from "@/components/modules/forms/SelectBox"
import MultiSelect from "@/components/modules/forms/MultiSelect"
import ComboBox from "@/components/modules/forms/ComboBox"
import Button from "@/components/Button"
import Label from "@/components/modules/forms/Label"
import Alert from "@/components/Alert"
import ContentT from "@/types/content.types"

export type NewJobAdFieldsT = {
  title?: string
  description?: string
  workTimes?: string
  businessTrips?: string
  minAge?: string
  maxAge?: string
  minSalary?: string
  maxSalary?: string
  category?: string
  cooperationType?: string
  tags?: string
}

type NewJobAdFormT = {
  content: ContentT
}

const NewJobAdForm = ({ content }: NewJobAdFormT) => {
  const [formState, setFormState] = useState(createActionState<NewJobAdFieldsT>({}))
  // Manual fields {
  const [tags, setTags] = useState<string[]>([])
  const [benefits, setBenefits] = useState<string[]>([])
  const [abilities, setAbilities] = useState<string[]>([])
  const [education, setEducation] = useState<string[]>([])
  const [languages, setLanguages] = useState<string[]>([])
  const [techs, setTechs] = useState<string[]>([])
  // Manual fields }
  const [showMaxSalary, setShowMaxSalary] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      className="w-full"
      ref={formRef}
      action={async (formData: FormData) => {
        formData.append("tags", JSON.stringify(tags))
        formData.append("benefits", JSON.stringify(benefits))
        formData.append("abilities", JSON.stringify(abilities))
        formData.append("education", JSON.stringify(education))
        formData.append("languages", JSON.stringify(languages))
        formData.append("techs", JSON.stringify(techs))
        const newState = await addNewJobAd(formData)
        if (newState) {
          setFormState(newState)
          if (newState.success) {
            setBenefits([])
            setAbilities([])
            setEducation([])
            setLanguages([])
            setTechs([])
            setShowMaxSalary(false)
            formRef.current?.reset()
            toast.success("آگهی جدید با موفقیت ثبت شد")
          }
        }
      }}
    >
      <Label className="mb-3" htmlFor="title">
        <IconPencilMinus className="icon" />
        عنوان آگهی
      </Label>
      <Input
        id="title"
        error={formState.fields.title}
        type="text"
        placeholder="مثل استخدام مهندس نرم افزار"
        name="title"
      />

      <Label className="mt-6 mb-3" htmlFor="description">
        <IconAlignRight className="icon" />
        توضیحات لازم
      </Label>
      <TextArea
        id="description"
        error={formState.fields.description}
        placeholder="توضیحات این موقعیت شغلی ..."
        name="description"
      />

      <div className="twin-input-wrapper mt-6">
        <div>
          <Label className="mb-3" htmlFor="workTimes">
            <IconClockHour3 className="icon" />
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
        <div>
          <Label className="mb-3" htmlFor="businessTrips">
            <IconPlane className="icon -rotate-90" />
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

      <Label className="mt-6 mb-3" htmlFor="minAge">
        <IconUserUp className="icon" />
        میزان بازه سنی
      </Label>
      <div className="twin-input-wrapper">
        <div>
          <Input
            id="minAge"
            error={formState.fields.minAge}
            type="number"
            placeholder={"برای مثال از 18 سال"}
            name="minAge"
          />
        </div>
        <div className="max-sm:!mt-3">
          <Input
            id="maxAge"
            error={formState.fields.maxAge}
            type="number"
            placeholder="تا 24 سال"
            name="maxAge"
          />
        </div>
      </div>

      <Label className="mt-6 mb-3" htmlFor="minSalary">
        <IconCash className="icon" />
        میزان حقوق
      </Label>
      <div className="twin-input-wrapper">
        <div className={showMaxSalary ? "" : "!w-full"}>
          <Input
            id="minSalary"
            error={formState.fields.minSalary}
            type="number"
            placeholder={`برای مثال${showMaxSalary ? " از" : ""} 5 میلیون`}
            name="minSalary"
          />
        </div>
        <div className={showMaxSalary ? "max-sm:!mt-3" : "hidden"}>
          <Input
            id="maxSalary"
            error={formState.fields.maxSalary}
            type="number"
            placeholder="تا 10 میلیون"
            name="maxSalary"
          />
        </div>
      </div>
      <label className="inline-block mt-3 cursor-pointer" htmlFor="show-maxSalary">
        ایجاد بازه قیمت
        <input
          id="show-maxSalary"
          className="mr-3 mb-0.5"
          name="show-maxSalary"
          type="checkbox"
          checked={showMaxSalary}
          onChange={(e) => setShowMaxSalary(e.target.checked)}
        />
      </label>

      <Label className="mt-6 mb-3" htmlFor="gender">
        <IconGenderBigender className="icon" />
        جنسیت
      </Label>
      <SelectBox id="gender" name="gender">
        <option value="">فرقی ندارد</option>
        <option value="male">مرد</option>
        <option value="female">زن</option>
      </SelectBox>

      <Label className="mt-6 mb-3" htmlFor="category">
        <IconBriefcase className="icon" />
        دسته بندی شغلی
      </Label>
      <SelectBox id="category" name="category" error={formState.fields.category}>
        <option value="">انتخاب نشده</option>
        {content?.categories.map((category) => (
          <option key={uuid()} value={category.id}>
            {category.name}
          </option>
        ))}
      </SelectBox>

      <Label className="mt-6 mb-3" htmlFor="cooperationType">
        <IconFileDescription className="icon" />
        نوع قرارداد
      </Label>
      <SelectBox
        id="cooperationType"
        name="cooperationType"
        error={formState.fields.cooperationType}
      >
        <option value="">انتخاب نشده</option>
        {content?.cooperationTypes.map((type) => (
          <option key={uuid()} value={type.id}>
            {type.name}
          </option>
        ))}
      </SelectBox>

      <Label className="mt-6 mb-3" htmlFor="tags">
        <IconTags className="icon" />
        تگ های شغلی
      </Label>
      <MultiSelect
        id="tags"
        placeholder="چند مورد را سرچ و انتخاب کنید"
        data={content?.tags.map((tag) => tag.name) || []}
        selectedData={tags}
        setSelectedData={setTags}
        error={formState.fields.tags}
      />

      <Label className="mt-6 mb-3" htmlFor="benefits">
        <IconSparkles className="icon" />
        مزیت های این شغل
      </Label>
      <ComboBox
        id="benefits"
        placeholder="چند مورد را اضافه کنید"
        dataList={benefits}
        setDataList={setBenefits}
      />

      <Label className="mt-6 mb-3" htmlFor="abilities">
        <IconAlignBoxLeftMiddle className="icon" />
        شاخص های کلیدی فرد
      </Label>
      <ComboBox
        id="abilities"
        placeholder="چند مورد را اضافه کنید"
        dataList={abilities}
        setDataList={setAbilities}
      />

      <Label className="mt-6 mb-3" htmlFor="education">
        <IconSchool className="icon" />
        مدارک تحصیلی
      </Label>
      <ComboBox
        id="education"
        placeholder="چند مورد را اضافه کنید"
        dataList={education}
        setDataList={setEducation}
      />

      <Label className="mt-6 mb-3" htmlFor="languages">
        <IconWorld className="icon" />
        زبان های بین المللی
      </Label>
      <ComboBox
        id="languages"
        placeholder="چند مورد را اضافه کنید"
        dataList={languages}
        setDataList={setLanguages}
      />

      <Label className="mt-6 mb-3" htmlFor="techs">
        <IconComponents className="icon" />
        تکنولوژی ها
      </Label>
      <ComboBox
        id="techs"
        placeholder="چند مورد را اضافه کنید"
        dataList={techs}
        setDataList={setTechs}
      />

      <div className="w-full flex flex-wrap items-center gap-x-6 gap-y-3 mt-6">
        <Label htmlFor="end_military_service">
          کارت پایان خدمت
          <input id="end_military_service" name="end_military_service" type="checkbox" />
        </Label>
        <Label htmlFor="is_remote">
          امکان دورکاری
          <input id="is_remote" name="is_remote" type="checkbox" />
        </Label>
        <Label htmlFor="is_urgent">
          آگهی فوری
          <input id="is_urgent" name="is_urgent" type="checkbox" />
        </Label>
      </div>

      {formState.messages.map((message) => (
        <Alert key={uuid()} className="mt-6" message={message} variant={"warning"} size={"lg"} />
      ))}

      <Button className="mt-6 max-sm:w-full" variant={"primaryFill"} size={"lg"}>
        ایجاد آگهی
      </Button>
    </form>
  )
}

export default NewJobAdForm
