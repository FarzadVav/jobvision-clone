"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { IconStarFilled } from "@tabler/icons-react"

import JobAdsT from "@/types/jobads.types"
import Button from "./Button"

const JobAdsBox = (jobAd: JobAdsT) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

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
        const params = new URLSearchParams(searchParams.toString())
        params.set("id", jobAd.id)
        router.push(pathname + "?" + params.toString())
      }}
      data-id={jobAd.id}
      data-category={jobAd.category_id}
    >
      <div
        className={`text-dark ring-1 ring-light w-full h-full flex flex-col justify-between p-3 rounded-md cursor-pointer transition-shadow ${
          searchParams.has("id", jobAd.id) ? "ring-primary ring-2" : "hover:ring-2"
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
        <div className="border-t border-dashed border-light flex items-center pt-4 mt-5">
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
              className={`text-sm flex items-center mr-auto ${
                pathname.includes("/jobs")
                  ? ""
                  : "transition-opacity group-hover:opacity-100 lg:opacity-0"
              }`}
            >
              <IconStarFilled className="icon-sm text-warning" />
              <span className="text-dark text-xs h-3 inline-block mr-1.5">
                {jobAd.company.score}
              </span>
            </div>
          ) : null}
          {pathname.includes("/jobs") ? null : <Button variant={"success"}>ارسال رزومه</Button>}
        </div>
      </div>
    </article>
  )
}

export default JobAdsBox
