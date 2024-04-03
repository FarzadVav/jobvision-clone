import { PropsWithChildren } from "react"

import Filters from "@/components/modules/Filters"
import SelectedJobAd from "@/components/modules/SelectedJobAd"
import JobAds from "@/components/modules/JobAds"
import SearchForm from "@/components/SearchForm"

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <div className="bg-white border-b border-solid border-light w-full py-6">
        <div className="container">
          <SearchForm />
          <Filters />
        </div>
      </div>
      <main className="bg-light/50 w-full py-9">
        <div className="container flex py-3">
          <JobAds />
          <section className="bg-white max-h-[calc(100vh-6rem)] w-2/3 p-3 mr-3 rounded-md sticky top-[5.25rem] overflow-y-auto">
            <SelectedJobAd />
          </section>
        </div>
      </main>
    </>
  )
}

export default Layout
