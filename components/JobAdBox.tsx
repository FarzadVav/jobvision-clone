"use client"

import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { IconStarFilled } from "@tabler/icons-react"

import JobAdsT from "@/types/jobads.types"
import useJobAds from "@/hooks/store/useJobAds"
import { cn } from "@/utils/lib"
import Button from "./Button"

type JobAdBoxProps = {
  jobAd: JobAdsT
  className?: string
}

const JobAdBox = ({ jobAd, className }: JobAdBoxProps) => {
  const router = useRouter()
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

  const selectJobAdHandler = () => {
    useJobAds.setState({ selectedJobAd: jobAd })
    if (window.innerWidth >= 1024) {
      !pathname.includes("jobs") && router.push("/jobs")
    } else {
      router.push("/single-job")
    }
  }

  return (
    <article
      className={cn(
        "bg-white ring-1 ring-light h-52 max-h-52 w-full flex flex-col p-4 rounded-md relative cursor-pointer group",
        selectedJobAd?.id === jobAd.id ? "ring-primary/50" : "",
        className
      )}
      onClick={() => {
        prevCategoriesHandler()
        selectJobAdHandler()
      }}
      data-id={jobAd.id}
      data-category={jobAd.category_id}
    >
      {jobAd.is_urgent ? (
        <div className="bg-danger w-0.5 h-3/4 absolute top-1/2 right-0 -translate-y-1/2"></div>
      ) : null}
      <div className="flex">
        <div>
          <Image
            className="border border-solid border-light text-sm object-fill object-center rounded-md"
            height={80}
            width={80}
            src={""}
            alt={`لوگوی شرکت ${jobAd.company.name}`}
          />
          <div className="text-success brightness-75 w-full flex justify-center items-center mt-2.5">
            <IconStarFilled className="icon-xs" />
            <span className="text-xs h-3 inline-block mr-1.5">{jobAd.company.score}</span>
          </div>
        </div>
        <div className="pr-3">
          <span className="dana-bold max-h-[3rem] inline-block">
            {jobAd.title.slice(0, 70)}
            {jobAd.title.length > 70 ? "..." : null}
          </span>
          <div className="flex items-center mt-2">
            <span className="text-xs">{jobAd.company.name}</span>
            <span className="border-r border-solid border-light text-xs pr-2 mr-2">
              {jobAd.cooperation_type.name}
            </span>
            {jobAd.is_remote ? (
              <span className="border-r border-solid border-light text-xs pr-2 mr-2">دورکاری</span>
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
      <div className="border-t border-dashed border-light flex items-center pt-3 mt-auto">
        <span className="h-8 text-xs leading-8">
          {new Date(jobAd.created_at).toLocaleDateString("fa-ir").split("/").reverse().join(" / ")}
        </span>
        {jobAd.is_urgent ? (
          <span className="bg-danger/10 text-danger text-xs px-3 py-1 mr-auto rounded-full">
            فوری
          </span>
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
