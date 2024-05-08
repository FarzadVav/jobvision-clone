"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import useSWR from "swr"
import { v4 as uuid } from "uuid"
import {
  IconAd,
  IconBell,
  IconDots,
  IconFileCheck,
  IconInfoCircle,
  IconLayoutDashboard,
  IconLogout,
  IconUserEdit,
} from "@tabler/icons-react"

import Button from "../Button"
import Title from "../Title"
import { getMeFetcher } from "@/utils/fetcher"
import logOut from "@/app/actions/logOut"
import { useState } from "react"
import MobileMenu from "../MobileMenu"
import Modal from "../Modal"

const links = [
  { href: "/employer", value: "داشبورد", icon: <IconLayoutDashboard className="icon" /> },
  { href: "/employer/profile", value: "اطلاعات شرکت", icon: <IconUserEdit className="icon" /> },
  { href: "/employer/new-jobad", value: "آگهی جدید", icon: <IconAd className="icon" /> },
]

const SideBar = () => {
  const pathname = usePathname()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showLogOutModal, setShowLogOutModal] = useState(false)
  const { data: company } = useSWR("/api/getMe", getMeFetcher)

  return (
    <>
      <aside className="bg-primary text-white h-max w-[30%] hidden flex-col items-center p-3 rounded-lg sticky top-[5.25rem] lg:flex lg:p-6 xl:w-1/4">
        <Image
          className="bg-white rounded-full"
          src={company?.logo || ""}
          alt=""
          height={100}
          width={100}
        />
        <Title className="justify-center min-h-7 mt-3" size={"sm"}>
          <h1 className="text-center truncate">{company?.name}</h1>
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
          <Button className="mr-auto" variant={"danger"} onClick={() => setShowLogOutModal(true)}>
            خروج
            <IconLogout className="icon" />
          </Button>
        </div>
      </aside>
      <menu className="bg-primary/10 backdrop-blur-xl border-t border-solid border-white/10 w-screen fixed bottom-0 left-0 z-40 lg:hidden">
        <ul className="container text-primary flex justify-between items-center gap-1 py-3">
          {links.map((link) => (
            <li key={uuid()}>
              <Link href={link.href}>
                <Button
                  className={`${pathname.endsWith(link.href) ? "bg-primary/10" : ""} w-full`}
                  aria-label={link.value}
                >
                  <span className={pathname.endsWith(link.href) ? "" : "max-sm:hidden"}>
                    {link.value}
                  </span>
                  <span className="sm:hidden">{link.icon}</span>
                </Button>
              </Link>
            </li>
          ))}
          <li className="mr-auto">
            <Button
              aria-label="details"
              title="جزئیات"
              onClick={() => setShowMobileMenu((prev) => !prev)}
            >
              <IconDots className="icon" />
            </Button>
          </li>
        </ul>
      </menu>

      <MobileMenu
        breakPoint={"lg"}
        state={showMobileMenu}
        closingHandler={() => setShowMobileMenu(false)}
      >
        <div className="w-full flex gap-3">
          <Button className="text-dark flex-1" aria-label="notification" variant={"fill"}>
            <IconBell className="icon" />
          </Button>
          <Button className="text-dark flex-1" aria-label="verified" variant={"fill"}>
            <IconFileCheck className="icon" />
          </Button>
          <Button
            className="flex-1"
            aria-label="logout"
            variant={"danger"}
            onClick={() => {
              setShowMobileMenu(false)
              setShowLogOutModal(true)
            }}
          >
            <IconLogout className="icon" />
          </Button>
        </div>
      </MobileMenu>

      <Modal
        icon={<IconInfoCircle className="icon-xl" />}
        state={showLogOutModal}
        topic="آیا برای خروج از حسابتات اطمینان دارید؟"
        message="ممکن است در فرایند استخدام مشکلی به وجود بیاید و شما از ارسال رزومه کارجویان بی خبر باشید و به نتیجه دلخواه خودتان نرسید."
        buttonVariant={"danger"}
        acceptAction={() => logOut()}
        closingHandler={() => setShowLogOutModal(false)}
      />
    </>
  )
}

export default SideBar
