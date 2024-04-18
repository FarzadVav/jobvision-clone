"use client"

import { useState } from "react"
import useSWR from "swr"
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

import FormStateT from "@/types/formState.types"
import { contentFetcher, getMeFetcher } from "@/utils/fetcher"
import changeProfile from "@/app/actions/changeProfile"
import Button from "@/components/Button"
import Input from "@/components/form/Input"
import TextArea from "@/components/form/TextArea"
import toast from "react-hot-toast"
import SelectBox from "@/components/form/SelectBox"
import Label from "@/components/form/Label"
import Alert from "@/components/Alert"

const Page = () => {
  const { data: content } = useSWR("/api/content", contentFetcher)
  const { data: company } = useSWR("/api/getMe", getMeFetcher)
  const [formState, setFormState] = useState<FormStateT>({ fields: {} })

  return (
    <form
      className="w-full"
      action={async (formData: FormData) => {
        const newState = await changeProfile(formData)
        setFormState(newState || { fields: {} })
        if (newState?.isSuccess) {
          toast.success("اطلاعات شما با موفقیت ثبت شد")
        }
      }}
    >
      <div className="w-full flex">
        <div className="w-1/2">
          <Label htmlFor="name">
            <IconPencilMinus className="icon ml-3" />
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
        <div className="w-1/2 mr-3">
          <Label htmlFor="year">
            <IconCalendarEvent className="icon ml-3" />
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

      <div className="w-full flex mt-6">
        <div className="w-1/2">
          <Label htmlFor="minEmployee">
            <IconUserMinus className="icon ml-3" />
            حداقل تعداد کارکنان
          </Label>
          <Input
            id="minEmployee"
            type="number"
            name="minEmployee"
            defaultValue={company?.employees[0] || ""}
            placeholder="از 10 نفر"
            error={formState.fields.minEmployee?.toString()}
          />
        </div>
        <div className="w-1/2 mr-3">
          <Label htmlFor="maxEmployee">
            <IconUserPlus className="icon ml-3" />
            حداکثر آنها
          </Label>
          <Input
            id="maxEmployee"
            type="number"
            name="maxEmployee"
            defaultValue={company?.employees[1] || ""}
            placeholder="تا 15 نفر"
            error={formState.fields.maxEmployee?.toString()}
          />
        </div>
      </div>

      <Label className="mt-6" htmlFor="city">
        <IconMapPin className="icon ml-3" />
        شهر شما
      </Label>
      <SelectBox id="city" name="city" error={formState.fields.city}>
        <option value={company?.city_id || ""}>
          {company?.city?.name || "یک شهر انتخاب کنید"}
        </option>
        {content?.cities
          .filter((city) => city.id !== company?.city_id)
          .map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
      </SelectBox>

      <Label className="mt-6" htmlFor="about">
        <IconInfoCircle className="icon ml-3" />
        درباره شرکت
      </Label>
      <TextArea
        id="about"
        placeholder="مثلا ما برای بهبود نیروی استخدامی شرکت ها کمک می‌کنیم..."
        name="about"
        defaultValue={company?.about || ""}
        error={formState.fields.about}
      />

      <Label className="mt-6" htmlFor="activity">
        <IconListSearch className="icon ml-3" />
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

      <Label className="mt-6" htmlFor="file">
        <IconPhoto className="icon ml-3" />
        عکس {company?.logo ? "لوگوی جدید" : "لوگو"}
      </Label>
      <Input
        id="file"
        type="file"
        name="file"
        accept=".png, .jpg, .jpeg"
        error={formState.fields.fileSize}
      />

      <Label className="mt-6" htmlFor="knowledgeBased">
        شرکت دانش بنیان
        <input
          id="knowledgeBased"
          className="mr-3 mb-0.5"
          type="checkbox"
          name="knowledgeBased"
          defaultChecked={!!company?.knowledgeBased}
        />
      </Label>

      {formState.message ? (
        <Alert className="mt-6" message={formState.message} variant={"warning"} size={"lg"} />
      ) : null}

      <Button className="mt-6" variant={"primary"} size={"lg"}>
        ثبت اطلاعات
      </Button>
    </form>
  )
}

export default Page
