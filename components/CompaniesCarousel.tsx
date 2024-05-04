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
import Skeleton from "./Skeleton"

const CompaniesCarousel = ({ className }: { className?: string }) => {
  const { data: companies, isLoading } = useSWR("/api/companies", companiesFetcher)

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
        {isLoading ? (
          <>
            <SwiperSlide className="h-[17rem] pb-6 max-sm:!w-2/3">
              <Skeleton className="w-full h-full" />
            </SwiperSlide>
            <SwiperSlide className="h-[17rem] pb-6 max-sm:!w-2/3">
              <Skeleton className="w-full h-full" />
            </SwiperSlide>
            <SwiperSlide className="h-[17rem] pb-6 max-sm:!w-2/3">
              <Skeleton className="w-full h-full" />
            </SwiperSlide>
            <SwiperSlide className="h-[17rem] pb-6 max-sm:!w-2/3">
              <Skeleton className="w-full h-full" />
            </SwiperSlide>
            <SwiperSlide className="h-[17rem] pb-6 max-sm:!w-2/3">
              <Skeleton className="w-full h-full" />
            </SwiperSlide>
            <SwiperSlide className="h-[17rem] pb-6 max-sm:!w-2/3">
              <Skeleton className="w-full h-full" />
            </SwiperSlide>
          </>
        ) : null}
        {companies?.slice(0, 10).map((company) => (
          <SwiperSlide key={uuid()} className="h-[17rem] pb-6 max-sm:!w-2/3">
            <CompanyBox key={uuid()} className="w-full" company={company} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default CompaniesCarousel
