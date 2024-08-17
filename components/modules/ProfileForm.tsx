"use client"

import { useState } from "react"
import { v4 as uuid } from "uuid"
import {
  IconCalendarEvent,
  IconInfoCircle,
  IconListSearch,
  IconMapPin,
  IconPencilMinus,
  IconPhoto,
  IconUserMinus,
  IconUserPlus,
} from "@tabler/icons-react"

import changeProfile from "@/app/actions/changeProfile"
import Button from "@/components/Button"
import Input from "@/components/modules/forms/Input"
import TextArea from "@/components/modules/forms/TextArea"
import toast from "react-hot-toast"
import Label from "@/components/modules/forms/Label"
import Alert from "@/components/Alert"
import AutoComplete from "@/components/modules/forms/AutoComplete"
import createActionState from "@/utils/formActions"
import ContentT from "@/types/content.types"
import { CompaniesT } from "@/types/prisma.types"

export type ProfileFieldsT = {
  name?: string
  year?: string
  minEmployee?: string
  maxEmployee?: string
  city?: string
  about?: string
  activity?: string
  fileSize?: string
  knowledgeBased?: string
}

type ProfileFormT = {
  content: ContentT
  company: CompaniesT | null
}

const ProfileForm = ({ content, company }: ProfileFormT) => {
  const [formState, setFormState] = useState(createActionState<ProfileFieldsT>({}))

  return (
    <form
      className="w-full"
      action={async (formData: FormData) => {
        const newState = await changeProfile(formData)
        if (newState) {
          setFormState(newState)
          newState.success && toast.success("اطلاعات شما با موفقیت ثبت شد")
        }
      }}
    >
      <div className="twin-input-wrapper">
        <div>
          <Label className="mb-3" htmlFor="name">
            <IconPencilMinus className="icon" />
            نام شرکت
          </Label>
          <Input
            id="name"
            type="text"
            name="name"
            defaultValue={company?.name || ""}
            placeholder="مثل جاب‌ویژن"
            error={formState.fields.name}
          />
        </div>
        <div>
          <Label className="mb-3" htmlFor="year">
            <IconCalendarEvent className="icon" />
            سال تاسیس
          </Label>
          <Input
            id="year"
            type="number"
            name="year"
            defaultValue={company?.year || ""}
            placeholder="سال 1384"
            error={formState.fields.year}
          />
        </div>
      </div>

      <div className="twin-input-wrapper mt-6">
        <div>
          <Label className="mb-3" htmlFor="minEmployee">
            <IconUserMinus className="icon" />
            حداقل تعداد کارکنان
          </Label>
          <Input
            id="minEmployee"
            type="number"
            name="minEmployee"
            defaultValue={company?.employees[0]}
            placeholder="از 10 نفر"
            error={formState.fields.minEmployee?.toString()}
          />
        </div>
        <div>
          <Label className="mb-3" htmlFor="maxEmployee">
            <IconUserPlus className="icon" />
            حداکثر آنها
          </Label>
          <Input
            id="maxEmployee"
            type="number"
            name="maxEmployee"
            defaultValue={company?.employees[1]}
            placeholder="تا 15 نفر"
            error={formState.fields.maxEmployee?.toString()}
          />
        </div>
      </div>

      <Label className="mt-6 mb-3" htmlFor="city">
        <IconMapPin className="icon" />
        شهر شما
      </Label>
      <AutoComplete
        id="city"
        name="city"
        placeholder="یک شهر انتخاب کنید"
        defaultValue={company?.city?.name}
        data={content?.cities.map((city) => city.name) || []}
        error={formState.fields.city}
      />

      <Label className="mt-6 mb-3" htmlFor="about">
        <IconInfoCircle className="icon" />
        درباره شرکت
      </Label>
      <TextArea
        id="about"
        placeholder="مثلا ما برای بهبود نیروی استخدامی شرکت ها کمک می‌کنیم..."
        name="about"
        defaultValue={company?.about || ""}
        error={formState.fields.about}
      />

      <Label className="mt-6 mb-3" htmlFor="activity">
        <IconListSearch className="icon" />
        حوزه فعالیت
      </Label>
      <Input
        id="activity"
        type="text"
        name="activity"
        defaultValue={company?.activity || ""}
        placeholder="مثلا ما سیستم اتصال کارفرمایان به نیروی کار رو توسعه می‌دهیم..."
        error={formState.fields.activity}
      />

      <div className="row mt-6 mb-3">
        <Label htmlFor="file">
          <IconPhoto className="icon" />
          فایل لوگو
        </Label>
        {company?.logo ? (
          <a className="mr-3" href={company?.logo} target="_blank" download>
            <Button variant={"primaryLink"} type="button">
              مشاهده قبلی
            </Button>
          </a>
        ) : null}
      </div>
      <Input
        id="file"
        type="file"
        name="file"
        accept=".png, .jpg, .jpeg"
        error={formState.fields.fileSize}
      />

      <Label className="mt-6 mb-3" htmlFor="knowledgeBased">
        شرکت دانش بنیان
        <input
          id="knowledgeBased"
          type="checkbox"
          name="knowledgeBased"
          defaultChecked={!!company?.knowledgeBased}
        />
      </Label>

      {formState.messages.map((message) => (
        <Alert key={uuid()} className="mt-6" message={message} variant={"warning"} size={"lg"} />
      ))}

      <Button className="mt-6 max-sm:w-full" variant={"primaryFill"} size={"lg"}>
        ثبت اطلاعات
      </Button>
    </form>
  )
}

export default ProfileForm
