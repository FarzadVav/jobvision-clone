import SideBar from "@/components/dashboard/SideBar"
import { PropsWithChildren } from "react"

const layout: React.FC<PropsWithChildren> = async ({ children }) => {
  return (
    <div className="container flex my-12">
      <SideBar />
      <section className="border border-solid border-light h-max w-3/4 p-3 mr-3 rounded-lg lg:p-6">
        {children}
      </section>
    </div>
  )
}

export default layout
