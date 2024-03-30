import Link from "next/link"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import useSWR from "swr"

import { FILTER_KEYS } from "@/utils/initialData"
import { singleJobAdFetcher } from "@/utils/fetcher"
import { IconHeart, IconHelp, IconShare, IconUser, IconX } from "@tabler/icons-react"
import Button from "../Button"

const SelectedJobAd = () => {
  const searchParams = useSearchParams()
  const { data: jobAd } = useSWR(
    `/api/jobads/${searchParams.get(FILTER_KEYS.id)}`,
    singleJobAdFetcher
  )

  return (
    <div className="list-scrollbar bg-white w-full h-full flex flex-col px-3 py-4 rounded overflow-y-auto">
      {jobAd ? (
        <>
          <div className="w-full">
            <div className="w-full flex justify-between items-center mb-6 lg:hidden">
              <Link href={"/jobs"}>
                <Button variant={"primary"} size={"sm"}>
                  بستن
                  <IconX className="icon" />
                </Button>
              </Link>
              <div className={`flex items-center`}>
                <span className={`text-sm`}>
                  {new Date(jobAd.created_at)
                    .toLocaleDateString("fa-ir")
                    .split("/")
                    .reverse()
                    .join(" / ")}
                </span>
                <Button className="rounded-full mr-4" variant={"primary"} size={"sm"}>
                  <IconShare className="icon-sm" />
                </Button>
                <Button className="rounded-full mr-1.5" variant={"danger"} size={"sm"}>
                  <IconHeart className="icon-sm" />
                </Button>
              </div>
            </div>
            <div className={`w-full flex justify-between`}>
              <h2 className="dana-bold text-2xl">{jobAd.title}</h2>
              <span className={`min-w-max hidden text-sm lg:block`}>
                {new Date(jobAd.created_at)
                  .toLocaleDateString("fa-ir")
                  .split("/")
                  .reverse()
                  .join(" / ")}
              </span>
            </div>
            <div className={`flex items-center mt-4 lg:mt-6`}>
              <Link className={`text-primary`} href={``}>
                {jobAd.company.name}
              </Link>
              <span className={`border-r border-solid border-light italic pr-3 mr-3`}>
                {jobAd.company.province?.name}، {jobAd.company.city.name}
              </span>
              {jobAd.is_remote ? (
                <span className={`border-r border-solid border-light italic pr-3 mr-3`}>
                  امکان دورکاری
                </span>
              ) : null}
              {jobAd.is_urgent ? (
                <span className={`text-danger border-r border-solid border-light italic pr-3 mr-3`}>
                  فوری
                </span>
              ) : null}
            </div>
            <div className={`w-full flex items-center justify-between mt-4`}>
              <span className={`text-success`}>
                {jobAd.salary[0]} {jobAd.salary[1] ? `تا ${jobAd.salary[1]}` : null} میلیون
              </span>
              <div className={`flex items-center`}>
                <div className={`hidden items-center lg:flex`}>
                  <Button className="rounded-full" variant={"primary"} size={"sm"}>
                    <IconShare className="icon-sm" />
                  </Button>
                  <Button className="rounded-full mr-2" variant={"danger"} size={"sm"}>
                    <IconHeart className="icon-sm" />
                  </Button>
                </div>
                <Button className={`sm:mr-4`} variant={"success"}>
                  ارسال رزومه
                </Button>
                <Image
                  className={`mr-3 rounded-full`}
                  height={40}
                  width={40}
                  src={""}
                  alt="عکس شرکت"
                />
              </div>
            </div>
          </div>

          <div
            className={`bg-light/50 w-full flex flex-col p-3 mt-6 rounded md:flex-row md:items-center md:px-5 md:py-2`}
          >
            <div className={`flex items-center`}>
              <IconUser className={`icon`} />
              <span className={`mr-3`}>
                {`${jobAd.company.employees[0] || 0} تا ${jobAd.company.employees[1] || 0} نفر`}
              </span>
            </div>
            <div className={`flex items-center mt-1.5 md:mr-6 md:mt-0`}>
              <IconHelp className={`icon`} />
              <p className={`mr-3`}>{jobAd.company.activity?.slice(0, 75)}</p>
            </div>
          </div>
        </>
      ) : (
        <div className={`w-full flex flex-col items-center mt-3`}>
          <Image
            src="/images/job-detail-empty-state.svg"
            height={300}
            width={300}
            alt="job detials"
          />
          <span className={`text-center opacity-50 -translate-y-6`}>
            جهت مشاهده اطلاعات آگهی شغلی یکی از موارد را از سمت <br /> راست انتخاب کنید.
          </span>
        </div>
      )}
    </div>
  )
}

export default SelectedJobAd
