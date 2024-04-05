"use client"

import { usePathname } from "next/navigation"
import Image from "next/image"
import { IconStarFilled } from "@tabler/icons-react"

import JobAdsT from "@/types/jobads.types"
import Button from "./Button"
import { cn } from "@/utils/lib"
import useJobAds from "@/hooks/store/useJobAds"

type JobAdBoxProps = {
  jobAd: JobAdsT
  className?: string
}

const JobAdBox = ({ jobAd, className }: JobAdBoxProps) => {
  const pathname = usePathname()
  const { selectedJobAd } = useJobAds((s) => s)

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
      className={cn("bg-white w-full group", className)}
      onClick={() => {
        prevCategoriesHandler()
        useJobAds.setState({ selectedJobAd: jobAd })
      }}
      data-id={jobAd.id}
      data-category={jobAd.category_id}
    >
      <div
        className={`text-dark ring-1 ring-light w-full h-full flex flex-col justify-between p-3 rounded-md cursor-pointer transition-shadow ${
          selectedJobAd?.id === jobAd.id ? "ring-primary/50 ring-2" : "hover:ring-2"
        }`}
      >
        <div className="flex">
          <Image
            className="text-sm object-fill object-center rounded-md"
            height={80}
            width={80}
            src={""}
            alt={`لوگوی شرکت ${jobAd.company.name}`}
          />
          <div className="flex flex-col pr-3">
            <span className="dana-bold inline-block max-h-[4.5rem] overflow-hidden">
              {jobAd.title}
            </span>
            <div className="flex items-center mt-2.5">
              <span className="text-xs">{jobAd.company.name}</span>
              <span className="border-r border-solid border-light text-xs pr-2 mr-2">
                {jobAd.cooperation_type.name}
              </span>
              {jobAd.is_remote ? (
                <span className="border-r border-solid border-light text-xs pr-2 mr-2">
                  دورکاری
                </span>
              ) : null}
            </div>
            <div className="flex items-center mt-2.5">
              <span className="text-xs">
                {jobAd.company.province.name}، {jobAd.company.city.name}
              </span>
              <span className="text-success border-r border-solid border-light text-xs pr-2 mr-2">
                {jobAd.salary[0]} {jobAd.salary[1] ? `تا ${jobAd.salary[1]}` : null} میلیون
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-dashed border-light flex items-center pt-3 mt-5">
          <span className="h-8 text-xs leading-8">
            {new Date(jobAd.created_at)
              .toLocaleDateString("fa-ir")
              .split("/")
              .reverse()
              .join(" / ")}
          </span>
          <div
            className={`text-sm flex items-center mr-auto ${
              pathname.includes("/jobs")
                ? ""
                : "transition-opacity group-hover:opacity-100 lg:opacity-0"
            }`}
          >
            <IconStarFilled className="icon-sm text-warning" />
            <span className="text-dark text-xs h-3 inline-block mr-1.5">{jobAd.company.score}</span>
          </div>
          {jobAd.is_urgent ? (
            <span className="bg-danger/10 text-danger text-xs px-3 py-1 mr-3 rounded-full">
              فوری
            </span>
          ) : null}
          {pathname.includes("/jobs") ? null : (
            <Button className="mr-3" variant={"success"} size={"sm"}>
              ارسال رزومه
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

export default JobAdBox
