"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import useSWR from "swr"
import { v4 as uuid } from "uuid"
import {
  IconAd,
  IconAlertTriangle,
  IconBell,
  IconDots,
  IconFileCheck,
  IconLayoutDashboard,
  IconLogout,
  IconUserEdit,
} from "@tabler/icons-react"

import Button from "../../Button"
import Title from "../../Title"
import { getMeFetcher } from "@/utils/fetcher"
import logOut from "@/app/actions/logOut"
import { useState } from "react"
import MobileMenu from "../../MobileMenu"
import Modal from "../../Modal"
import Skeleton from "../../Skeleton"

const links = [
  { href: "/employer", value: "داشبورد", icon: <IconLayoutDashboard className="icon" /> },
  { href: "/employer/profile", value: "اطلاعات شرکت", icon: <IconUserEdit className="icon" /> },
  { href: "/employer/new-jobad", value: "آگهی جدید", icon: <IconAd className="icon" /> },
]

const SideBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showLogOutModal, setShowLogOutModal] = useState(false)
  const { data: company, isLoading } = useSWR("/api/getMe", getMeFetcher)
  const pathname = usePathname()
  const router = useRouter()

  return (
    <>
      <aside className="bg-primary text-white h-max w-[30%] hidden flex-col items-center p-3 rounded-lg sticky top-[5.25rem] lg:flex lg:p-6 xl:w-1/4">
        {isLoading ? (
          <Skeleton className="w-28 h-28 rounded-full" />
        ) : (
          <Image
            className="bg-white w-28 h-28 rounded-full object-cover object-center"
            src={company?.logo || ""}
            alt=""
            height={118}
            width={118}
          />
        )}
        <Title className="h-8 justify-center mt-6" size={"sm"}>
          {isLoading ? (
            <Skeleton className="w-1/2 h-full" />
          ) : (
            <h1 className="text-center truncate">{company?.name || "شرکت ناشناس"}</h1>
          )}
        </Title>
        <ul className="w-full mt-3">
          {links.map((link) => (
            <li key={uuid()} className="w-full mt-3 first-of-type:mt-0">
              <Link className="w-full" href={link.href}>
                <Button
                  className={`${
                    pathname.endsWith(link.href)
                      ? "bg-white text-primary"
                      : "hover:bg-white hover:text-primary"
                  } w-full`}
                >
                  {link.value}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
        <div className="w-full flex justify-center items-center mt-6">
          <Button aria-label="details" title="جزئیات" variant={"lightGhost"}>
            <IconDots className="icon" />
          </Button>
          <Button aria-label="notifications" title="اعلان ها" variant={"lightGhost"}>
            <IconBell className="icon" />
          </Button>
          <Button
            className="mr-auto"
            variant={"dangerFill"}
            onClick={() => setShowLogOutModal(true)}
          >
            خروج
            <IconLogout className="icon" />
          </Button>
        </div>
      </aside>

      <menu className="bg-primary/10 backdrop-blur-xl border-t border-solid border-white/10 w-screen fixed bottom-0 left-0 z-10 lg:hidden">
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
          <li className="mr-auto ">
            <Button
              aria-label="details"
              title="جزئیات"
              onClick={() => setShowMobileMenu((prev) => !prev)}
              variant={"lightGhost"}
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
        <div className="row w-full flex-col gap-3">
          <Button
            className="w-full justify-between sm:w-1/2"
            aria-label="notification"
            variant={"lightGhost"}
          >
            اعلان ها
            <IconBell className="icon" />
          </Button>
          <Button
            className="w-full justify-between sm:w-1/2"
            aria-label="verified"
            variant={"lightGhost"}
          >
            درخواست های استخدام
            <IconFileCheck className="icon" />
          </Button>
          <Button
            className="w-full justify-between sm:w-1/2"
            aria-label="logout"
            variant={"dangerFill"}
            onClick={() => {
              setShowMobileMenu(false)
              setShowLogOutModal(true)
            }}
          >
            خروج از حساب
            <IconLogout className="icon" />
          </Button>
        </div>
      </MobileMenu>

      <Modal
        icon={<IconAlertTriangle className="icon-lg" />}
        state={showLogOutModal}
        topic="آیا برای خروج از حسابتات اطمینان دارید؟"
        message="ممکن است در فرایند استخدام مشکلی به وجود بیاید و شما از ارسال رزومه کارجویان بی خبر باشید و به نتیجه دلخواه خودتان نرسید."
        buttonVariant={"dangerFill"}
        acceptAction={async () => {
          await logOut()
          router.replace("/")
        }}
        closingHandler={() => setShowLogOutModal(false)}
      />
    </>
  )
}

export default SideBar
