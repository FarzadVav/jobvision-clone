import { PropsWithChildren } from "react"

import Filters from "@/components/modules/Filters"
import SelectedJobAd from "@/components/modules/SelectedJobAd"
import JobAds from "@/components/modules/JobAds"
import SearchForm from "@/components/SearchForm"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <div className="bg-white border-b border-solid border-light w-full pt-6 pb-3">
        <div className="container">
          <SearchForm />
          <Filters />
        </div>
      </div>
      <main className="w-full py-9 lg:bg-light/50">
        <div className="container flex py-3">
          <JobAds />
          <section className="bg-white h-[calc(100vh-6rem)] w-3/5 p-3 mr-3 rounded-md sticky top-[5.25rem] overflow-y-auto max-lg:hidden xl:w-2/3">
            <SelectedJobAd />
          </section>
        </div>
      </main>
    </>
  )
}

export default Layout
