import Image from "next/image"
import Link from "next/link"
import { IconArrowLeft, IconStarFilled } from "@tabler/icons-react"

import { cn } from "@/utils/tw"
import Button from "./Button"
import { CompaniesT } from "@/types/prisma.types"

type CompanyBoxProps = {
  company: CompaniesT
  className?: string
}

const CompanyBox = ({ company, className }: CompanyBoxProps) => {
  return (
    <div
      className={cn(
        "bg-white text-dark ring-1 ring-light w-56 h-[17rem] flex flex-col p-3 rounded-md",
        className
      )}
    >
      <div className="ring-1 ring-light size-20 p-1.5 rounded-md">
        <Image
          className="size-full rounded-md"
          src={company.logo || "/images/company.png"}
          alt={`لوگوی شرکت ${company.name || "ناشناس"}`}
          height={128}
          width={128}
        />
      </div>
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
