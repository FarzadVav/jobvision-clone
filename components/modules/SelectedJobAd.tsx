"use client"

import Link from "next/link"
import Image from "next/image"
import useSWR from "swr"
import { v4 as uuid } from "uuid"
import { IconHeart, IconHelp, IconInfoCircle, IconShare, IconUser } from "@tabler/icons-react"

import { jobAdsFetcher } from "@/utils/fetcher"
import useJobAds from "@/hooks/store/useJobAds"
import Button from "../Button"
import Tabs from "../Tabs"
import Title from "../Title"
import JobAdBox from "../JobAdBox"
import Alert from "../Alert"

const SelectedJobAd = () => {
  const { selectedJobAd } = useJobAds((s) => s)
  const { data: jobAds } = useSWR(selectedJobAd ? `/jobs/${selectedJobAd.id}` : null, jobAdsFetcher)

  return (
    <div className="list-scrollbar bg-white w-full h-full flex flex-col px-3 py-4 rounded overflow-y-auto">
      {selectedJobAd ? (
        <>
          <div className="w-full">
            <div className={`w-full flex justify-between`}>
              <h2 className="dana-bold text-2xl flex items-center">
                {selectedJobAd.title}
                {selectedJobAd.is_urgent ? (
                  <span className="dana-base bg-danger/10 text-danger text-xs px-3 py-1 mr-3 rounded-full">
                    فوری
                  </span>
                ) : null}
              </h2>
              <Button className={"mr-4"} variant={"success"}>
                ارسال رزومه
              </Button>
            </div>
            <div className="flex items-center mt-4">
              <Link
                className="text-primary underline decoration-transparent transition hover:decoration-primary"
                href={""}
              >
                {selectedJobAd.company.name}
              </Link>
              <span className="border-r border-solid border-light pr-3 mr-3">
                {selectedJobAd.company.province?.name}، {selectedJobAd.company.city.name}
              </span>
              {selectedJobAd.is_remote ? (
                <span className="border-r border-solid border-light pr-3 mr-3">امکان دورکاری</span>
              ) : null}
              {selectedJobAd.company.knowledgeBased ? (
                <span className="border-r border-solid border-light pr-3 mr-3">دانش بنیان</span>
              ) : null}
            </div>
            <div className="w-full flex items-center mt-4">
              <span className="text-success">
                {selectedJobAd.salary[0]}{" "}
                {selectedJobAd.salary[1] ? `تا ${selectedJobAd.salary[1]}` : null} میلیون
              </span>
              <Button className="mr-auto" size={"sm"}>
                <IconShare className="icon" />
              </Button>
              <Button size={"sm"}>
                <IconHeart className="icon" />
              </Button>
            </div>
          </div>

          <div className="bg-light/50 w-full flex items-center px-5 py-2 mt-6 mb-3 rounded">
            <div className="flex items-center" title="تعداد کارکنان شرکت">
              <IconUser className="icon" />
              <p className="mr-3">
                {`${selectedJobAd.company.employees[0] || 0} تا ${
                  selectedJobAd.company.employees[1] || 0
                } نفر`}
              </p>
            </div>
            <div className="flex items-center mr-6" title="حوزه فعالیت">
              <IconHelp className="icon" />
              <p className="mr-3">{selectedJobAd.company.activity?.slice(0, 75)}</p>
            </div>
          </div>

          <Tabs
            tabs={[
              {
                id: uuid(),
                title: "درباره شغل",
                content: (
                  <div className={`w-full flex flex-col`}>
                    <Title size={"sm"}>
                      <span>مشخصات موقعیت شغلی</span>
                    </Title>
                    <div className={`w-full flex flex-wrap gap-y-3 mt-1.5`}>
                      <div className={`w-full sm:w-1/2`}>
                        <span className={`dana-bold block`}>روز و ساعت کاری</span>
                        <span className={`block text-sm mt-1`}>{selectedJobAd.work_times}</span>
                      </div>
                      <div className={`w-full sm:w-1/2`}>
                        <span className={`dana-bold block`}>نوع همکاری</span>
                        <span className={`block text-sm mt-1`}>
                          {selectedJobAd.cooperation_type.name}
                        </span>
                      </div>
                      <div className={`w-full sm:w-1/2`}>
                        <span className={`dana-bold block`}>سفر های کاری</span>
                        <span className={`block text-sm mt-1`}>{selectedJobAd.business_trips}</span>
                      </div>
                      <div className={`w-full sm:w-1/2`}>
                        <span className={`dana-bold block`}>مزایا و تسهیلات</span>
                        <div className={`text-sm mt-1`}>
                          {selectedJobAd.benefits.length
                            ? selectedJobAd.benefits.map((benefit, i) => {
                                if (i < selectedJobAd?.benefits.length - 1) {
                                  return (
                                    <div key={uuid()} className={`inline-block ml-2`}>
                                      {benefit}
                                      <span className={`inline-block mr-2 opacity-25`}>/</span>
                                    </div>
                                  )
                                } else {
                                  return (
                                    <span key={uuid()} className={`inline-block`}>
                                      {benefit}
                                    </span>
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
                    <ul className={`w-full flex flex-wrap gap-2 mt-3`}>
                      {selectedJobAd.abilities.length
                        ? selectedJobAd.abilities.map((ability) => (
                            <li
                              key={uuid()}
                              className={`border border-solid border-dark min-w-max text-center px-2 rounded`}
                            >
                              {ability}
                            </li>
                          ))
                        : "مهم نیست"}
                    </ul>

                    <Title className={`mt-6`} size={"sm"}>
                      <span>شرح شغل و وظایف</span>
                    </Title>
                    <p className={`w-full pr-2 mt-1.5`}>{selectedJobAd?.description}</p>

                    <Title className={`mt-6`} size={"sm"}>
                      <span>شرایط احراز شغل</span>
                    </Title>
                    <ul className={`w-full flex flex-col mt-3`}>
                      <li className={`selected-jobAd-ability`}>
                        <span>سن</span>
                        <span>
                          {selectedJobAd.age[0]} تا {selectedJobAd.age[1]}
                        </span>
                      </li>
                      <li className={`selected-jobAd-ability mt-2`}>
                        <span>جنسیت</span>
                        <span>
                          {typeof selectedJobAd.gender === null
                            ? "فرقی ندارد"
                            : selectedJobAd.gender
                            ? "مرد"
                            : "زن"}
                        </span>
                      </li>
                      <li className={`selected-jobAd-ability mt-2`}>
                        <span>سربازی</span>
                        <span>
                          {selectedJobAd.end_military_service
                            ? "پایان خدمت یا معاف از سربازی"
                            : "مهم نیست"}
                        </span>
                      </li>
                      <li className={`selected-jobAd-ability mt-2`}>
                        <span>تحصیلات</span>
                        <span>
                          {selectedJobAd.education.length
                            ? selectedJobAd.education.map((education) => (
                                <div
                                  key={uuid()}
                                  className={`bg-light min-w-max text-xs px-3 py-0.5 ml-1.5 rounded last:ml-0`}
                                >
                                  {education}
                                </div>
                              ))
                            : "فرقی ندارد"}
                        </span>
                      </li>
                      <li className={`selected-jobAd-ability mt-2`}>
                        <span>زبان ها</span>
                        <span>
                          {selectedJobAd.languages.length
                            ? selectedJobAd.languages.map((language) => (
                                <div
                                  key={uuid()}
                                  className={`bg-light min-w-max text-xs px-3 py-0.5 ml-1.5 rounded last:ml-0`}
                                >
                                  {language}
                                </div>
                              ))
                            : "فرقی ندارد"}
                        </span>
                      </li>
                      <li className={`selected-jobAd-ability mt-2`}>
                        <span>تکنولوژی ها</span>
                        <span>
                          {selectedJobAd.techs.length
                            ? selectedJobAd.techs.map((tech) => (
                                <div
                                  key={uuid()}
                                  className={`bg-light min-w-max text-xs px-3 py-0.5 ml-1.5 rounded last:ml-0`}
                                >
                                  {tech}
                                </div>
                              ))
                            : "فرقی ندارد"}
                        </span>
                      </li>
                    </ul>

                    <div
                      className={`border-t border-b border-solid border-light w-full flex items-center py-1.5 mt-6`}
                    >
                      <Button>
                        <IconInfoCircle className={`icon text-dark/50 ml-1`} />
                        ثبت مشکل و تخلف آگهی
                      </Button>
                    </div>

                    <Title className={`mt-3 mb-3`} size={"sm"}>
                      <span>فرصت‌های شغلی مشابه</span>
                    </Title>

                    <div className={`w-full mt-1.5`}>
                      {jobAds?.length ? (
                        jobAds.filter(
                          (jobAd) =>
                            jobAd.category.name === selectedJobAd.category.name &&
                            jobAd.id !== selectedJobAd.id
                        ).length ? (
                          <div className={`w-full grid grid-cols-1 gap-3 sm:grid-cols-2`}>
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
                  </div>
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
            alt="job detials"
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
