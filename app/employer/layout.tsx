import { redirect } from "next/navigation"
import Image from "next/image"
import { PropsWithChildren } from "react"

import getMe from "../actions/getMe"
import Title from "@/components/Title"
import SideBarLinks from "@/components/dashboard/SideBarLinks"

const layout: React.FC<PropsWithChildren> = async ({ children }) => {
  const user = await getMe()
  !user && redirect("/register")

  return (
    <div className="container flex pb-3 mt-12 lg:pb-6">
      <aside className="bg-primary text-white h-max w-1/4 flex flex-col items-center p-3 rounded-lg sticky top-[5.25rem] lg:p-6">
        <Image className="bg-white rounded-full" src={""} alt="" height={100} width={100} />
        <Title className="mt-3" size={"sm"}>
          <h1 className="text-center">دیجی‌کالا</h1>
        </Title>
        <SideBarLinks />
      </aside>
      <section className="border border-solid border-light h-max w-3/4 p-3 mr-3 rounded-lg lg:p-6">
        {children}
      </section>
    </div>
  )
}

export default layout
