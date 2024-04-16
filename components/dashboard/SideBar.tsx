"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import useSWR from "swr"
import { v4 as uuid } from "uuid"
import { IconBell, IconDots, IconLogout } from "@tabler/icons-react"

import Button from "../Button"
import Title from "../Title"
import { getMeFetcher } from "@/utils/fetcher"

const links = [
  { href: "/employer", value: "داشبورد" },
  { href: "/employer/profile", value: "اطلاعات شرکت" },
  { href: "/employer/new-jobad", value: "آگهی جدید" },
]

const SideBar = () => {
  const pathname = usePathname()
  const { data: company } = useSWR("/api/getMe", getMeFetcher)

  return (
    <aside className="bg-primary text-white h-max w-1/4 flex flex-col items-center p-3 rounded-lg sticky top-[5.25rem] lg:p-6">
      <Image
        className="bg-white rounded-full"
        src={company?.logo || ""}
        alt=""
        height={100}
        width={100}
      />
      <Title className="justify-center mt-3" size={"sm"}>
        <h1 className="text-center">{company?.name}</h1>
      </Title>
      <ul className="w-full mt-3">
        {links.map((link) => (
          <li key={uuid()} className="w-full mt-3 first-of-type:mt-0">
            <Link className="w-full" href={link.href}>
              <Button
                className={`${
                  pathname.endsWith(link.href)
                    ? "text-primary"
                    : "bg-primary text-white hover:bg-white hover:text-primary"
                } w-full`}
                variant={"outline"}
              >
                {link.value}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
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
  )
}

export default SideBar
