"use client"

import useSWR from "swr"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import { v4 as uuid } from "uuid"
import "swiper/css"
import "swiper/css/navigation"

import { companiesFetcher } from "@/utils/fetcher"
import { cn } from "@/utils/tw"
import CompanyBox from "./CompanyBox"
import Skeleton from "./Skeleton"

const CompaniesCarousel = ({ className }: { className?: string }) => {
  const { data: companies, isLoading } = useSWR("/api/companies", companiesFetcher)

  return (
    <div className={cn("w-full h-[17rem]", className)}>
      {isLoading ? (
        <div className="center gap-3 h-full">
          <Skeleton className="w-2/3 h-full pb-6" />
          <Skeleton className="w-2/3 h-full pb-6" />
          <Skeleton className="w-2/3 h-full pb-6" />
          <Skeleton className="w-2/3 h-full pb-6" />
          <Skeleton className="w-2/3 h-full pb-6" />
        </div>
      ) : (
        <Swiper
          className="w-full h-full rounded-md"
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
          {companies?.slice(0, 10).map((company) => (
            <SwiperSlide key={uuid()} className="h-[17rem] pb-6 max-sm:!w-[85%]">
              <CompanyBox key={uuid()} className="w-full" company={company} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export default CompaniesCarousel
