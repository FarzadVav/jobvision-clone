import SideBar from "@/components/modules/dashboard/SideBar"
import { PropsWithChildren } from "react"

const layout: React.FC<PropsWithChildren> = async ({ children }) => {
  return (
    <div className="container flex my-12 max-lg:mb-[calc(2.75rem+0.75rem+3rem)]">
      <SideBar />
      <section className="border border-solid border-light min-h-screen w-full p-3 rounded-lg lg:w-[70%] lg:p-6 lg:mr-3 xl:w-3/4">
        {children}
      </section>
    </div>
  )
}

export default layout
