import Link from "next/link"

import IranAnimation from "@/components/IranAnimation"

const Page = () => {
  return (
    <>
      {/* Hero section */}
      <main className={"container w-full flex flex-col justify-center items-center"}>
        <div className={"w-full flex justify-between items-center"}>
          <div
            className={
              "w-full flex flex-col justify-center items-center text-center md:w-1/2 md:text-right md:items-start"
            }
          >
            <h1 className={"md:mt-16"}>
              در
              <span className={"text-primary"}>484</span>
              شهر
              <span className={"text-primary"}>37,540</span>
              آگهی شغلی <br className={"sm:hidden"} /> ثبت شده
            </h1>
            <p className={"text-sm leading-loose mt-3.5 md:text-base md:leading-relaxed"}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
              گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
              شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
            </p>
            <div className={"hidden items-center mt-5 lg:flex"}>
              <Link className={"text-primary"} href={"/"}>
                ثبت شرکت
              </Link>
              <Link
                className={"text-primary border-r border-solid border-slate-200 pr-3 mr-4"}
                href={"/"}
              >
                ساخت رزومه
              </Link>
            </div>
          </div>
          <div className={"w-[400px] hidden justify-center items-center md:flex"}>
            <IranAnimation />
          </div>
        </div>
      </main>
      {/* Hero section */}
    </>
  )
}

export default Page
