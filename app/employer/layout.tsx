import Image from "next/image"
import { PropsWithChildren } from "react"

import Title from "@/components/Title"
import SideBarLinks from "@/components/dashboard/SideBarLinks"
import Button from "@/components/Button"
import { IconBell, IconDots, IconLogout } from "@tabler/icons-react"

const layout: React.FC<PropsWithChildren> = async ({ children }) => {
  return (
    <div className="container flex my-12">
      <aside className="bg-primary text-white h-max w-1/4 flex flex-col items-center p-3 rounded-lg sticky top-[5.25rem] lg:p-6">
        <Image className="bg-white rounded-full" src={""} alt="" height={100} width={100} />
        <Title className="justify-center mt-3" size={"sm"}>
          <h1 className="text-center">دیجی‌کالا</h1>
        </Title>
        <SideBarLinks />
        <div className="w-full flex justify-center items-center mt-6">
          <Button aria-label="details" title="جزئیات">
            <IconDots className="icon" />
          </Button>
          <Button aria-label="notifications" title="اعلان ها">
            <IconBell className="icon" />
          </Button>
          <Button className="mr-auto" variant={"danger"}>
            خروج
            <IconLogout className="icon" />
          </Button>
        </div>
      </aside>
      <section className="border border-solid border-light h-max w-3/4 p-3 mr-3 rounded-lg lg:p-6">
        {children}
      </section>
    </div>
  )
}

export default layout
