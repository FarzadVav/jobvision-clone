"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import useSWR from "swr"
import { v4 as uuid } from "uuid"
import {
  IconHeart,
  IconHelp,
  IconInfoCircle,
  IconShare,
  IconStarFilled,
  IconUser,
} from "@tabler/icons-react"

import { jobAdsFetcher, selectedJobAdFetcher } from "@/utils/fetcher"
import Button from "../Button"
import Tabs from "./Tabs"
import Title from "../Title"
import JobAdBox from "../JobAdBox"
import Alert from "../Alert"
import { releaseDateCalculation, salaryCalculationForView } from "@/utils/jobAd"
import Skeleton from "../Skeleton"

const SelectedJobAd = () => {
  const searchParams = useSearchParams()
  const { data: selectedJobAd, isLoading } = useSWR(
    searchParams.has("id") ? `/api/jobads/${searchParams.get("id")}` : null,
    selectedJobAdFetcher
  )
  const { data: jobAds, isLoading: jobAdsLoading } = useSWR(
    searchParams.has("id") ? "/api/jobads" : null,
    jobAdsFetcher
  )

  if (isLoading)
    return (
      <div className="w-full h-full space-y-3 p-3 overflow-y-auto">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-52" />
      </div>
    )

  return (
    <div className="bg-white w-full h-full flex flex-col px-3 py-4 rounded overflow-y-auto">
      {selectedJobAd ? (
        <>
          <div className="w-full">
            {/* mobile size styles */}
            <div className="w-full lg:hidden">
              <div className="border-b border-solid border-light w-full flex pb-6 mb-6">
                <Image
                  className="jobAd_company-logo"
                  src={selectedJobAd.company.logo || ""}
                  height={80}
                  width={80}
                  alt={`لوگوی شرکت ${selectedJobAd.company.name}`}
                />
                <div className="mr-3">
                  <Title font={"danaBold"}>
                    <h1>{selectedJobAd.title}</h1>
                  </Title>
                  <Link
                    className="text-primary underline decoration-transparent transition-all hover:decoration-primary"
                    href={""}
                  >
                    {selectedJobAd.company.name || "شرکت ناشناس"}
                  </Link>
                </div>
              </div>
              <div className="border-b border-solid border-light selected-jobad_details pb-6 mb-6">
                <div className="item">
                  <span className="key">حقوق</span>
                  <span className="value">
                    {salaryCalculationForView(selectedJobAd.minSalary, selectedJobAd.maxSalary)}
                  </span>
                </div>
                <div className="item">
                  <span className="key">محل کار</span>
                  <span className="value">
                    {selectedJobAd.company.city?.province.name}، {selectedJobAd.company.city?.name}
                  </span>
                </div>
                <div className="item">
                  <span className="key">روز و ساعت کاری</span>
                  <span className="value">{selectedJobAd.work_times}</span>
                </div>
                <div className="item">
                  <span className="key">نوع همکاری</span>
                  <span className="value">{selectedJobAd.cooperation_type.name}</span>
                </div>
                <div className="item">
                  <span className="key">مزایا و تهسیلات</span>
                  <span className="value">
                    {(selectedJobAd.benefits as []).length
                      ? (selectedJobAd.benefits as []).map((benefit, i) => {
                          if (i < (selectedJobAd?.benefits as []).length - 1) {
                            return (
                              <p key={uuid()} className="benefit">
                                {benefit}
                                <span>/</span>
                              </p>
                            )
                          } else {
                            return (
                              <p key={uuid()} className="text">
                                {benefit}
                              </p>
                            )
                          }
                        })
                      : "ندارد"}
                  </span>
                </div>
                <div className="item">
                  <span className="key">سفر های کاری</span>
                  <span className="value">{selectedJobAd.business_trips || "ندارد"}</span>
                </div>
              </div>
            </div>
            {/* mobile size styles */}

            {/* more than 1024px style */}
            <div className="w-full max-lg:hidden">
              <div className="w-full flex justify-between">
                <Title font={"danaBold"}>
                  <h2>
                    {selectedJobAd.title.slice(0, 100)}
                    {selectedJobAd.title.length > 100 ? "..." : null}
                  </h2>
                </Title>
                <Button className={"mr-3"} variant={"successFill"}>
                  ارسال رزومه
                </Button>
              </div>
              <div className="flex items-center mt-4">
                <Link
                  className="text-primary underline decoration-transparent transition hover:decoration-primary"
                  href={""}
                >
                  {selectedJobAd.company.name || "شرکت ناشناس"}
                </Link>
                {selectedJobAd.company.city ? (
                  <span className="bordered-text">
                    {selectedJobAd.company.city?.province.name}، {selectedJobAd.company.city?.name}
                  </span>
                ) : null}
                {selectedJobAd.is_remote ? (
                  <span className="bordered-text">امکان دورکاری</span>
                ) : null}
                {selectedJobAd.company.knowledgeBased ? (
                  <span className="bordered-text">دانش بنیان</span>
                ) : null}
              </div>
              <div className="w-full flex items-center mt-4">
                <span className="text-success">
                  {salaryCalculationForView(selectedJobAd.minSalary, selectedJobAd.maxSalary)}
                </span>
                <Button className="mr-auto" size={"sm"}>
                  <IconShare className="icon" />
                </Button>
                <Button className="ml-3" size={"sm"}>
                  <IconHeart className="icon" />
                </Button>
                {releaseDateCalculation(new Date(selectedJobAd.created_at || ""))}
              </div>
              <div className="bg-light/50 w-full flex flex-wrap items-center gap-y-1.5 gap-x-6 py-2 px-5 mt-6 mb-3 rounded-md">
                <div className="min-w-max flex items-center" title="تعداد کارکنان شرکت">
                  <IconUser className="icon" />
                  <p className="mr-3">
                    {selectedJobAd.company.minEmployees} تا {selectedJobAd.company.maxEmployees} نفر
                  </p>
                </div>
                {selectedJobAd.company.activity ? (
                  <div className="min-w-max flex items-center" title="حوزه فعالیت">
                    <IconHelp className="icon" />
                    <p className="mr-3">{selectedJobAd.company.activity}</p>
                  </div>
                ) : null}
              </div>
            </div>
            {/* more than 1024px style */}
          </div>

          <Tabs
            tabs={[
              {
                name: "درباره شغل",
                content: (
                  <>
                    <div className="w-full max-lg:hidden">
                      <Title size={"sm"}>
                        <span>مشخصات موقعیت شغلی</span>
                      </Title>
                      <div className="selected-jobad_details mt-2">
                        <div className="item">
                          <span className="key">روز و ساعت کاری</span>
                          <p className="value">{selectedJobAd.work_times}</p>
                        </div>
                        <div className="item">
                          <span className="key">نوع همکاری</span>
                          <p className="value">{selectedJobAd.cooperation_type.name}</p>
                        </div>
                        <div className="item">
                          <span className="key">سفر های کاری</span>
                          <p className="value">{selectedJobAd.business_trips}</p>
                        </div>
                        <div className="item">
                          <span className="key">مزایا و تسهیلات</span>
                          <div className="value">
                            {(selectedJobAd.benefits as []).length
                              ? (selectedJobAd.benefits as []).map((benefit, i) => {
                                  if (i < (selectedJobAd.benefits as []).length - 1) {
                                    return (
                                      <p key={uuid()} className="benefit">
                                        {benefit}
                                        <span>/</span>
                                      </p>
                                    )
                                  } else {
                                    return (
                                      <p key={uuid()} className="text">
                                        {benefit}
                                      </p>
                                    )
                                  }
                                })
                              : "ندارد"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Title className="lg:mt-6" size={"sm"}>
                      <span>شاخص های کلیدی از نظر کارفرما</span>
                    </Title>
                    <ul className="w-full flex flex-wrap gap-2 mt-3">
                      {(selectedJobAd.abilities as []).length
                        ? (selectedJobAd.abilities as []).map((ability) => (
                            <li
                              key={uuid()}
                              className="border border-solid border-dark min-w-max text-center px-2 rounded"
                            >
                              {ability}
                            </li>
                          ))
                        : "مهم نیست"}
                    </ul>

                    <Title className="mt-6" size={"sm"}>
                      <span>شرح شغل و وظایف</span>
                    </Title>
                    <p className="w-full text-justify mt-1.5">{selectedJobAd?.description}</p>

                    <Title className="mt-6" size={"sm"}>
                      <span>شرایط احراز شغل</span>
                    </Title>
                    <ul className="w-full mt-3">
                      <li className="selected-jobAd_ability">
                        <div className="key">سن</div>
                        <div className="value">
                          <span>
                            {selectedJobAd.minAge} تا {selectedJobAd.minAge}
                          </span>
                        </div>
                      </li>
                      <li className="selected-jobAd_ability mt-2">
                        <div className="key">جنسیت</div>
                        <div className="value">
                          <span>
                            {typeof selectedJobAd.gender === typeof null
                              ? "فرقی ندارد"
                              : selectedJobAd.gender
                              ? "مرد"
                              : "زن"}
                          </span>
                        </div>
                      </li>
                      <li className="selected-jobAd_ability mt-2">
                        <div className="key">سربازی</div>
                        <div className="value">
                          <span>
                            {selectedJobAd.end_military_service
                              ? "پایان خدمت یا معاف از سربازی"
                              : "مهم نیست"}
                          </span>
                        </div>
                      </li>
                      <li className="selected-jobAd_ability mt-2">
                        <div className="key">تحصیلات</div>
                        <div className="value">
                          {(selectedJobAd.education as []).length
                            ? (selectedJobAd.education as []).map((education) => (
                                <span key={uuid()} className="list-items">
                                  {education}
                                </span>
                              ))
                            : "فرقی ندارد"}
                        </div>
                      </li>
                      <li className="selected-jobAd_ability mt-2">
                        <div className="key">زبان ها</div>
                        <div className="value">
                          {(selectedJobAd.languages as []).length
                            ? (selectedJobAd.languages as []).map((language) => (
                                <span key={uuid()} className="list-items">
                                  {language}
                                </span>
                              ))
                            : "فرقی ندارد"}
                        </div>
                      </li>
                      <li className="selected-jobAd_ability mt-2">
                        <div className="key">تکنولوژی ها</div>
                        <div className="value">
                          {(selectedJobAd.techs as []).length
                            ? (selectedJobAd.techs as []).map((tech) => (
                                <span key={uuid()} className="list-items">
                                  {tech}
                                </span>
                              ))
                            : "فرقی ندارد"}
                        </div>
                      </li>
                    </ul>

                    <div className="border-t border-b border-solid border-light w-full flex items-center py-1.5 mt-6">
                      <Button>
                        <IconInfoCircle className="icon text-dark/50 ml-1" />
                        ثبت مشکل و تخلف آگهی
                      </Button>
                    </div>

                    <Title className="mt-3 mb-3" size={"sm"}>
                      <span>فرصت‌های شغلی مشابه</span>
                    </Title>

                    <div className="w-full mt-3">
                      {jobAdsLoading ? (
                        <>
                          <div className="w-full flex flex-wrap gap-3 mt-3">
                            <Skeleton className="w-full h-52 xl:jobAd_size-1" />
                            <Skeleton className="w-full h-52 xl:jobAd_size-1" />
                            <Skeleton className="w-full h-52 xl:jobAd_size-1" />
                            <Skeleton className="w-full h-52 xl:jobAd_size-1" />
                          </div>
                        </>
                      ) : null}

                      {jobAds?.length ? (
                        jobAds.filter(
                          (jobAd) =>
                            jobAd.category.name === selectedJobAd.category.name &&
                            jobAd.id !== selectedJobAd.id
                        ).length ? (
                          <div className="w-full flex flex-wrap gap-3">
                            {jobAds.map((jobAd2, i) => {
                              if (
                                i < 4 &&
                                jobAd2.category.name === selectedJobAd.category.name &&
                                jobAd2.id !== selectedJobAd.id
                              ) {
                                return (
                                  <JobAdBox
                                    className="xl:jobAd_size-1"
                                    key={uuid()}
                                    jobAd={jobAd2}
                                  />
                                )
                              }
                            })}
                          </div>
                        ) : (
                          <Alert message="آگهی وجود ندارد" variant={"warning"} />
                        )
                      ) : null}
                    </div>
                  </>
                ),
              },
              {
                name: "درباره شرکت",
                content: (
                  <>
                    <Title size={"sm"}>
                      <span>درباره شرکت {selectedJobAd.company.name || "ناشناس"}</span>
                    </Title>
                    <p className="w-full text-justify mt-1.5">
                      {selectedJobAd.company.about || "توضیحی وارد نشده"}
                    </p>

                    <Title className="mt-6" size={"sm"}>
                      <span>در یک نگاه کلی</span>
                    </Title>
                    <div className="selected-jobad_details mt-2">
                      <div className="item">
                        <span className="key">سال تاسیس</span>
                        <p className="value">{selectedJobAd.company.year || "تازه کار"}</p>
                      </div>
                      <div className="item">
                        <span className="key">اندازه سازمان</span>
                        <p className="value">
                          {selectedJobAd.company.minEmployees} تا{" "}
                          {selectedJobAd.company.maxEmployees} نفر
                        </p>
                      </div>
                      <div className="item">
                        <span className="key">حوزه فعالیت</span>
                        <p className="value">{selectedJobAd.company.activity || "مشخص نشده"}</p>
                      </div>
                      <div className="item">
                        <span className="key">امتیاز شرکت</span>
                        <div className="flex gap-0.5 text-sm mt-1">
                          {Array(Math.floor(selectedJobAd.company.score || 0))
                            .fill("")
                            .map(() => (
                              <IconStarFilled key={uuid()} className="icon-sm text-warning" />
                            ))}
                          {Array(Math.ceil(5 - (selectedJobAd.company.score || 0)))
                            .fill("")
                            .map(() => (
                              <IconStarFilled key={uuid()} className="icon-sm text-light" />
                            ))}
                        </div>
                      </div>
                    </div>
                  </>
                ),
              },
              {
                name: "سایر آگهی های این شرکت",
                content: (
                  <>
                    {jobAdsLoading ? (
                      <>
                        <div className="w-full flex flex-wrap gap-3">
                          <Skeleton className="w-full h-52 xl:jobAd_size-1" />
                          <Skeleton className="w-full h-52 xl:jobAd_size-1" />
                          <Skeleton className="w-full h-52 xl:jobAd_size-1" />
                          <Skeleton className="w-full h-52 xl:jobAd_size-1" />
                        </div>
                      </>
                    ) : null}
                    {jobAds?.length ? (
                      jobAds.filter(
                        (job) =>
                          job.company.id === selectedJobAd.company.id && job.id !== selectedJobAd.id
                      ).length ? (
                        <div className="w-full flex flex-wrap gap-3">
                          {jobAds.map((job) => {
                            if (
                              job.company.id === selectedJobAd.company.id &&
                              job.id !== selectedJobAd.id
                            ) {
                              return (
                                <JobAdBox key={uuid()} className="xl:jobAd_size-1" jobAd={job} />
                              )
                            }
                          })}
                        </div>
                      ) : (
                        <Alert message="آگهی وجود ندارد" variant={"warning"} />
                      )
                    ) : null}
                  </>
                ),
              },
            ]}
          />
        </>
      ) : (
        <div className="w-full flex flex-col items-center mt-3">
          <Image
            src="/images/job-detail-empty-state.svg"
            height={300}
            width={300}
            alt="job-detail-empty-state"
          />
          <span className="text-center opacity-50 -translate-y-6">
            جهت مشاهده اطلاعات آگهی شغلی یکی از موارد را از سمت <br /> راست انتخاب کنید.
          </span>
        </div>
      )}
    </div>
  )
}

export default SelectedJobAd
