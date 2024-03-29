"use client"

import useJobs from "@/hooks/store/useJobs"
import JobAdsT from "@/types/jobads.types"
import { IconStarFilled } from "@tabler/icons-react"
import Button from "./Button"
import Image from "next/image"

const JobAdsBox = (jobAd: JobAdsT) => {
  console.log(jobAd)

  const { selectedJobAd } = useJobs((s) => s)

  const selected = selectedJobAd?.id === jobAd.id

  const prevCategoriesHandler = () => {
    const prevCategories: string[] = JSON.parse(localStorage.getItem("prevCategories") || "[]")

    if (prevCategories.length >= 100) prevCategories.shift()

    let hasIdInPrevCategories: boolean = false
    prevCategories.forEach((prev: string) => {
      if (prev === jobAd.category_id) {
        hasIdInPrevCategories = true
      }
    })
    if (!hasIdInPrevCategories) {
      prevCategories.push(jobAd.category_id)
      localStorage.setItem("prevCategories", JSON.stringify(prevCategories))
    }
  }

  return (
    <article
      className="bg-white w-full group"
      onClick={() => {
        prevCategoriesHandler()
        useJobs.setState({ selectedJobAd: jobAd })
      }}
      data-id={jobAd.id}
      data-category={jobAd.category_id}
    >
      <div
        className={`text-dark border border-solid border-light w-full h-full flex flex-col justify-between rounded-md cursor-pointer p-3 ${
          selected ? "lg:border-primary lg:text-primary" : ""
        }`}
      >
        <div className="flex">
          <div className="col-span-3 flex flex-col items-center">
            <Image
              className="text-sm object-fill object-center rounded-md"
              height={80}
              width={80}
              src={""}
              alt={`لوگوی شرکت ${jobAd.company.name}`}
            />
          </div>
          <div className="col-span-9 flex flex-col px-3">
            <span className="dana-bold inline-block max-h-[4.5rem] overflow-hidden lg:text-sm xl:text-bas">
              {jobAd.title}
            </span>
            <div className="flex items-center mt-2">
              <span className="text-xs">{jobAd.company.name}</span>
              {jobAd.is_remote ? (
                <span className="italic border-r border-solid border-light text-xs pr-2 mr-2">
                  دورکاری
                </span>
              ) : null}
              {jobAd.company.knowledgeBased ? (
                <span className="italic border-r border-solid border-light text-xs pr-2 mr-2">
                  امریه سربازی
                </span>
              ) : null}
            </div>
            <div className="flex items-center mt-2">
              <span className="text-xs">
                {jobAd.company.province.name}، {jobAd.company.city.name}
              </span>
              <span className="text-success border-r border-solid border-light text-xs pr-2 mr-2">
                {jobAd.salary[0]} {jobAd.salary[1] ? `تا ${jobAd.salary[1]}` : null} میلیون
              </span>
            </div>
          </div>
        </div>
        <div
          className={`border-t border-dashed border-light col-span-12 flex justify-between items-center pt-3 mt-5
        ${selected ? "lg:border-primary" : ""}`}
        >
          {jobAd.is_urgent ? (
            <span className="badge badge-danger">فوری</span>
          ) : (
            <span className="text-xs h-3">
              {new Date(jobAd.created_at)
                .toLocaleDateString("fa-ir")
                .split("/")
                .reverse()
                .join(" / ")}
            </span>
          )}
          {jobAd.company.score ? (
            <div
              className={`text-sm flex items-center ml-auto mr-3 transition-opacity ${
                selected ? "lg:ml-0" : "lg:opacity-0 group-hover:opacity-100"
              }`}
            >
              <IconStarFilled className="icon-sm text-warning" />
              <span className="text-dark text-xs h-3 inline-block mr-1.5">
                {jobAd.company.score}
              </span>
            </div>
          ) : null}
          <Button className={selected ? "lg:hidden" : ""} variant={"success"}>
            ارسال رزومه
          </Button>
        </div>
      </div>
    </article>
  )
}

export default JobAdsBox
