import SideBar from "@/components/dashboard/SideBar"
import { PropsWithChildren } from "react"

const layout: React.FC<PropsWithChildren> = async ({ children }) => {
  return (
    <div className="container flex my-12">
      <SideBar />
      <section className="border border-solid border-light min-h-screen w-full p-3 mr-3 rounded-lg lg:w-[70%] lg:p-6 xl:w-3/4">
        {children}
      </section>
    </div>
  )
}

export default layout
