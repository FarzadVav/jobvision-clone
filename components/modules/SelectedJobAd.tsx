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

const SelectedJobAd = () => {
  const searchParams = useSearchParams()
  const { data: selectedJobAd } = useSWR(
    searchParams.has("id") ? `/api/jobads/${searchParams.get("id")}` : null,
    selectedJobAdFetcher
  )
  const { data: jobAds } = useSWR(searchParams.has("id") ? "/api/jobads" : null, jobAdsFetcher)

  return (
    <div className="list-scrollbar bg-white w-full h-full flex flex-col px-3 py-4 rounded overflow-y-auto">
      {selectedJobAd ? (
        <>
          <div className="w-full">
            <div className="w-full flex justify-between">
              <h2 className="dana-bold text-2xl leading-relaxed">
                {selectedJobAd.title.slice(0, 100)}
                {selectedJobAd.title.length > 100 ? "..." : null}
              </h2>
              <Button className={"mr-3"} variant={"success"}>
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
              <span className="text-success">{salaryCalculationForView(selectedJobAd.salary)}</span>
              <Button className="mr-auto" size={"sm"}>
                <IconShare className="icon" />
              </Button>
              <Button className="ml-3" size={"sm"}>
                <IconHeart className="icon" />
              </Button>
              {releaseDateCalculation(new Date(selectedJobAd.created_at || ""))}
            </div>
          </div>

          <div className="bg-light/50 w-full flex items-center px-5 py-2 mt-6 mb-3 rounded-md">
            <div className="flex items-center" title="تعداد کارکنان شرکت">
              <IconUser className="icon" />
              <p className="mr-3">
                {selectedJobAd.company.employees[0]} تا {selectedJobAd.company.employees[1]} نفر
              </p>
            </div>
            {selectedJobAd.company.activity ? (
              <div className="flex items-center mr-6" title="حوزه فعالیت">
                <IconHelp className="icon" />
                <p className="mr-3">{selectedJobAd.company.activity}</p>
              </div>
            ) : null}
          </div>

          <Tabs
            tabs={[
              {
                name: "درباره شغل",
                content: (
                  <>
                    <Title size={"sm"}>
                      <span>مشخصات موقعیت شغلی</span>
                    </Title>
                    <div className="selected-jobad_wrap-list mt-1.5">
                      <div className="item">
                        <span className="title">روز و ساعت کاری</span>
                        <p className="text">{selectedJobAd.work_times}</p>
                      </div>
                      <div className="item">
                        <span className="title">نوع همکاری</span>
                        <p className="text">{selectedJobAd.cooperation_type.name}</p>
                      </div>
                      <div className="item">
                        <span className="title">سفر های کاری</span>
                        <p className="text">{selectedJobAd.business_trips}</p>
                      </div>
                      <div className="item">
                        <span className="title">مزایا و تسهیلات</span>
                        <div className="w-full flex flex-wrap items-center gap-1.5">
                          {selectedJobAd.benefits.length
                            ? selectedJobAd.benefits.map((benefit, i) => {
                                if (i < selectedJobAd?.benefits.length - 1) {
                                  return (
                                    <p key={uuid()} className="text flex items-center">
                                      {benefit}
                                      <span className="mr-2 opacity-25">/</span>
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

                    <Title className="mt-6" size={"sm"}>
                      <span>شاخص های کلیدی از نظر کارفرما</span>
                    </Title>
                    <ul className="w-full flex flex-wrap gap-2 mt-3">
                      {selectedJobAd.abilities.length
                        ? selectedJobAd.abilities.map((ability) => (
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
                          {selectedJobAd.age[0]} تا {selectedJobAd.age[1]}
                        </div>
                      </li>
                      <li className="selected-jobAd_ability mt-2">
                        <div className="key">جنسیت</div>
                        <div className="value">
                          {typeof selectedJobAd.gender === null
                            ? "فرقی ندارد"
                            : selectedJobAd.gender
                            ? "مرد"
                            : "زن"}
                        </div>
                      </li>
                      <li className="selected-jobAd_ability mt-2">
                        <div className="key">سربازی</div>
                        <div className="value">
                          {selectedJobAd.end_military_service
                            ? "پایان خدمت یا معاف از سربازی"
                            : "مهم نیست"}
                        </div>
                      </li>
                      <li className="selected-jobAd_ability mt-2">
                        <div className="key">تحصیلات</div>
                        <div className="value">
                          {selectedJobAd.education.length
                            ? selectedJobAd.education.map((education) => (
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
                          {selectedJobAd.languages.length
                            ? selectedJobAd.languages.map((language) => (
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
                          {selectedJobAd.techs.length
                            ? selectedJobAd.techs.map((tech) => (
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
                      {jobAds?.length ? (
                        jobAds.filter(
                          (jobAd) =>
                            jobAd.category.name === selectedJobAd.category.name &&
                            jobAd.id !== selectedJobAd.id
                        ).length ? (
                          <div className="w-full grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {jobAds.map((jobAd2, i) => {
                              if (
                                i < 6 &&
                                jobAd2.category.name === selectedJobAd.category.name &&
                                jobAd2.id !== selectedJobAd.id
                              ) {
                                return <JobAdBox key={uuid()} jobAd={jobAd2} />
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
                    <div className="selected-jobad_wrap-list mt-1.5">
                      <div className="item">
                        <span className="title">سال تاسیس</span>
                        <p className="text">
                          {selectedJobAd.company.year || "تازه کار"}
                        </p>
                      </div>
                      <div className="item">
                        <span className="title">اندازه سازمان</span>
                        <p className="text">
                          {selectedJobAd.company.employees[0]} تا{" "}
                          {selectedJobAd.company.employees[1]} نفر
                        </p>
                      </div>
                      <div className="item">
                        <span className="title">حوزه فعالیت</span>
                        <p className="text">
                          {selectedJobAd.company.activity || "مشخص نشده"}
                        </p>
                      </div>
                      <div className="item">
                        <span className="title">امتیاز شرکت</span>
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
                    {jobAds?.length ? (
                      jobAds.filter(
                        (job) =>
                          job.company.id === selectedJobAd.company.id && job.id !== selectedJobAd.id
                      ).length ? (
                        <div className={`w-full grid grid-cols-1 gap-3 sm:grid-cols-2`}>
                          {jobAds.map((job) => {
                            if (
                              job.company.id === selectedJobAd.company.id &&
                              job.id !== selectedJobAd.id
                            ) {
                              return <JobAdBox key={uuid()} jobAd={job} />
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
