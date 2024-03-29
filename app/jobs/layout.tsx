"use client"

import { PropsWithChildren } from "react"
import { JobAds } from "@prisma/client"

import useJobs from "@/hooks/store/useJobs"
import Filters from "@/components/modules/Filters"

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { jobAds } = useJobs((s) => s)

  return (
    <>
      {children}
      <div className="bg-white border-b border-solid border-light w-full py-6">
        <div className="container flex items-center gap-3">
          <Filters />
        </div>
      </div>
      <main className="bg-light w-full py-9">
        <div className="container flex py-3">
          <aside className="bg-white h-max w-1/3 p-3 rounded-md">
            {jobAds.length ? jobAds.map((jobAd: JobAds) => jobAd.title) : null}
          </aside>
          <section className="bg-white h-[calc(100vh-6rem)] w-2/3 p-3 mr-3 rounded-md sticky top-[5.25rem] overflow-y-auto">
            single job-ad
          </section>
        </div>
      </main>
    </>
  )
}

export default Layout
