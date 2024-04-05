import { IconArrowLeft, IconFile, IconFlame, IconSearch } from "@tabler/icons-react"

import IranAnimation from "@/components/IranAnimation"
import Title from "@/components/Title"
import Button from "@/components/Button"
import SearchForm from "@/components/SearchForm"
import SuggestedJobAds from "@/components/modules/SuggestedJobAds"
import CompaniesCarousel from "@/components/CompaniesCarousel"

const Page = () => {
  return (
    <>
      {/* Hero section */}
      <main className={"container w-full flex flex-col justify-center items-center mt-12"}>
        <div className={"w-full flex justify-between items-center"}>
          <div
            className={
              "w-full flex flex-col justify-center items-center text-center lg:text-right lg:items-start xl:pl-24"
            }
          >
            <Title size={"md"}>
              <h1>
                بین
                <span className={"dana-bold text-primary underline mx-2 sm:mx-3"}>37,540</span>
                آگهی مختلف,
                <br />
                شغل رویایی خودت رو پیدا کن و استخدام شو!
              </h1>
            </Title>
            <ul className="w-full flex items-center mt-3">
              <li className="bg-primary/10 text-primary border border-solid border-primary/25 flex items-center text-sm px-3 py-1 rounded">
                <IconSearch className="icon-sm" />
                <span className="mr-3 mt-0.5">فیلتر سرچ پیشرفته</span>
              </li>
              <li className="bg-sky-50 text-sky-500 border border-solid border-sky-200 flex items-center text-sm px-3 py-1 mr-3 rounded">
                <IconFile className="icon-sm" />
                <span className="mr-3 mt-0.5">ارسال رزومه</span>
              </li>
              <li className="text-2xl mx-3 mt-1">&</li>
              <li className="bg-success/10 text-success border border-solid border-success/25 flex items-center text-sm px-3 py-1 rounded">
                <IconFlame className="icon-sm" />
                <span className="mr-3 mt-0.5">رقابت و استخدام</span>
              </li>
            </ul>
            <p
              className={"text-sm leading-loose mt-3 lg:text-base lg:leading-loose lg:text-justify"}
            >
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان شرایط
              فعلی تکنولوژی مورد نیاز و کاربردهای متنوع کاربردی می باشد.
            </p>
            <div className={"hidden items-center mt-9 lg:flex"}>
              <Button size={"lg"} variant={"primary"}>
                شروع رایگان
                <IconArrowLeft className="icon-lg" />
              </Button>
              <Button className="mr-3" size={"lg"} variant={"link"}>
                ساخت رزومه
              </Button>
            </div>
          </div>
          <div className={"min-w-[450px] hidden justify-center items-center lg:flex"}>
            <IranAnimation />
          </div>
        </div>
      </main>
      {/* Hero section */}
      <div className="container mt-12">
        <SearchForm />
      </div>

      <div className="container mt-12">
        <CompaniesCarousel />
      </div>

      <div className="container mt-12">
        <Title>
          <h2>تازه‌ترین آگهی‌های شغلی</h2>
        </Title>
        <SuggestedJobAds />
        <div className="mt-12">div</div>
      </div>
    </>
  )
}

export default Page
