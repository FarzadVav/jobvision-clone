import Button from "@/components/Button"
import Title from "@/components/Title"
import Link from "next/link"

const Page = () => {
  return (
    <div className="container">
      <div className="border border-solid border-light w-96 mx-auto rounded-lg overflow-hidden">
        <Title className="mt-3 lg:mt-6" size={"sm"}>
          <h1 className="text-center">ورود / ثبت نام</h1>
        </Title>
        <span className="text-dark block text-sm text-center leading-relaxed px-3 lg:px-9 mt-3">
          سیستم به صورت خودکار ثبت نام یا ورود شما را تشخیص می‌دهد
        </span>
        <form className="w-full px-3 my-6 lg:px-6">
          <input
            className="border border-solid border-primary w-full h-10 px-4 rounded"
            type="email"
            placeholder="ایمیل"
          />
          <input
            className="border border-solid border-primary w-full h-10 px-4 mt-3 rounded"
            type="text"
            placeholder="رمز عبور"
          />

          <Button className="w-full mt-3" variant={"primary"}>
            ادامه
          </Button>
        </form>
        <div className="bg-light/25 border-t border-solid border-light p-3 lg:p-6">
          <p className="text-sm text-center">
            مشکلی پیش آمده است؟
            <Link className="text-primary mr-2" href={"/register"}>
              گزارش
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
