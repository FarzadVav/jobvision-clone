import Image from "next/image"
import Link from "next/link"
import { IconArrowLeft, IconStarFilled } from "@tabler/icons-react"

import CompaniesT from "@/types/companies.types"
import { cn } from "@/utils/tw"
import Button from "./Button"

type CompanyBoxProps = {
  company: CompaniesT
  className?: string
}

const CompanyBox = ({ company, className }: CompanyBoxProps) => {
  return (
    <div
      className={cn(
        "bg-white text-dark border border-solid border-light w-56 h-[17rem] flex flex-col p-3 rounded-md",
        className
      )}
    >
      <Image
        className="border border-solid border-light object-fill object-center rounded-md"
        src={company.logo || ""}
        alt={`لوگوی شرکت ${company.name || "ناشناس"}`}
        height={80}
        width={80}
      />
      <Button className="dana-bold w-max mt-4 px-0" variant={"primaryLink"}>
        {company.name || "شرکت ناشناس"}
      </Button>
      <div className="flex items-center mt-2">
        <IconStarFilled className="icon-xs text-warning" />
        <span className="text-xs h-3 inline-block mr-1.5">{company.score}</span>
      </div>
      <div className="text-sm mt-3">
        {company.job_ads.length ? (
          <Link
            className="text-primary underline flex items-center gap-2 decoration-transparent transition-all hover:decoration-primary"
            href={""}
          >
            {company.job_ads.length} آگهی شغلی
            <IconArrowLeft className="icon-sm" />
          </Link>
        ) : (
          "بدون آگهی شغلی"
        )}
      </div>
      <Button className="w-full mt-auto" variant={"lightFill"}>
        دنبال کردن
      </Button>
    </div>
  )
}

export default CompanyBox
