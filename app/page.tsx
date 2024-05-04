import Image from "next/image"
import { v4 as uuid } from "uuid"
import {
  IconArrowLeft,
  IconBriefcase,
  IconBuildingCommunity,
  IconFile,
  IconFileCheck,
  IconFlame,
  IconHandClick,
  IconSearch,
  IconUsersGroup,
} from "@tabler/icons-react"

import IranAnimation from "@/components/modules/IranAnimation"
import Title from "@/components/Title"
import Button from "@/components/Button"
import SearchForm from "@/components/SearchForm"
import SuggestedJobAds from "@/components/modules/SuggestedJobAds"
import CompaniesCarousel from "@/components/CompaniesCarousel"
import HonorBox from "@/components/modules/HonorBox"
import CtaBox from "@/components/modules/CtaBox"
import { ACCORDIONS } from "@/utils/initialData"
import Accordion from "@/components/accordions/Accordion"

const Page = () => {
  return (
    <>
      <div className="my-pages container">
        <div className="w-full flex">
          <div className="w-full flex flex-col justify-center items-center text-center lg:text-right lg:items-start xl:pl-24">
            <Title className="!leading-normal max-sm:text-2xl max-lg:justify-center">
              <h1>
                بین
                <span className="text-primary underline mx-2 sm:mx-3">37,540</span>
                آگهی مختلف,
                <br />
                شغل رویایی خودت رو پیدا کن و استخدام شو!
              </h1>
            </Title>
            <ul className="w-full flex gap-3 mt-5 max-sm:hidden max-lg:justify-center">
              <li className="hero-section_box bg-primary/10 text-primary border-primary/25">
                <IconSearch className="icon-sm" />
                <span>فیلتر سرچ پیشرفته</span>
              </li>
              <li className="hero-section_box bg-sky-50 text-sky-500 border-sky-200">
                <IconFile className="icon-sm" />
                <span>ارسال رزومه</span>
              </li>
              <li className="text-2xl pt-0.5">&</li>
              <li className="hero-section_box bg-success/10 text-success border-success/25">
                <IconFlame className="icon-sm" />
                <span>رقابت و استخدام</span>
              </li>
            </ul>
            <p className="mt-4 lg:text-justify">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان شرایط
              فعلی تکنولوژی مورد نیاز و کاربردهای متنوع کاربردی می باشد.
            </p>
            <div className="hidden items-center mt-9 lg:flex">
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
        <SearchForm className="mt-section" />

        <CompaniesCarousel className="mt-12" />

        <Title className="mt-section">
          <h2>تازه‌ترین آگهی‌های شغلی</h2>
        </Title>
        <SuggestedJobAds />

        <div className="mt-section bg-light/50 flex items-center py-9 rounded-md md:justify-evenly max-md:flex-col-reverse max-lg:px-5">
          <div className="max-md:mt-6 lg:w-1/2">
            <Title className="max-md:justify-center" size={"sm"}>
              <h3>استخدام‌های سراسری و دولتی</h3>
            </Title>
            <p className="text-center mt-3 md:text-right">
              در این قسمت، آخرین فرصت‌های استخدام سراسری و دولتی به‌طور مرتب به‌روزرسانی و منتشر
              می‌شوند، به سراسری سر بزنید و از بررسی روزانه ده‌ها سایت و مرجع خبری دیگر بی‌نیاز
              شوید.
            </p>
            <Button className="mt-4 max-md:mx-auto" variant={"dark"}>
              مشاهده فرصت‌های شغلی
            </Button>
          </div>
          <Image
            src="/images/employment.svg"
            alt="استخدام‌های سراسری و دولتی"
            height={225}
            width={225}
          />
        </div>

        <Title className={"my-section justify-center max-sm:my-9"} size={"lg"}>
          <h4>
            <span className="text-primary ml-1">جاب‌ویژن</span> دستیار استخدامی شما
          </h4>
        </Title>
        <div className="flex flex-wrap items-center gap-y-6">
          <HonorBox icon={<IconUsersGroup />} count={2_000_000} text={"کارجوهای همراه ما"} />
          <HonorBox icon={<IconBuildingCommunity />} count={59_900} text={"سازمان همراه شما"} />
          <HonorBox icon={<IconBriefcase />} count={38_000} text={"موقعیت‌ شغلی فعال"} />
          <HonorBox icon={<IconFileCheck />} count={132_000} text={"استخدامی موفق"} />
        </div>

        <div className="mt-section flex gap-3 max-lg:flex-col">
          <CtaBox
            src="/images/cv.svg"
            title="رزومه ساز جاب ویژن"
            text="لورم ایپسوم متنی برای همه و ساخت رزومه ای استاندارد به دو زبان فارسی و انگلیسی بسازید."
            btn="ساخت رزومه"
          />
          <CtaBox
            src="/images/salary.svg"
            title="ماشین حساب حقوق و دستمزد"
            text="از حقوق دریافتی افراد در مشاغل مختلف آگاه شوید و تخمین دقیق تری از حقوق منصفانه خود داشته باشید."
            btn="حقوق خود را محاسبه کنید"
          />
        </div>

        <Title className={"mt-section justify-center"} size={"lg"}>
          <h6>
            چرا باید <span className="text-primary mx-1.5">جاب‌ویژن</span> را انتخاب کنید
          </h6>
        </Title>
        <ul className="mt-section w-full flex flex-col justify-center items-center pr-1 relative sm:pr-16">
          <div className="bg-light w-[1px] absolute hidden top-0 bottom-0 translate-x-[1px] right-6 sm:block"></div>
          {ACCORDIONS.map((accordion, i) => (
            <Accordion key={uuid()} length={i + 1} {...accordion} />
          ))}
        </ul>
      </div>

      <div className="bg-gradient-to-t from-light to-white w-full hidden flex-col items-center py-9 sm:flex">
        <Title className="justify-center" size={"lg"}>
          <h6>زندگی شغلی رویایی خود را بسازید</h6>
        </Title>
        <p className="text-lg text-center my-6">
          از آخرین فرصت‌های شغلی معتبرترین شرکت‌های ایران باخبر شده و در آنها استخدام شوید.
        </p>
        <Button variant={"primary"} size={"lg"}>
          ثبت نام کنید
          <IconHandClick className="icon-lg" />
        </Button>
      </div>
    </>
  )
}

export default Page
