"use client"

import Link from "next/link"
import Image from "next/image"
import { IconHeart, IconHelp, IconShare, IconUser } from "@tabler/icons-react"

import useJobAds from "@/hooks/store/useJobAds"
import Button from "../Button"

const SelectedJobAd = () => {
  const { selectedJobAd } = useJobAds((s) => s)

  return (
    <div className="list-scrollbar bg-white w-full h-full flex flex-col px-3 py-4 rounded overflow-y-auto">
      {selectedJobAd ? (
        <>
          <div className="w-full">
            <div className={`w-full flex justify-between`}>
              <h2 className="dana-bold text-2xl">{selectedJobAd.title}</h2>
              <span className="min-w-max text-sm">
                {new Date(selectedJobAd.created_at)
                  .toLocaleDateString("fa-ir")
                  .split("/")
                  .reverse()
                  .join(" / ")}
              </span>
            </div>
            <div className="flex items-center mt-4">
              <Link className="text-primary" href={""}>
                {selectedJobAd.company.name}
              </Link>
              <span className="border-r border-solid border-light italic pr-3 mr-3">
                {selectedJobAd.company.province?.name}، {selectedJobAd.company.city.name}
              </span>
              {selectedJobAd.is_remote ? (
                <span className="border-r border-solid border-light italic pr-3 mr-3">
                  امکان دورکاری
                </span>
              ) : null}
              {selectedJobAd.is_urgent ? (
                <span className="text-danger border-r border-solid border-light italic pr-3 mr-3">
                  فوری
                </span>
              ) : null}
            </div>
            <div className="w-full flex items-center justify-between mt-4">
              <span className="text-success">
                {selectedJobAd.salary[0]}{" "}
                {selectedJobAd.salary[1] ? `تا ${selectedJobAd.salary[1]}` : null} میلیون
              </span>
              <div className="flex items-center">
                <div className="flex items-center">
                  <Button className="rounded-full" variant={"primary"} size={"sm"}>
                    <IconShare className="icon-sm" />
                  </Button>
                  <Button className="rounded-full mr-2" variant={"danger"} size={"sm"}>
                    <IconHeart className="icon-sm" />
                  </Button>
                </div>
                <Button className={"mr-4"} variant={"success"}>
                  ارسال رزومه
                </Button>
                <Image
                  className="mr-3 rounded-full"
                  height={40}
                  width={40}
                  src={""}
                  alt="عکس شرکت"
                />
              </div>
            </div>
          </div>

          <div className="bg-light/50 w-full flex items-center px-5 py-2 mt-6 rounded">
            <div className="flex items-center">
              <IconUser className="icon" />
              <span className="mr-3">
                {`${selectedJobAd.company.employees[0] || 0} تا ${
                  selectedJobAd.company.employees[1] || 0
                } نفر`}
              </span>
            </div>
            <div className="flex items-center mr-6">
              <IconHelp className="icon" />
              <p className="mr-3">{selectedJobAd.company.activity?.slice(0, 75)}</p>
            </div>
          </div>
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
