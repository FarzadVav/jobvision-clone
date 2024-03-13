import Link from "next/link"

import IranAnimation from "@/components/IranAnimation"
import Title from "@/components/Title"
import Button from "@/components/Button"

const Page = () => {
  return (
    <>
      {/* Hero section */}
      <main className={"container w-full flex flex-col justify-center items-center"}>
        <div className={"w-full flex justify-between items-center"}>
          <div
            className={
              "w-full flex flex-col justify-center items-center text-center lg:w-2/3 lg:text-right lg:items-start xl:pl-24"
            }
          >
            <Title size={"md"}>
              <h1>
                در
                <span className={"text-primary mx-2 sm:mx-3"}>484</span>
                شهر
                <span className={"text-primary mx-2 sm:mx-3"}>37,540</span>
                آگهی شغلی <br className="sm:hidden" /> ثبت شده
              </h1>
            </Title>
            <p className={"text-sm leading-loose mt-3 lg:text-base lg:leading-loose"}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
              گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
              شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
            </p>
            <div className={"hidden items-center mt-3 lg:flex"}>
              <Link href={"/"}>
                <Button className="text-primary" variant={"link"}>
                  ثبت شرکت
                </Button>
              </Link>
              <Link className={"border-r border-solid border-light pr-3 mr-3"} href={"/"}>
                <Button className="text-primary" variant={"link"}>
                  ساخت رزومه
                </Button>
              </Link>
            </div>
          </div>
          <div className={"w-1/3 hidden justify-center items-center lg:flex"}>
            <IranAnimation />
          </div>
        </div>
      </main>
      {/* Hero section */}
    </>
  )
}

export default Page
