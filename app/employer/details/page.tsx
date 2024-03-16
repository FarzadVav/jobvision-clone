import Button from "@/components/Button"
import Icon from "@/components/Icon"
import Input from "@/components/Input"
import TextArea from "@/components/TextArea"

const Page = () => {
  return (
    <form className="w-full">
      <div className="w-full flex items-center">
        <div className="w-1/2">
          <label className="dana-bold flex" htmlFor="logo">
            <Icon name="pen-line" className="ml-3" />
            نام شرکت
          </label>
          <Input className="mt-3" type="text" placeholder="مثل جاب‌ویژن" />
        </div>
        <div className="w-1/2 mr-3">
          <label className="dana-bold flex" htmlFor="logo">
            <Icon name="calendar" className="ml-3" />
            سال تاسیس
          </label>
          <Input className="mt-3" type="number" placeholder="100 نفر" />
        </div>
      </div>

      <div className="w-full flex items-center mt-6">
        <div className="w-1/2">
          <label className="dana-bold flex" htmlFor="logo">
            <Icon name="user-minus" className="ml-3" />
            حداقل تعداد کارکنان
          </label>
          <Input className="mt-3" type="number" placeholder="از 10 نفر" />
        </div>
        <div className="w-1/2 mr-3">
          <label className="dana-bold flex" htmlFor="logo">
            <Icon name="user-plus" className="ml-3" />
            حداکثر آنها
          </label>
          <Input className="mt-3" type="number" placeholder="تا 15 نفر" />
        </div>
      </div>

      <label className="dana-bold flex mt-6" htmlFor="logo">
        <Icon name="info" className="ml-3" />
        درباره شرکت
      </label>
      <TextArea
        className="mt-3"
        placeholder="مثلا ما برای بهبود نیروی استخدامی شرکت ها کمک می‌کنیم..."
      />

      <label className="dana-bold flex mt-6" htmlFor="logo">
        <Icon name="text-search" className="ml-3" />
        حوزه فعالیت
      </label>
      <TextArea
        className="mt-3"
        placeholder="مثلا ما سیستم اتصال کارفرمایان به نیروی کار رو توسعه می‌دهیم..."
      />

      <label className="dana-bold flex mt-6" htmlFor="logo">
        <Icon name="image" className="ml-3" />
        عکس لوگو
      </label>
      <Input className="mt-3" type="file" placeholder="فرمت های png" accept=".png, .jpg, .jpeg" />

      <label className="dana-bold flex items-center mt-6 cursor-pointer" htmlFor="based">
        شرکت دانش بنیان
        <input id="based" className="mr-3" type="checkbox" />
      </label>

      <Button className="mt-6" variant={"primary"} size={"lg"}>
        ثبت اطلاعات
      </Button>
    </form>
  )
}

export default Page
