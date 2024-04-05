import Image from "next/image"
import Link from "next/link"

import CompaniesT from "@/types/companies.types"
import { cn } from "@/utils/lib"
import { IconArrowLeft, IconStarFilled } from "@tabler/icons-react"
import Button from "./Button"

type CompanyBoxProps = {
  company: CompaniesT
  className?: string
}

const CompanyBox = ({ company, className }: CompanyBoxProps) => {
  return (
    <div
      className={cn(
        "bg-white text-dark border border-solid border-light w-56 p-3 rounded-md",
        className
      )}
    >
      <Image
        className="border border-solid border-light object-fill object-center rounded-md"
        src={""}
        alt={`لوگوی شرکت ${company.name}`}
        height={80}
        width={80}
      />
      <Link className="dana-bold inline-block mt-3" href={""}>
        <Button className="text-dark px-0 hover:decoration-dark" variant={"link"}>{company.name || "شرکت ناشناس"}</Button>
      </Link>
      <div className="flex items-center">
        <IconStarFilled className="icon-xs text-warning" />
        <span className="text-xs h-3 inline-block mr-1.5">{company.score}</span>
      </div>
      <Link className="w-max text-sm flex items-center mt-2" href={""}>
        {company.job_ads.length ? (
          <Button className="px-0" variant={"link"} size={"sm"}>
            {company.job_ads.length} آگهی شغلی
            <IconArrowLeft className="icon-sm" />
          </Button>
        ) : (
          "بدون آگهی شغلی"
        )}
      </Link>
      <Button className="w-full mt-3" variant={"fill"}>
        دنبال کردن
      </Button>
    </div>
  )
}

export default CompanyBox
