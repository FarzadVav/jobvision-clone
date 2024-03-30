"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { IconStarFilled } from "@tabler/icons-react"

import JobAdsT from "@/types/jobads.types"
import Button from "./Button"
import { cn } from "@/utils/lib"

type JobAdBoxProps = JobAdsT & {
  className?: string
}

const JobAdBox = ({
  category_id,
  id,
  salary,
  title,
  company,
  cooperation_type,
  is_remote,
  is_urgent,
  created_at,
  className,
}: JobAdBoxProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const prevCategoriesHandler = () => {
    const prevCategories: string[] = JSON.parse(localStorage.getItem("prevCategories") || "[]")

    if (prevCategories.length >= 100) prevCategories.shift()

    let hasIdInPrevCategories: boolean = false
    prevCategories.forEach((prev: string) => {
      if (prev === category_id) {
        hasIdInPrevCategories = true
      }
    })
    if (!hasIdInPrevCategories) {
      prevCategories.push(category_id)
      localStorage.setItem("prevCategories", JSON.stringify(prevCategories))
    }
  }

  return (
    <article
      className={cn(className, "bg-white w-full group")}
      onClick={() => {
        prevCategoriesHandler()
        const params = new URLSearchParams(searchParams.toString())
        params.set("id", id)
        router.push(pathname + "?" + params.toString())
      }}
      data-id={id}
      data-category={category_id}
    >
      <div
        className={`text-dark ring-1 ring-light w-full h-full flex flex-col justify-between p-3 rounded-md cursor-pointer transition-shadow ${
          searchParams.has("id", id) ? "ring-primary ring-2" : "hover:ring-2"
        }`}
      >
        <div className="flex">
          <Image
            className="text-sm object-fill object-center rounded-md"
            height={80}
            width={80}
            src={""}
            alt={`لوگوی شرکت ${company.name}`}
          />
          <div className="flex flex-col pr-3">
            <span className="dana-bold inline-block max-h-[4.5rem] overflow-hidden">{title}</span>
            <div className="flex items-center mt-2.5">
              <span className="text-xs">{company.name}</span>
              <span className="border-r border-solid border-light text-xs pr-2 mr-2">
                {cooperation_type.name}
              </span>
              {is_remote ? (
                <span className="italic border-r border-solid border-light text-xs pr-2 mr-2">
                  دورکاری
                </span>
              ) : null}
              {company.knowledgeBased ? (
                <span className="italic border-r border-solid border-light text-xs pr-2 mr-2">
                  امریه سربازی
                </span>
              ) : null}
            </div>
            <div className="flex items-center mt-2.5">
              <span className="text-xs">
                {company.province.name}، {company.city.name}
              </span>
              <span className="text-success border-r border-solid border-light text-xs pr-2 mr-2">
                {salary[0]} {salary[1] ? `تا ${salary[1]}` : null} میلیون
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-dashed border-light flex items-center pt-4 mt-5">
          <span className="text-xs h-3">
            {new Date(created_at).toLocaleDateString("fa-ir").split("/").reverse().join(" / ")}
          </span>
          <div
            className={`text-sm flex items-center mr-auto ${
              pathname.includes("/jobs")
                ? ""
                : "transition-opacity group-hover:opacity-100 lg:opacity-0"
            }`}
          >
            <IconStarFilled className="icon-sm text-warning" />
            <span className="text-dark text-xs h-3 inline-block mr-1.5">{company.score}</span>
          </div>
          {is_urgent ? (
            <span className="bg-danger/10 text-danger text-xs px-3 py-1 mr-3 rounded-full">
              فوری
            </span>
          ) : null}
          {pathname.includes("/jobs") ? null : <Button variant={"success"}>ارسال رزومه</Button>}
        </div>
      </div>
    </article>
  )
}

export default JobAdBox
