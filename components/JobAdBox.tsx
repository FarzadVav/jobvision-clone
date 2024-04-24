"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { IconStarFilled } from "@tabler/icons-react"

import JobAdsT from "@/types/jobads.types"
import { cn } from "@/utils/lib/tw"
import Button from "./Button"
import { releaseDateCalculation, salaryCalculationForView } from "@/utils/jobAd"

type JobAdBoxProps = {
  jobAd: JobAdsT
  className?: string
}

const JobAdBox = ({ jobAd, className }: JobAdBoxProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isSelected = searchParams.toString().includes(jobAd.id)

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

  const selectJobAdHandler = () => {
    const params = new URLSearchParams(searchParams.toString())
    let currentUrl = "/jobs"

    if (window.innerWidth < 1024) {
      currentUrl = "/single"
    }

    params.set("id", jobAd.id)
    router.push(currentUrl + "?" + params.toString())
  }

  return (
    <article
      className={cn(
        "bg-white ring-1 ring-light h-52 max-h-52 w-full flex flex-col p-3 rounded-md relative cursor-pointer group",
        isSelected ? "ring-primary/50" : "",
        !jobAd.is_urgent ? "pr-[calc(0.75rem+3px)]" : "",
        className
      )}
      onClick={() => {
        prevCategoriesHandler()
        selectJobAdHandler()
      }}
      data-id={jobAd.id}
      data-category={jobAd.category_id}
    >
      {!jobAd.is_urgent ? (
        <div
          className={`${
            isSelected ? "bg-primary" : "bg-danger"
          } w-[3px] h-3/4 absolute top-1/2 right-0 -translate-y-1/2`}
        ></div>
      ) : null}
      <div className="w-full flex">
        <div>
          <Image
            className="jobAd_company-logo"
            height={80}
            width={80}
            src={jobAd.company.logo || ""}
            alt={`لوگوی شرکت ${jobAd.company.name || "ناشناس"}`}
          />
          <div className="w-full flex justify-center items-center mt-3">
            <IconStarFilled className="icon-xs text-warning" />
            <span className="h-3 inline-block text-xs mr-1.5">{jobAd.company.score}</span>
          </div>
        </div>
        <div className="mr-3 text-xs sm:text-sm">
          <span className="dana-bold inline-block text-base">
            {jobAd.title.slice(0, 70)}
            {jobAd.title.length > 70 ? "..." : null}
          </span>
          <div className="flex items-center mt-2">
            <span>{jobAd.company.name || "شرکت ناشناس"}</span>
            <span className="bordered-text">{jobAd.cooperation_type.name}</span>
            {jobAd.is_remote ? <span className="bordered-text">دورکاری</span> : null}
          </div>
          <div className="flex items-center mt-2">
            {jobAd.company.city ? (
              <span className="left-bordered-text">
                {jobAd.company.city?.province.name}، {jobAd.company.city?.name}
              </span>
            ) : null}
            <span className="text-success">{salaryCalculationForView(jobAd.salary)}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-dashed border-light text-xs flex items-center pt-3 mt-auto">
        <span className="h-8 flex items-center">
          {releaseDateCalculation(new Date(jobAd.created_at || ""))}
        </span>
        {jobAd.is_urgent ? (
          <span className="bg-danger/10 text-danger px-3 py-1 mr-auto rounded-full">فوری</span>
        ) : null}
        {pathname.includes("/jobs") ? null : (
          <Button className={jobAd.is_urgent ? "mr-3" : "mr-auto"} variant={"success"} size={"sm"}>
            ارسال رزومه
          </Button>
        )}
      </div>
    </article>
  )
}

export default JobAdBox
