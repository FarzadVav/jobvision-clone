"use client"

import useSWR from "swr"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import { v4 as uuid } from "uuid"
import "swiper/css"
import "swiper/css/navigation"

import { companiesFetcher } from "@/utils/fetcher"
import { cn } from "@/utils/lib/tw"
import CompanyBox from "./CompanyBox"

const CompaniesCarousel = ({ className }: { className?: string }) => {
  const { data: companies } = useSWR("/api/companies", companiesFetcher)

  return (
    <>
      <Swiper
        className={cn("w-full h-[17rem] rounded-md", className)}
        navigation
        spaceBetween={12}
        slidesPerView={"auto"}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
      >
        {companies?.map((company) => (
          <SwiperSlide key={uuid()} className="h-[17rem] pb-6 max-sm:!w-2/3">
            <CompanyBox key={uuid()} className="min-w-full" company={company} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default CompaniesCarousel
