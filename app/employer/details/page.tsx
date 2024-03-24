"use client"

import { useEffect, useRef, useState } from "react"
import { v4 as uuid } from "uuid"
import { Cities } from "@prisma/client"
import {
  IconBan,
  IconCalendarEvent,
  IconInfoCircle,
  IconListSearch,
  IconMapPin,
  IconPencilMinus,
  IconPhoto,
  IconUserMinus,
  IconUserPlus,
} from "@tabler/icons-react"

import addDetails from "@/app/actions/addDetails"
import Button from "@/components/Button"
import Input from "@/components/Input"
import TextArea from "@/components/TextArea"
import toast from "react-hot-toast"
import SelectBox from "@/components/SelectBox"
import ContentT from "@/types/content.types"
import Label from "@/components/Label"

export type detailsFormStateT = {
  isSuccess?: boolean
  message?: null | string
  fields: {
    name: null | string
    year: null | string
    minEmployee: null | string
    maxEmployee: null | string
    city: null | string
    about: null | string
    activity: null | string
    file: null | string
  }
}

const Page = () => {
  const [cities, setCities] = useState<Cities[]>([])
  const [formState, setFormState] = useState<detailsFormStateT>({ fields: {} } as detailsFormStateT)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data: ContentT) => setCities(data.cities))
  }, [])

  return (
    <form
      className="w-full"
      ref={formRef}
      action={async (formData: FormData) => {
        const newState = await addDetails(formData)
        setFormState(newState || ({ fields: {} } as detailsFormStateT))
        if (newState?.isSuccess) {
          toast.success("اطلاعات شما با موفقیت ثبت شد")
          formRef.current?.reset()
        }
      }}
    >
      <div className="w-full flex items-center">
        <div className="w-1/2">
          <Label htmlFor="logo">
            <IconPencilMinus className="icon ml-3" />
            نام شرکت
          </Label>
          <Input
            error={!!formState.fields.name}
            type="text"
            placeholder="مثل جاب‌ویژن"
            name="name"
          />
        </div>
        <div className="w-1/2 mr-3">
          <Label htmlFor="logo">
            <IconCalendarEvent className="icon ml-3" />
            سال تاسیس
          </Label>
          <Input error={!!formState.fields.year} type="number" placeholder="سال 1384" name="year" />
        </div>
      </div>

      <div className="w-full flex items-center mt-6">
        <div className="w-1/2">
          <Label htmlFor="logo">
            <IconUserMinus className="icon ml-3" />
            حداقل تعداد کارکنان
          </Label>
          <Input
            error={!!formState.fields.minEmployee}
            type="number"
            placeholder="از 10 نفر"
            name="minEmployee"
          />
        </div>
        <div className="w-1/2 mr-3">
          <Label htmlFor="logo">
            <IconUserPlus className="icon ml-3" />
            حداکثر آنها
          </Label>
          <Input
            error={!!formState.fields.maxEmployee}
            type="number"
            placeholder="تا 15 نفر"
            name="maxEmployee"
          />
        </div>
      </div>

      <Label className="mt-6" htmlFor="logo">
        <IconMapPin className="icon ml-3" />
        شهر شما
      </Label>
      <SelectBox error={!!formState.fields.city} name="city">
        <option value="">یک شهر انتخاب کنید</option>
        {cities.map((city) => (
          <option key={city.id} value={JSON.stringify(city)}>
            {city.name}
          </option>
        ))}
      </SelectBox>

      <Label className="mt-6" htmlFor="logo">
        <IconInfoCircle className="icon ml-3" />
        درباره شرکت
      </Label>
      <TextArea
        error={!!formState.fields.about}
        placeholder="مثلا ما برای بهبود نیروی استخدامی شرکت ها کمک می‌کنیم..."
        name="about"
      />

      <Label className="mt-6" htmlFor="logo">
        <IconListSearch className="icon ml-3" />
        حوزه فعالیت
      </Label>
      <TextArea
        error={!!formState.fields.activity}
        placeholder="مثلا ما سیستم اتصال کارفرمایان به نیروی کار رو توسعه می‌دهیم..."
        name="activity"
      />

      <Label className="mt-6" htmlFor="logo">
        <IconPhoto className="icon ml-3" />
        عکس لوگو
      </Label>
      <Input
        error={!!formState.fields.file}
        type="file"
        placeholder="فرمت های png"
        accept=".png, .jpg, .jpeg"
        name="file"
      />

      <Label className="mt-6" htmlFor="knowledgeBased">
        شرکت دانش بنیان
        <input id="knowledgeBased" className="mr-3 mb-0.5" type="checkbox" name="knowledgeBased" />
      </Label>

      <ul className="w-full">
        {Object.entries(formState.fields).map((item) => {
          const message = item[1] as string | null
          if (message)
            return (
              <li key={uuid()} className="text-danger w-full flex items-center mt-6">
                <IconBan className="icon" />
                <span className="mr-3">{message}</span>
              </li>
            )
        })}
      </ul>
      {formState.message ? (
        <span className="text-danger block mt-6">{formState.message}</span>
      ) : null}

      <Button className="mt-6" variant={"primary"} size={"lg"}>
        ثبت اطلاعات
      </Button>
    </form>
  )
}

export default Page
